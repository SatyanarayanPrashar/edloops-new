import { SidebarWrapper } from "@/app/components/sidebar-wrapper";
import React from "react";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if(!session){
    redirect("/");
  }

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