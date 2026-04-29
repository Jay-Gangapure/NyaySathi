from llama_index.core import SimpleDirectoryReader
from llama_index.core.node_parser import (
    HierarchicalNodeParser,
    SentenceWindowNodeParser,
    get_leaf_nodes
)
import re
import os

# ─────────────────────────────────────────
# STEP 1: Clean raw text
# ─────────────────────────────────────────
def clean_text(text: str) -> str:
    text = re.sub(r'Page\s+\d+\s+of\s+\d+', '', text)  # remove page numbers
    text = re.sub(r'\n{3,}', '\n\n', text)               # remove extra blank lines
    text = re.sub(r'[ \t]{2,}', ' ', text)               # remove extra spaces
    text = re.sub(r'\bSec\.\s*(\d+)', r'Section \1', text)  # normalize "Sec.7" → "Section 7"
    return text.strip()

# ─────────────────────────────────────────
# STEP 2: Load .md documents from data/legal
# ─────────────────────────────────────────
def load_documents(data_dir: str):
    documents = SimpleDirectoryReader(
        input_dir=data_dir,
        recursive=True,
        required_exts=[".md"],      # only read converted markdown files
        filename_as_id=True         # uses filename as doc ID
    ).load_data()

    # Attach metadata to every document
    for doc in documents:
        doc.text = clean_text(doc.text)
        doc.metadata.update({
            "domain":       "corruption",
            "jurisdiction": "India",
            "language":     "en",
            "source":       doc.metadata.get("file_name", "unknown")
        })

    print(f"📄 Loaded {len(documents)} document(s)")
    return documents

# ─────────────────────────────────────────
# STEP 3: Chunk using HierarchicalNodeParser
# Best for legal docs with Act→Section→Clause structure
# ─────────────────────────────────────────
def chunk_documents(data_dir: str):
    documents = load_documents(data_dir)

    # 3 levels of chunking:
    # 1024 tokens → full section context
    #  512 tokens → sub-section
    #  256 tokens → clause level (these get retrieved)
    parser = HierarchicalNodeParser.from_defaults(
        chunk_sizes=[1024, 512, 256]
    )

    all_nodes = parser.get_nodes_from_documents(documents)

    # Leaf nodes = smallest chunks (256 tokens)
    # These are what get stored in vector DB and retrieved
    leaf_nodes = get_leaf_nodes(all_nodes)

    print(f"✅ Total nodes : {len(all_nodes)}")
    print(f"✅ Leaf nodes  : {len(leaf_nodes)} (these go into vector DB)")

    return leaf_nodes, all_nodes