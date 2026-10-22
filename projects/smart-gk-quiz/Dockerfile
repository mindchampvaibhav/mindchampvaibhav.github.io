# Runs the Smart GK Quiz as a container:
#   docker build -t smart-gk-quiz .
#   docker run -p 8501:8501 smart-gk-quiz      -> open http://localhost:8501
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py "Quiz Questions.csv" ./
EXPOSE 8501
HEALTHCHECK CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8501/_stcore/health')"
CMD ["streamlit", "run", "app.py", "--server.address=0.0.0.0", "--server.port=8501", "--server.headless=true"]
