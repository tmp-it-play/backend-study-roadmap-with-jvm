import Link from 'next/link';
export default function NotFound() {
  return <div className="not-found"><span className="sign-number">404</span><h1>이 길에는 학습 구간이 없습니다</h1><p>전체 로드맵에서 원하는 단계를 다시 찾아보세요.</p><Link className="go-button" href="/">로드맵으로 돌아가기</Link></div>;
}
