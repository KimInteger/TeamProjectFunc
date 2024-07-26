# create_table.py
import sqlite3
from typing import List
from pydantic import BaseModel

# ColumnSchema 정의
class ColumnSchema(BaseModel):
    name: str
    type: str

def create_table(db_path: str, table_name: str, columns: List[ColumnSchema]) -> bool:
    """
    주어진 데이터베이스 경로와 테이블 이름, 컬럼 정보를 사용하여 테이블을 생성합니다.
    
    :param db_path: 데이터베이스 파일 경로
    :param table_name: 생성할 테이블 이름
    :param columns: 테이블의 컬럼 정보
    :return: 테이블 생성 성공 여부
    """
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        # 컬럼 정의를 생성
        column_definitions = ", ".join([f"{col.name} {col.type}" for col in columns])
        create_table_sql = f"CREATE TABLE IF NOT EXISTS {table_name} ({column_definitions});"
        
        cursor.execute(create_table_sql)
        conn.commit()
        conn.close()
        
        return True
    except Exception as e:
        print(f"Error creating table: {e}")
        return False
