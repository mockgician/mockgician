# Stage 1: Build React application
FROM node:16 as build

WORKDIR /app/ui

COPY ui/package.json ui/package-lock.json ./
RUN npm install
COPY ui/ ./
RUN npm run build

# Stage 2: Run Python/FastApi application
FROM python:3.12

# Installing dependencies
RUN pip install poetry

COPY pyproject.toml poetry.lock* ./

RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi

# Copy Python app and built React app
WORKDIR /app
COPY --from=build /app/ui/build ./ui/build
COPY app ./app

# Copying .env file code into the container
COPY .env .env

# Adding SQLite and a script to create a database
RUN apt-get update && apt-get install -y sqlite3
COPY init-db.sql /app/init-db.sql

# Run the script to create the database and tables
RUN sqlite3 services.db < init-db.sql

# Launching a FastAPI application via Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]