#!/bin/bash
# Start FastAPI backend

cd "$(dirname "$0")"
python -m uvicorn main:app --reload --port 8000 --host 0.0.0.0
