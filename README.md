# 🧠 Smart Flashcard Generator

AI-powered flashcard generation application with NLP and OCR capabilities.

## 🚀 Features

- ✍️ Generate flashcards from text input
- 📸 Extract text from images using OCR
- 🧠 NLP-based content summarization (PageRank algorithm)
- 🔊 Text-to-speech functionality
- 🎴 Interactive flip card animations
- 📊 Usage statistics tracking

## 🏗️ Tech Stack

### Backend

- **FastAPI** - Modern Python web framework
- **spaCy** - NLP processing
- **SentenceTransformers** - Semantic embeddings
- **NetworkX** - PageRank algorithm
- **Tesseract OCR** - Image text extraction
- **gTTS** - Text-to-speech

### Frontend

- **React** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Axios** - API calls
- **React Router** - Navigation

## 📦 Installation

### Prerequisites

- Python 3.9+
- Node.js 16+
- Tesseract OCR

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy model
python -m spacy download en_core_web_sm

# Create folders
mkdir uploads audio

# Run server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🌐 Usage

1. **Backend API:** http://localhost:8000/docs
2. **Frontend App:** http://localhost:5173

## 📁 Project Structure

```
FlashCard-Generator-FullStack/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── schemas/         # Pydantic models
│   │   └── main.py          # FastAPI entry
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── api/             # API calls
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 👥 Authors

- **Asim Kazi**

## 📄 License

This project is open source and available under the MIT License.
