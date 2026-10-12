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
  title: { default: 'Spring Boot 백엔드 로드맵', template: '%s · Spring Boot 로드맵' },
  description: 'Java와 Kotlin을 바탕으로 Spring Boot 서비스 개발을 배우는 백엔드 로드맵. 언어와 JVM 기초부터 데이터베이스, 테스트, 배포와 운영까지 이어집니다.',
};
export const viewport: Viewport = { themeColor: '#094d24' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko" className={suit.variable}><body><LearningProvider><Shell>{children}</Shell></LearningProvider></body></html>;
}
