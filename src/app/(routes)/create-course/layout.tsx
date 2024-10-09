import { SidebarWrapper } from "@/app/components/sidebar-wrapper";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import React from "react";
import { SessionWrapper } from "@/app/components/sessionwarpper";

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
          <SessionWrapper>
            {children}
          </SessionWrapper>
        </SidebarWrapper>
      </body>
    </html>
  );
}