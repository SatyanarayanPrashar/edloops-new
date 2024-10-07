import { FormWrapper } from "@/app/(auth)/auth/components/FormWrapper";
import { Testimonial } from "@/app/(auth)/auth/components/Testimonial";
import { SigninForm } from "@/app/(auth)/auth/login/components/SigninForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Open-source Experience Management. Free & open source.",
};

const Page = async () => {
  
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-1">
        <Testimonial />
      </div>
      <div className="w-[58%] flex flex-col items-center justify-center bg-slate-300">
        <FormWrapper>
          <SigninForm />
        </FormWrapper>
      </div>
    </div>
  );
};

export default Page;
