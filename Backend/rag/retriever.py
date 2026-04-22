from rag.gemini_embedding import get_embedding
from rag.pinecone_client import index

def retrieve_docs(query):
    vector = get_embedding(query)

    result = index.query(
        vector=vector,
        top_k=3,
        include_metadata=True
    )

    docs = []
    for match in result["matches"]:
        docs.append(match["metadata"]["text"])

    return docs