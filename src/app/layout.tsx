import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { LearningProvider } from '@/components/LearningProvider';
import Shell from '@/components/Shell';

const suit = localFont({
  src: '../../node_modules/@sun-typeface/suit/fonts/variable/woff2/SUIT-Variable.woff2',
  variable: '--font-suit',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'JVM 백엔드 학습 로드맵', template: '%s · JVM 로드맵' },
  description: 'Java와 Kotlin의 기본기부터 JVM, Spring Boot, 데이터베이스, 테스트와 운영까지 이어지는 상세 학습 로드맵.',
};
export const viewport: Viewport = { themeColor: '#094d24' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko" className={suit.variable}><body><LearningProvider><Shell>{children}</Shell></LearningProvider></body></html>;
}
