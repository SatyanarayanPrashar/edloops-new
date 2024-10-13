import { FormWrapper } from "@/app/(auth)/auth/_components/FormWrapper";
import { Testimonial } from "@/app/(auth)/auth/_components/Testimonial";

import { Metadata } from "next";
import { SignInForm } from "./components/SigninForm";

export const metadata: Metadata = {
  title: "Login",
  description: "",
};

const Page = async () => {
  
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex-1 hidden lg:block">
        <Testimonial />
      </div>
      <div className="w-full flex-1 flex items-center justify-center bg-[#303346]">
        <FormWrapper>
          <SignInForm />
        </FormWrapper>
      </div>
    </div>
  );
};

export default Page;
