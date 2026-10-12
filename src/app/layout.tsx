import type { Metadata, Viewport } from 'next';
import '@fontsource/do-hyeon/400.css';
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/500.css';
import '@fontsource/noto-sans-kr/700.css';
import './globals.css';
import { LearningProvider } from '@/components/LearningProvider';
import Shell from '@/components/Shell';

export const metadata: Metadata = {
  title: { default: 'JVM 백엔드 학습 로드맵', template: '%s · JVM 로드맵' },
  description: 'Java와 Kotlin의 기본기부터 JVM, Spring Boot, 데이터베이스, 테스트와 운영까지 이어지는 상세 학습 로드맵.',
};
export const viewport: Viewport = { themeColor: '#094d24' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body><LearningProvider><Shell>{children}</Shell></LearningProvider></body></html>;
}
