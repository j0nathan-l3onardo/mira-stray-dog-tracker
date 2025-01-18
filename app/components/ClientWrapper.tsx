'use client';

import dynamic from 'next/dynamic';

const MainContent = dynamic(
  () => import('./MainContent'),
  { ssr: false }
);

export default function ClientWrapper() {
  return <MainContent />;
} 