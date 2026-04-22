import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

from rag.retriever import retrieve_docs

def generate_answer(question):
    docs = retrieve_docs(question)

    context = "\n\n".join(docs)

    prompt = f"""
You are a legal assistant for Indian citizens.

Use the context below to answer.

Context:
{context}

Question:
{question}

Explain in simple language.
"""

    response = model.generate_content(prompt)

    return response.text