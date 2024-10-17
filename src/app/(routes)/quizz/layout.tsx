import { SidebarWrapper } from "@/app/components/sidebar-wrapper";
import { Metadata } from "next";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: {
    template: "Edloops",
    default: "Edloops",
  },
  description: "Course from students to students",
  icons: {
    icon: "/logo-dark.png",
  }
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="mx-0">
        <SidebarWrapper children={children} session={session}/>
      </body>
    </html>
  );
}