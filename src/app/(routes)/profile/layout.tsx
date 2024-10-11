import { SidebarWrapper } from "@/app/components/sidebar-wrapper";
import { SessionWrapper } from "@/app/components/sessionwarpper";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/authOptions";
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
      <body className="mx-0">
        <SidebarWrapper session={session}>
          <SessionWrapper>
            {children}
          </SessionWrapper>
        </SidebarWrapper>
      </body>
    </html>
  );
}