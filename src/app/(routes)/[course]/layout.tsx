import { SidebarWrapper } from "@/app/components/sidebar-wrapper";

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <SidebarWrapper children={children} />
      </body>
    </html>
  );
}