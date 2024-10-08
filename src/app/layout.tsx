
import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { SessionWrapper } from './components/sessionwarpper';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
        <body>
          <SessionWrapper >{children}</SessionWrapper> 
        </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    template: "Edloops",
    default: "Edloops",
  },
  description: "Course from students to students",
  icons: {
    icon: "/logo-dark.png",
  },
};