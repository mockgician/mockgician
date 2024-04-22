from app.utils.data_base_manager import DatabaseManager
import sqlite3
from dotenv import load_dotenv
from pathlib import Path
import os


env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)
TEST_DATA_COUNT = int(os.getenv("TEST_DATA_COUNT"))


def insert_service_records(count=TEST_DATA_COUNT) -> str:
    with DatabaseManager() as cursor:
        try:
            for i in range(1, count + 1):
                cursor.execute(
                        "INSERT INTO services (type, name, endpoint, description) VALUES (?, ?, ?, ?)",
                        ('REST', f'Test{i}', f'/post{i}', f'test service {i}')
                    )
            return f"inserted {count} records successfully"
        except sqlite3.Error as e:
            return f"Error: {e}"
