from rag.llama_chunking import chunk_documents

nodes = chunk_documents("data/legal")

print("\n--- CHUNKS ---\n")

for i, node in enumerate(nodes[:5]):  # show first 5
    print(f"Chunk {i+1}:")
    print(node.text)
    print("-------------------")