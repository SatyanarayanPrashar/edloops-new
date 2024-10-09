import { SidebarWrapper } from "@/app/components/sidebar-wrapper";
import { SessionWrapper } from "@/app/components/sessionwarpper";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

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