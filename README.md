# Instructions for working with FastAPI application

## Creating and activating a virtual environment (venv)

1. Open a command prompt (terminal) in your project window.
2. If your project does not have a virtual environment (venv folder), then enter the command:
    ```bash
   python -m venv venv

3. To activate the virtual environment, run the command:
   ```bash
   source venv/bin/activate
4. To deactivate the virtual environment, run the command:
    ```bash
   deactivate
   
## Launching a FastAPI application

Recommended to run it inside a virtual environment (venv).

1. To run the application, run the command:
    ```bash
   python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   
2. To stop the application press Ctrl+C

## Running an application in a docker container

1. To create or update a docker image, run the command (in the project root):
    ```bash
   docker build -t mock-services .
   
2. To run the docker image, run the command (in the project root):
    ```bash
   docker run -d -p 8000:8000 mock-services
