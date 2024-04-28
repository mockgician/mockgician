from dotenv import load_dotenv
import os
from pathlib import Path
import sqlite3


env_path = Path(".") / ".env"
load_dotenv(dotenv_path=env_path)


class DatabaseManager:
    def __init__(self):
        self.database = os.getenv("DATABASE_NAME")

    def __enter__(self):
        self.conn = sqlite3.connect(self.database)
        return self.conn.cursor()

    def __exit__(self, exc_type, value, traceback):
        self.conn.commit()
        self.conn.close()
