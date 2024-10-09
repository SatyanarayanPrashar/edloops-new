import { FormWrapper } from "@/app/(auth)/auth/components/FormWrapper";
import { Testimonial } from "@/app/(auth)/auth/components/Testimonial";

import { Metadata } from "next";
import { SignInForm } from "./components/SigninForm";

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
      <div className="w-[58%] flex flex-col items-center justify-center bg-[#303346]">
        <FormWrapper>
          <SignInForm />
        </FormWrapper>
      </div>
    </div>
  );
};

export default Page;
