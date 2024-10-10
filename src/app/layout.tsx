
import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { SessionWrapper } from './components/sessionwarpper';

export const metadata: Metadata = {
  title: {
    template: "Edloops",
    default: "Edloops",
  },
  description: "Master Any Topic 2x Faster | With Edloops AI Learn the Faster, Better and Smarter Way",
  icons: {
    icon: "/logo-dark.png",
  },
};

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
