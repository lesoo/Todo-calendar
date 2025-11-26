import Image from 'next/image';
import Link from 'next/link';


export default function HomePage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <p>프론트엔드 서버(Port 3000)가 정상 작동 중입니다.</p>
      <div style={{ marginTop: '20px' }}>
        <Link
          href='/data-fetch'
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '5px' }}
        >
          🚀 백엔드 API 데이터 연동 확인하기
        </Link>
      </div>
    </div>
  );
}

