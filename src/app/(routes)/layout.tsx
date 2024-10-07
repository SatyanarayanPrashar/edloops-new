import type { Metadata } from "next";
import '../globals.css'

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
