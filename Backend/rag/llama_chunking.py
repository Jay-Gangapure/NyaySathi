from llama_index.core import SimpleDirectoryReader
from llama_index.core.node_parser import (
    HierarchicalNodeParser,
    get_leaf_nodes
)
import re

# ─────────────────────────────────────────
# STEP 1: Clean text (applied after loading)
# ─────────────────────────────────────────
def clean_text(text: str) -> str:
    text = re.sub(r'Page\s+\d+\s+of\s+\d+', '', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'[ \t]{2,}', ' ', text)
    text = re.sub(r'\bSec\.\s*(\d+)', r'Section \1', text)
    return text.strip()

# ─────────────────────────────────────────
# STEP 2: Load documents
# ─────────────────────────────────────────
def load_documents(data_dir: str):
    documents = SimpleDirectoryReader(
        input_dir=data_dir,
        recursive=True,
        required_exts=[".md"],
        filename_as_id=True
    ).load_data()

    # ✅ DO NOT set doc.text directly
    # Only update metadata
    for doc in documents:
        doc.metadata.update({
            "domain":       "corruption",
            "jurisdiction": "India",
            "language":     "en",
            "source":       doc.metadata.get("file_name", "unknown")
        })

    print(f"📄 Loaded {len(documents)} document(s)")
    return documents

# ─────────────────────────────────────────
# STEP 3: Chunk documents
# ─────────────────────────────────────────
def chunk_documents(data_dir: str):
    documents = load_documents(data_dir)

    parser = HierarchicalNodeParser.from_defaults(
        chunk_sizes=[1024, 512, 256]
    )

    all_nodes = parser.get_nodes_from_documents(documents)
    leaf_nodes = get_leaf_nodes(all_nodes)

    # ✅ Filter out noise chunks
    clean_leaf_nodes = []
    for node in leaf_nodes:
        text = node.text.strip()

        # Skip if too short (less than 50 characters)
        if len(text) < 50:
            continue

        # Skip image placeholders
        if "intentionally omitted" in text.lower():
            continue

        # Skip if it's just numbers or dots
        if re.match(r'^[\d\s\.\,]+$', text):
            continue

        clean_leaf_nodes.append(node)

    print(f"✅ Total nodes       : {len(all_nodes)}")
    print(f"✅ Leaf nodes        : {len(leaf_nodes)}")
    print(f"✅ Clean leaf nodes  : {len(clean_leaf_nodes)} (after filtering)")

    return clean_leaf_nodes, all_nodes