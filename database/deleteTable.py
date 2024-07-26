import sqlite3
import sys

def delete_table(db_path: str, table_name: str) -> bool:
    """
    주어진 데이터베이스 경로와 테이블 이름을 사용하여 테이블을 삭제합니다.

    :param db_path: 데이터베이스 파일 경로
    :param table_name: 삭제할 테이블 이름
    :return: 테이블 삭제 성공 여부
    """
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        # 테이블 삭제 SQL 쿼리
        delete_table_sql = f"DROP TABLE IF EXISTS {table_name};"
        cursor.execute(delete_table_sql)
        conn.commit()
        conn.close()

        print(f"Table '{table_name}' deleted successfully.")
        return True
    except Exception as e:
        print(f"Error deleting table: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python delete_table.py <db_path> <table_name>")
        sys.exit(1)

    db_path = sys.argv[1]
    table_name = sys.argv[2]

    success = delete_table(db_path, table_name)
    if not success:
        sys.exit(1)
