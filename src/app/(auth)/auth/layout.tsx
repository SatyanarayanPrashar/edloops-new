import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <html lang="en">
      <body className="mx-0">
        <Toaster />
        {children}
      </body>
    </html>
  );
};

export default AuthLayout;
