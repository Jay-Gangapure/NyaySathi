from llama_index.core import SimpleDirectoryReader
from llama_index.core.node_parser import SimpleNodeParser

def chunk_documents(folder_path):
    # Load documents
    documents = SimpleDirectoryReader(folder_path).load_data()

    # Create chunk parser
    parser = SimpleNodeParser.from_defaults(
        chunk_size=400,
        chunk_overlap=50
    )

    # Convert documents into chunks (nodes)
    nodes = parser.get_nodes_from_documents(documents)

    return nodes