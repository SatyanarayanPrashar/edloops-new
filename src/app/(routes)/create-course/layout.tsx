import { SidebarWrapper } from "@/app/components/sidebar-wrapper";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from 'next-auth';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
 
  return (
    <html lang="en">
      <body className="">
        <SidebarWrapper session={session}>
            {children}
        </SidebarWrapper>
      </body>
    </html>
  );
}