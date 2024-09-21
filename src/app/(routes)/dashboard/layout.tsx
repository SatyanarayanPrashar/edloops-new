import { SidebarWrapper } from "@/app/components/sidebar-wrapper";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-0">
        <SidebarWrapper children={children} />
      </body>
    </html>
  );
}