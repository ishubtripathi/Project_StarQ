# StarQ

> Intelligent PDF & CSV RAG-Based Document Intelligence System

StarQ is an AI-powered document intelligence system designed to process
PDF and CSV files, extract meaningful information, and provide
context-aware answers using Retrieval-Augmented Generation (RAG).

The system is designed to handle large documents, support multiple
documents as a single knowledge collection, and provide useful insights
from uploaded data.

---

## Key Features

- PDF document upload and validation
- CSV upload, validation, and parsing
- PDF text extraction
- PDF image detection
- PDF metadata extraction
- CSV schema detection and data profiling
- Large PDF processing (up to approximately 1,000 pages)
- Unified document processing model
- Multiple documents grouped into a single knowledge collection
- Retrieval-Augmented Generation (RAG)
- Context-aware question answering
- Document-specific dashboard and insights
- Source-aware answers with document/page references

---

## Project Architecture

```text
                        ┌──────────────────┐
                        │      StarQ UI    │
                        └────────┬─────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │   FastAPI API    │
                        └────────┬─────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
          ┌──────────────┐                ┌──────────────┐
          │     PDF      │                │     CSV      │
          │  Processing  │                │  Processing  │
          └──────┬───────┘                └──────┬───────┘
                 │                               │
                 ▼                               ▼
          Text / Metadata                  Schema / Profile
                 │                               │
                 └───────────────┬───────────────┘
                                 ▼
                     ┌──────────────────────┐
                     │ Unified Document     │
                     │ Model                │
                     └──────────┬───────────┘
                                ▼
                     ┌──────────────────────┐
                     │ Text Processing &    │
                     │ Chunking             │
                     └──────────┬───────────┘
                                ▼
                     ┌──────────────────────┐
                     │ Embedding Generation │
                     └──────────┬───────────┘
                                ▼
                     ┌──────────────────────┐
                     │    Vector Database   │
                     └──────────┬───────────┘
                                ▼
                     ┌──────────────────────┐
                     │ Retrieval + Rerank   │
                     └──────────┬───────────┘
                                ▼
                     ┌──────────────────────┐
                     │      LLM / RAG       │
                     └──────────┬───────────┘
                                ▼
                     ┌──────────────────────┐
                     │ Answer + Citations   │
                     └──────────────────────┘

```

## Tech Stack

### Backend
- Python
- FastAPI
- PyMuPDF
- Pydantic

### Document Processing
- PyMuPDF for PDF processing
- Python CSV module for CSV processing

### RAG Pipeline
**Planned components:**
- Text Chunking
- Embedding Models
- Vector Database
- Retrieval
- Reranking
- Large Language Model (LLM)

### Frontend
**Planned:**
- React
- TypeScript
- Tailwind CSS

---

## Project Structure

```text
starq/
│
├── backend/
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       └── documents.py
│   │   │
│   │   ├── models/
│   │   │   └── document.py
│   │   │
│   │   ├── services/
│   │   │   ├── pdf_service.py
│   │   │   └── csv_service.py
│   │   │
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   └── ...
│
├── docs/
│   └── ...
│
├── .gitignore
└── README.md
```

---

## Current Development Status

### Phase 1 — Project Setup
- ✅ Project initialization
- ✅ Backend setup
- ✅ FastAPI configuration
- ✅ Initial project structure

### Phase 2 — Document Ingestion & Validation
- ✅ File Upload API
- ✅ PDF Validation
- ✅ PDF Text Extraction
- ✅ PDF Metadata Extraction
- ✅ PDF Image Detection
- ✅ Large PDF Processing
- ✅ CSV Validation
- ✅ CSV Parsing
- ✅ CSV Schema Detection
- ✅ CSV Data Profiling
- ✅ Unified Document Model
- ✅ Ingestion Testing

### Phase 3 — Text Processing & RAG Preparation
- ✅ Content Extraction Review
- ✅ Text Cleaning & Normalization
- ✅ Document-aware Chunking
- ✅ Chunk Metadata
- ✅ Chunk Size & Overlap Optimization
- ✅ CSV → Text Representation
- ✅ Unified Chunk Pipeline
- ✅ Chunking Tests & Validation
- ✅ Phase 3 Testing

### Phase 4 — Embedding Generation & Vector Storage
- ✅ Embedding Model Selection & Setup
- ✅ Embedding Generation Service
- ✅ Batch Embedding
- ✅ Vector Database Setup
- ✅ Vector Storage
- ✅ Similarity Search
- ✅ Retrieval Pipeline
- ✅ Phase 4 Testing

### Phase 5 — Multi-Document Knowledge Collections
- ✅ RAG Query Service
- ✅ Context Builder
- ✅ LLM Integration
- ✅ Prompt Engineering
- ✅ Grounded Answer Generation
- ✅ Source/Citation Handling
- ✅ No-Answer / Hallucination Protection
- ✅ RAG Pipeline Integration
- ✅ Phase 5 Testing

### Phase 6 — Intelligent Dashboard
- ✅ Document Overview
- ✅ Important Information Extraction
- ✅ PDF Statistics
- ✅ CSV Statistics
- ✅ Key Insights
- ✅ Visual Analytics

### Phase 7 — Frontend
- [ ] Dashboard UI
- [ ] Document Upload Interface
- [ ] Document Management
- [ ] Chat Interface
- [ ] Source References
- [ ] Responsive Design

### Phase 8 — Testing & Optimization
- [ ] Unit Testing
- [ ] API Testing
- [ ] RAG Evaluation
- [ ] Large Document Testing
- [ ] Error Handling
- [ ] Performance Optimization
- [ ] Security Review

### Phase 9 — Deployment
- [ ] Production Configuration
- [ ] Backend Deployment
- [ ] Frontend Deployment
- [ ] Database Configuration
- [ ] Environment Variables
- [ ] Production Testing

---

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/vibhupratap-007/rag-based-system-pdf-csv/tree/main
cd starq
```

### 2. Create virtual environment
```bash
python -m venv venv
```

### 3. Activate virtual environment

**Windows**
```bash
venv\Scripts\activate
```

**Linux / macOS**
```bash
source venv/bin/activate
```

### 4. Install dependencies
```bash
pip install -r requirements.txt
```

### 5. Start the backend
```bash
uvicorn app.main:app --reload
```

The API will be available at:
`http://127.0.0.1:8000`

Interactive API documentation:
`http://127.0.0.1:8000/docs`