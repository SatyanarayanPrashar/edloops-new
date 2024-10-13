import { cn } from '@/lib/utils';

interface LogoProps {
  classname?: string;
  theme?: string;
}

export const Logo = ({ classname, theme }: LogoProps) => {
  return (
    <div className={cn("flex justify-center items-center", classname)}>
        <img src={theme==="light" ? "/Logo.png" : "/logo-dark.png"} alt="" className='h-[2.4rem]'/>
        <div className='h-10 w-[1px] border-l-[1px] mx-5'></div>
        <div className={cn("text-center text-black text-[30px]", theme==="light" && "text-white")}>
            Edloops
        </div>
    </div>
  );
};