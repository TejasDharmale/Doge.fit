@echo off
REM Start FastAPI backend for Windows

cd /d "%~dp0"
python -m uvicorn main:app --reload --port 8000 --host 0.0.0.0
