# Using the official Python image
FROM python:3.10

# Installing dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copying the application code into the container
COPY . /app

# Specify the working directory
WORKDIR /app

# Copying .env file code into the container
COPY .env .env

# Adding SQLite and a script to create a database
RUN apt-get update && apt-get install -y sqlite3
COPY init-db.sql /app/init-db.sql

# Run the script to create the database and tables
RUN sqlite3 services.db < init-db.sql

# Launching a FastAPI application via Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
