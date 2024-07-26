'use client';

import React, { useState } from 'react';

// 스타일 객체 정의
export const styles = {
  input:
    'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
  // 테이블 이름 입력 스타일
  tableInput:
    'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
  form: 'bg-white p-6 rounded shadow-lg w-full max-w-sm',
  button:
    'w-[120px] bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
  container: 'flex items-center justify-center min-h-screen bg-gray-100',
  label: 'text-center block text-sm font-medium text-gray-700 w-[100px]',
  row: 'flex items-center space-x-4',
  // 추가되는 div 섹션 스타일
  columnContainer: 'flex items-center justify-center gap-2 mb-4',
  columnInput:
    'w-[100px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
  btnRow: 'flex justify-evenly mt-4',
};

// Input 컴포넌트 정의
interface InputComponentProps {
  index: number;
  handleChange: (index: number, name: string, value: string) => void;
  handleSelectChange: (index: number, value: string) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  index,
  handleChange,
  handleSelectChange,
}) => {
  return (
    <div className={styles.columnContainer}>
      <label className={styles.label}>항목명</label>
      <input
        type="text"
        name="name"
        placeholder="Column Name"
        className={styles.columnInput}
        onChange={(e) => handleChange(index, e.target.name, e.target.value)}
      />
      <select
        aria-label="Column Type"
        className={styles.columnInput}
        onChange={(e) => handleSelectChange(index, e.target.value)}
      >
        <option value="TEXT">TEXT</option>
        <option value="INTEGER">INTEGER</option>
      </select>
    </div>
  );
};

// Form 컴포넌트 정의
const FormComponent: React.FC = () => {
  const [columns, setColumns] = useState([{ name: '', type: 'TEXT' }]);
  const [tableName, setTableName] = useState('');

  const handleChange = (index: number, name: string, value: string) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], [name]: value };
    setColumns(newColumns);
  };

  const handleSelectChange = (index: number, value: string) => {
    const newColumns = [...columns];
    newColumns[index].type = value;
    setColumns(newColumns);
  };

  const addColumn = () => {
    setColumns([...columns, { name: '', type: 'TEXT' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tableData = {
      table_name: tableName,
      columns,
    };

    const result = await fetchData(tableData);

    if (result) {
      alert('Table created successfully');
      // 폼 초기화
      setTableName('');
      setColumns([{ name: '', type: 'TEXT' }]);
    } else {
      alert('Failed to create table');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className="mb-4">
          <label className={styles.label}>Table 이름</label>
          <input
            type="text"
            placeholder="Table Name"
            value={tableName}
            className={styles.tableInput} // 기존 스타일 사용
            onChange={(e) => setTableName(e.target.value)}
          />
        </div>
        {columns.map((column, index) => (
          <InputComponent
            key={index}
            index={index}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />
        ))}
        <div className={styles.btnRow}>
          <button type="button" className={styles.button} onClick={addColumn}>
            추가
          </button>
          <button type="submit" className={styles.button}>
            생성
          </button>
        </div>
      </form>
    </div>
  );
};

// fetchData 함수 정의
const fetchData = async ({
  table_name,
  columns,
}: {
  table_name: string;
  columns: { name: string; type: string }[];
}): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:8000/createTable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ table_name, columns }),
    });

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    return result === true;
  } catch (error) {
    console.error('Error fetching data:', error);
    return false;
  }
};

export default FormComponent;
