import Image from 'next/image';
import '../globals.css';
import Message from '../ui/testComponent/InputMessage';
import { styles } from '../ui/testComponent/stylesContent';
import TestHeader from '../ui/TestHeader';

export default function Home() {
  return (
    <div>
      <TestHeader />
      <main>
        <h1>Welcome to the Page</h1>
        <div className={styles.container}>
          <Message
            message="조선의 궁궐에 당도한 것을 환영하오, 낯선 이여. 나는 나의 훌륭한 백성들을 굽어살피는 깨우친 임금, 세종이오. "
            isSuccess={true}
          />
        </div>
      </main>
    </div>
  );
}
