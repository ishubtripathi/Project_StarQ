# Graph Report - Project_starq  (2026-09-04)

## Corpus Check
- 93 files · ~13,340 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 322 nodes · 383 edges · 31 communities
- Extraction: 77% EXTRACTED · 23% INFERRED · 0% AMBIGUOUS · INFERRED: 87 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `702a9ad5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]

## God Nodes (most connected - your core abstractions)
1. `create_document_chunks()` - 12 edges
2. `process_csv_file()` - 11 edges
3. `process_query()` - 11 edges
4. `process_pdf_file()` - 10 edges
5. `Current Development Status` - 10 edges
6. `DocumentChunk` - 8 edges
7. `format_retrieval_results()` - 8 edges
8. `generate_chunk_embeddings()` - 7 edges
9. `build_sources()` - 7 edges
10. `retrieve_relevant_chunks()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `query_documents()` --calls--> `process_query()`  [INFERRED]
  backend/app/api/routes/query.py → backend/app/services/rag_service.py
- `test_low_relevance_filtering()` --calls--> `format_retrieval_results()`  [INFERRED]
  backend/tests/test_no_answer.py → backend/app/services/retrieval_service.py
- `process_pdf_file()` --calls--> `create_document_chunks()`  [INFERRED]
  backend/app/api/routes/documents.py → backend/app/services/content_service.py
- `process_csv_file()` --calls--> `create_document_chunks()`  [INFERRED]
  backend/app/api/routes/documents.py → backend/app/services/content_service.py
- `upload_document()` --calls--> `DocumentResponse`  [INFERRED]
  backend/app/api/routes/documents.py → backend/app/models/document.py

## Communities (31 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (29): process_csv_file(), process_pdf_file(), Validate, extract, chunk, embed and store a PDF., Validate, parse, profile, chunk, embed and store a CSV., Upload and process a single PDF or CSV document.      Pipeline:          Upl, Upload and process multiple PDF and CSV documents.      Each document is proce, Save an uploaded file to a temporary location.      The file is written in chu, save_uploaded_file() (+21 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (13): DocumentCardProps, DocumentDetailsProps, Document, DocumentListProps, UploadStatusProps, UploadZoneProps, DocumentItem, UploadState (+5 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (21): build_context(), build_rag_prompt(), build_sources(), process_query(), Build a structured context from retrieved chunks., Build clean source information from     retrieved document chunks., Build a grounded RAG prompt for the LLM., test_csv_context() (+13 more)

### Community 3 - "Community 3"
Cohesion: 0.1
Nodes (18): chunk_text(), clean_text(), create_document_chunks(), prepare_csv_content(), prepare_pdf_content(), Convert PDF or CSV content into a unified list     of DocumentChunk objects., Clean and normalize extracted document text., test_invalid_configuration() (+10 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (12): AnalyticsCardProps, DocumentOverviewProps, ImportantInformationProps, Insight, KeyInsightsProps, Document, RecentDocumentsProps, StatCardProps (+4 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (16): generate_embedding(), Generate an embedding vector for a single text., format_retrieval_results(), Generate a query embedding and retrieve relevant     document chunks from Chrom, Convert ChromaDB results into structured results     and remove low-relevance c, retrieve_relevant_chunks(), get_collection(), Return the StarQ vector collection. (+8 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (21): Backend, code:text (┌──────────────────┐), code:text (starq/), Current Development Status, Document Processing, Frontend, Key Features, Phase 1 — Project Setup (+13 more)

### Community 7 - "Community 7"
Cohesion: 0.14
Nodes (10): ChatHeaderProps, ChatInputProps, ChatMessagesProps, MessageBubbleProps, Chat(), getActiveDocument(), sendQuery(), ChatMessage (+2 more)

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (15): build_insight_prompt(), build_key_insights(), extract_important_information(), Extract important information using the LLM., Generate human-readable key insights from     document statistics and extracted, Build a prompt to extract important information     from a PDF or CSV document., generate_answer(), Generate a grounded answer using Gemini.      The model is configured for low- (+7 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (3): MobileHeaderProps, navigation, SidebarProps

### Community 10 - "Community 10"
Cohesion: 0.14
Nodes (9): BaseModel, DocumentChunk, DocumentResponse, query_documents(), QueryRequest, test_batch_embeddings(), test_chunk_embeddings(), setup_test_data() (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.17
Nodes (12): 1. Clone the repository, 2. Create virtual environment, 3. Activate virtual environment, 4. Install dependencies, 5. Start the backend, code:bash (git clone https://github.com/vibhupratap-007/rag-based-syste), code:bash (python -m venv venv), code:bash (venv\Scripts\activate) (+4 more)

### Community 12 - "Community 12"
Cohesion: 0.38
Nodes (5): calculate_pdf_statistics(), Calculate statistics for a PDF document., create_test_pdf(), test_empty_pdf_data(), test_pdf_statistics()

### Community 13 - "Community 13"
Cohesion: 0.38
Nodes (5): build_visual_analytics(), Convert document statistics into     dashboard-ready chart data., test_csv_analytics(), test_empty_statistics(), test_pdf_analytics()

### Community 14 - "Community 14"
Cohesion: 0.38
Nodes (5): calculate_csv_statistics(), Calculate statistics for a CSV document., test_csv_statistics(), test_csv_without_header(), test_empty_csv()

### Community 15 - "Community 15"
Cohesion: 0.4
Nodes (4): build_document_overview(), Build a standardized overview for an uploaded document., test_csv_overview(), test_pdf_overview()

## Knowledge Gaps
- **79 isolated node(s):** `Save an uploaded file to a temporary location.      The file is written in chu`, `Validate, extract, chunk, embed and store a PDF.`, `Validate, parse, profile, chunk, embed and store a CSV.`, `Upload and process a single PDF or CSV document.      Pipeline:          Upl`, `Upload and process multiple PDF and CSV documents.      Each document is proce` (+74 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `process_query()` connect `Community 2` to `Community 8`, `Community 10`, `Community 5`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `test_phase4_pipeline()` connect `Community 0` to `Community 3`, `Community 5`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `create_document_chunks()` connect `Community 3` to `Community 0`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `create_document_chunks()` (e.g. with `process_pdf_file()` and `process_csv_file()`) actually correct?**
  _`create_document_chunks()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 7 inferred relationships involving `process_csv_file()` (e.g. with `validate_csv()` and `parse_csv()`) actually correct?**
  _`process_csv_file()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Are the 7 inferred relationships involving `process_query()` (e.g. with `query_documents()` and `retrieve_relevant_chunks()`) actually correct?**
  _`process_query()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `process_pdf_file()` (e.g. with `validate_pdf()` and `extract_pdf_text()`) actually correct?**
  _`process_pdf_file()` has 6 INFERRED edges - model-reasoned connections that need verification._