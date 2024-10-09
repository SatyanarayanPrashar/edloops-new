import { cn } from '@/lib/utils';

interface LogoProps {
  classname?: string;
}

export const Logo = ({ classname }: LogoProps) => {
  return (
    <div className={cn("flex justify-center items-center", classname)}>
        <img src="/logo-dark.png" alt="" className='h-[2.4rem]'/>
        <div className='h-10 w-[1px] border-l-[1px] mx-5'></div>
        <div className=" text-center text-black text-[30px]">
            Edloops
        </div>
    </div>
  );
};