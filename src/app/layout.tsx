import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Resume Builder - KodNest Premium',
  description: 'Placement Readiness Platform',
};

import { ResumeProvider } from '@/context/ResumeContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ResumeProvider>
          {children}
        </ResumeProvider>
      </body>
    </html>
  );
}
