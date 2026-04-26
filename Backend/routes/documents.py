import os
import uuid
import base64
from datetime import datetime
from fastapi import APIRouter, File, UploadFile, HTTPException, status, Depends
from services.ai_service import analyze_document, model
#from auth.jwt_handler import get_current_user_id
from utils.responses import success_response
import PyPDF2

router = APIRouter()

MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

ALLOWED_MIME_TYPES = {
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
}


# ✅ TEXT EXTRACTION FUNCTION
def extract_text(file_bytes, content_type):
    text = ""

    # -------- PDF --------
    if content_type == "application/pdf":
        from io import BytesIO
        reader = PyPDF2.PdfReader(BytesIO(file_bytes))

        for page in reader.pages:
            content = page.extract_text()
            if content:
                text += content

        # 🔁 Fallback OCR if no text found
        if not text.strip():
            try:
                image_base64 = base64.b64encode(file_bytes).decode()

                response = model.generate_content([
                    "Extract all text from this PDF",
                    {
                        "mime_type": "application/pdf",
                        "data": image_base64
                    }
                ])

                text = response.text if hasattr(response, "text") else ""
            except Exception as e:
                print("PDF OCR Error:", e)

    # -------- TEXT FILE --------
    elif content_type == "text/plain":
        text = file_bytes.decode("utf-8", errors="ignore")

    # -------- DOC / DOCX --------
    elif content_type in [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]:
        from docx import Document
        from io import BytesIO

        doc = Document(BytesIO(file_bytes))
        for para in doc.paragraphs:
            text += para.text + "\n"

    # -------- IMAGE (OCR using Gemini) --------
    elif content_type.startswith("image/"):
        try:
            image_base64 = base64.b64encode(file_bytes).decode()

            response = model.generate_content([
                "Extract all text from this image",
                {
                    "mime_type": content_type,
                    "data": image_base64
                }
            ])

            text = response.text if hasattr(response, "text") else ""

        except Exception as e:
            print("Image OCR Error:", e)
            text = ""

    return text

@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def upload_document(
    file: UploadFile = File(...),
):
    # -------- Validate MIME --------
    content_type = file.content_type or ""
    if content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Unsupported file type.",
        )

    # -------- Read file --------
    contents = await file.read()
    file_size = len(contents)

    if file_size == 0:
        raise HTTPException(status_code=400, detail="Empty file.")

    if file_size > MAX_FILE_SIZE_BYTES:
        raise HTTPException(status_code=413, detail="File too large.")

    # -------- Metadata --------
    doc_id = str(uuid.uuid4())
    filename = file.filename or "unknown"
    ext = os.path.splitext(filename)[-1].lower()
    size_kb = round(file_size / 1024, 2)

    # -------- STEP 1: Extract Text --------
    extracted_text = extract_text(contents, content_type)

    print("------EXTRACTED TEXT------")
    print(extracted_text[:500])   # ✅ CORRECT INDENT

    if not extracted_text or len(extracted_text.strip()) < 20:
        raise HTTPException(
            status_code=400,
            detail="No meaningful text found in document."
        )

    # -------- STEP 2: AI Analysis --------
    ai_analysis = analyze_document(extracted_text)

    print("------AI RESPONSE------")
    print(ai_analysis[:500])   # ✅ CORRECT INDENT

    # -------- Summary --------
    summary = ai_analysis[:300] + "..." if ai_analysis else ""

    # -------- Response --------
    return success_response(
        data={
            "document_id": doc_id,
            "original_filename": filename,
            "file_extension": ext,
            "content_type": content_type,
            "size_kb": size_kb,
            "uploaded_by": "demo_user",
            "uploaded_at": datetime.utcnow().isoformat() + "Z",
            "status": "analysed",

            "analysis": ai_analysis,
            "summary": summary,

            "disclaimer": "This is AI-generated analysis and not legal advice.",
        },
        message="Document uploaded and analysed successfully.",
    )