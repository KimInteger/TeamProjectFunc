from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 허용할 오리진을 설정합니다.
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드를 허용합니다.
    allow_headers=["*"],  # 모든 HTTP 헤더를 허용합니다.
)

DATABASE = 'login.db'
TESTDB = 'test.db'

class User(BaseModel):
    id: str
    password: str

@app.get("/searchData", response_model=List[User])
def read_data():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT id, password FROM adminData")  # 테이블 이름 수정
    rows = cursor.fetchall()
    conn.close()

    users = [User(id=row[0], password=row[1]) for row in rows]
    return users

class VerifyRequest(BaseModel):
    id: str
    password: str

@app.post("/searchData/verify")
def verify_user(request: VerifyRequest):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id FROM adminData WHERE id = ? AND password = ?",  # 테이블 이름 수정
        (request.id, request.password)
    )
    row = cursor.fetchone()
    conn.close()

    if row:
        return True
    else:
        return False
    
class ColumnSchema(BaseModel):
    name: str
    type: str

class CreateTableRequest(BaseModel):
    table_name: str
    columns: List[ColumnSchema]

@app.post("/searchData/createTable")
def create_table(request: CreateTableRequest):
    success = create_table_function(TESTDB, request.table_name, request.columns)
    if success:
        return True
    else:
        raise False

def create_table_function(db_path: str, table_name: str, columns: List[ColumnSchema]) -> bool:
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        column_definitions = ", ".join([f"{col.name} {col.type}" for col in columns])
        create_table_sql = f"CREATE TABLE IF NOT EXISTS {table_name} ({column_definitions});"
        
        cursor.execute(create_table_sql)
        conn.commit()
        conn.close()
        
        return True
    except Exception as e:
        print(f"Error creating table: {e}")
        return False
