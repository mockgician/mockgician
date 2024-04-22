# Using the official Python image
FROM python:3.12

# Installing dependencies
RUN pip install poetry

COPY pyproject.toml poetry.lock* ./

RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi

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
