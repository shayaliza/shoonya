# Shoonya Assigment -- Wellness Retreat

## React and FastAPI

This project is a web application with a React frontend and a FastAPI backend.

## Prerequisites

Make sure you have the following installed on your system:

- Node.js (with npm)
- Python 3.7+

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shayaliza/shoonya.git
cd shoonya
```

### 2. Start Frontend

```bash
cd frontend
npm i
npm run dev
```

### 3. Turn on postgres database

### 4. Start backned

- first setup postgres url in soonya/backend/db.py SQLALCHEMY_DATABASE_URL to
  your local postgres url with username and password

```bash
cd backend
```

- install virtual env for python

```bash
python -m venv .venv
.\.venv\Scripts\activate
```

- install dependency

```bash
pip install -r requirements.txt
```

- Start uvicorn server

```bash
uvicorn main:app --reload
```
