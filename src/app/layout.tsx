import type { Metadata } from "next";
import './globals.css'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-[#232736]"
      >
        {children}
      </body>
    </html>
  );
}
