# Mockgician

Mockgician is a web application designed to make mock services creation as easy and convenient as possible. 
With a user-friendly web interface, Mockgician simplifies the creation, management and deployment of mock services.

## Creating and activating a Poetry environment

1. Open a command prompt (terminal) in your project window.
2. To install Poetry, run the command:
    ```bash
   pip install poetry

3. To activate the Poetry environment, navigate to the project directory and run the command:
   ```bash
   poetry shell
4. To deactivate the Poetry environment, run the command:
    ```bash
   exit
   
## Launching a FastAPI application

Recommended to run it inside a Poetry environment.

1. To run the application, run the command:
    ```bash
   python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   
2. To stop the application press Ctrl+C

## Running an application in a docker container

1. To create or update a docker image, run the command (in the project root):
    ```bash
   docker build -t mockgician .
   
2. To run the docker image, run the command (in the project root):
    ```bash
   docker run -d -p 8000:8000 mockgician
