from rag.llama_chunking import chunk_documents

# Get leaf nodes (small chunks) and all nodes
leaf_nodes, all_nodes = chunk_documents("data/legal")

print(f"\n--- CHUNKS (first 5 of {len(leaf_nodes)}) ---\n")

for i, node in enumerate(leaf_nodes[:5]):
    print(f"Chunk {i+1}:")
    print(f"  Text    : {node.text[:200]}...")   # first 200 chars
    print(f"  Source  : {node.metadata.get('source')}")
    print(f"  Domain  : {node.metadata.get('domain')}")
    print("--------------------")