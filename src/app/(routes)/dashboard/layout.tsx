import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SidebarWrapper } from "@/app/components/sidebar-wrapper";
import { getServerSession } from 'next-auth';

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