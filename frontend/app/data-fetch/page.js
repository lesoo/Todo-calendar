// frontend/src/app/data-fetch/page.js

'use client'; // 훅(useState, useEffect) 사용을 위해 클라이언트 컴포넌트로 지정
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DataFetchPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 📡 API 호출은 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    // ⚠️ 백엔드 Express 서버의 주소 (프론트엔드 포트 3000과 다름)
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/greeting`;

    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}. ${API_URL}`);
        }
        return response.json();
      })
      .then(fetchedData => {
        setData(fetchedData);
      })
      .catch(fetchError => {
        console.error(`데이터 가져오기 오류: ${fetchError}`);
        setError(`데이터 로드 실패. Express 서버(4000)가 실행 중인지 확인하세요.`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', border: '1px solid #ddd' }}>
      <h1>Next.js (React) - Express API 연동 테스트</h1>
      <Link href='/'>
        ← 홈으로 돌아가기
      </Link>
      <hr />

      {loading && <p style={{ textAlign: 'center' }}>데이터 로딩 중...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>에러 발생: {error}</p>}

      {data && (
        <div>
          <h2>수신된 데이터</h2>
          <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
          <p>
            **메시지:** <span style={{ color: 'green', fontWeight: 'bold' }}>{data.message}</span>
          </p>
          <p>
            **출처:** Node.js/Express 서버 (Port {data.serverPort})
          </p>
        </div>
      )}
    </div>
  );
}