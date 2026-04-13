"""
Document upload route.

POST /documents/upload
  Accepts a file (PDF, image, docx, etc.)
  Returns a dummy analysis / summary response.
PROTECTED (JWT required).
"""

import os
import uuid
from datetime import datetime
from fastapi import APIRouter, File, UploadFile, HTTPException, status, Depends

from auth.jwt_handler import get_current_user_id
from utils.responses import success_response

router = APIRouter()

# Maximum file size: 10 MB
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

# Dummy summaries by MIME type — gives a plausible-looking response
DUMMY_SUMMARIES = {
    "application/pdf": (
        "The uploaded PDF appears to contain legal correspondence or a formal notice. "
        "Key sections identified: Party names, date of issue, subject matter, "
        "legal references, and a demand/relief clause. "
        "Recommended action: Consult a registered advocate within 15 days of receipt."
    ),
    "image/jpeg": (
        "The uploaded image appears to be a photograph of a document or screenshot. "
        "Visible content includes: text paragraphs, possibly a challan, notice, or receipt. "
        "For best results, please upload the original document in PDF or DOCX format."
    ),
    "image/png": (
        "The uploaded PNG image contains document or screenshot content. "
        "Text and structured data detected. "
        "Consider uploading in PDF format for a more accurate analysis."
    ),
    "image/webp": (
        "Image document received. Possible legal notice or receipt detected. "
        "Upload as PDF for detailed analysis."
    ),
    "application/msword": (
        "The uploaded Word document appears to be a legal draft or affidavit. "
        "Sections identified: Title, Parties, Background, Terms and Conditions, Signature Block. "
        "Review for completeness before submission."
    ),
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": (
        "DOCX document received. Appears to be a formal agreement or complaint letter. "
        "Ensure all party names, dates, and amounts are accurate before filing."
    ),
    "text/plain": (
        "Plain-text document received. Content suggests a complaint or grievance description. "
        "Consider converting to PDF and attaching supporting evidence."
    ),
}

DEFAULT_SUMMARY = (
    "Document received and logged. Our system has recorded your upload. "
    "A legal advisor will review the document and provide guidance. "
    "Please retain the original document for your records."
)


@router.post("/upload", status_code=status.HTTP_201_CREATED)
async def upload_document(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user_id),
):
    """
    Accept a legal document upload and return a dummy summary analysis.

    Supported formats: PDF, JPG, PNG, WEBP, DOC, DOCX, TXT
    Max size: 10 MB
    """
    # --- Validate MIME type ---
    content_type = file.content_type or ""
    if content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=(
                f"File type '{content_type}' is not supported. "
                f"Please upload: PDF, JPG, PNG, WEBP, DOC, DOCX, or TXT."
            ),
        )

    # --- Read and check file size ---
    contents = await file.read()
    file_size = len(contents)

    if file_size == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty.",
        )

    if file_size > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size exceeds the 10 MB limit. Your file: {file_size / (1024*1024):.2f} MB.",
        )

    # --- Generate document metadata ---
    doc_id = str(uuid.uuid4())
    filename = file.filename or "unknown_document"
    ext = os.path.splitext(filename)[-1].lower()
    size_kb = round(file_size / 1024, 2)

    summary = DUMMY_SUMMARIES.get(content_type, DEFAULT_SUMMARY)

    return success_response(
        data={
            "document_id": doc_id,
            "original_filename": filename,
            "file_extension": ext,
            "content_type": content_type,
            "size_kb": size_kb,
            "uploaded_by": user_id,
            "uploaded_at": datetime.utcnow().isoformat() + "Z",
            "status": "analysed",
            "summary": summary,
            "disclaimer": (
                "This is an automated preliminary analysis only. "
                "It does not constitute legal advice. "
                "Please consult a qualified advocate for formal legal opinion."
            ),
            "next_steps": [
                "Review the summary above.",
                "Match your situation using GET /situations/{scenario_id}.",
                "Contact a lawyer or DLSA for professional legal assistance.",
                "Keep the original document safe — do not destroy it.",
            ],
        },
        message="Document uploaded and analysed successfully.",
    )


@router.get("/supported-types")
async def get_supported_file_types(_: str = Depends(get_current_user_id)):
    """Returns the list of supported file types for document upload."""
    return success_response(
        data={
            "supported_mime_types": list(ALLOWED_MIME_TYPES),
            "supported_extensions": [".pdf", ".jpg", ".jpeg", ".png", ".webp", ".doc", ".docx", ".txt"],
            "max_size_mb": 10,
        }
    )
