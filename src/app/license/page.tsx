import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'GPL v3 라이선스',
  description: 'Spring Boot 백엔드 로드맵의 GNU General Public License v3 전문.',
};

export default async function LicensePage() {
  const license = await readFile(join(process.cwd(), 'LICENSE'), 'utf8');

  return <>
    <header className="detail-hero">
      <Link className="breadcrumb" href="/">로드맵 / 라이선스</Link>
      <p className="detail-level">이용과 배포</p>
      <h1>GPL v3 라이선스</h1>
      <p>이 프로젝트는 GNU General Public License v3.0(GPL-3.0-only)으로 배포됩니다.</p>
    </header>
    <article className="license-content" aria-label="GNU GPL v3 전문">
      <div className="license-links">
        <a href="https://www.gnu.org/licenses/gpl-3.0.html">GNU 공식 원문</a>
        <a href="https://github.com/tmp-it-play/backend-study-roadmap-with-jvm/blob/main/LICENSE">저장소의 LICENSE 파일</a>
      </div>
      <pre className="license-text" lang="en">{license}</pre>
      <p className="license-assets">외부 자료에는 각각의 라이선스가 적용됩니다. <a href="/licenses/SUIT.txt">SUIT 글꼴 라이선스</a>와 <a href="/emoji/LICENSE-GRAPHICS.txt">Twemoji 이미지 라이선스</a>, <a href="/emoji/ATTRIBUTION.txt">이미지 출처</a>를 확인하세요.</p>
    </article>
  </>;
}
