import Image from 'next/image';
import '../globals.css';
import Message from '../ui/testComponent/InputMessage';
import { styles } from '../ui/testComponent/stylesContent';
import TestHeader from '../ui/TestHeader';
import CreateTableFormComponent from '../ui/testComponent/createTableTestForm';

export default function Home() {
  return (
    <div>
      <TestHeader />
      <main>
        <CreateTableFormComponent />
      </main>
    </div>
  );
}
