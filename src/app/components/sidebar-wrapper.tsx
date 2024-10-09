import Link from 'next/link';
import { IoMdPerson, IoMdSettings } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { LogoutButton } from './authFunction';
import Button from './button';

interface SidebarWrapperProps {
  children: React.ReactNode;
  session: any;
}

export const SidebarWrapper = ({ children, session }: SidebarWrapperProps) => {
  return (
    <div className="flex min-h-[100vh] bg-[#20232D]">
      <div className="min-h-full gap-7 bg-[#20232D] text-white transition-all duration-300 ease-in-out py-10 px-2 flex flex-col items-center group w-[4rem] hover:w-[12rem]">
        <Link href={'/dashboard'} className="flex items-center w-full overflow-hidden hover:cursor-pointer hover:pl-2">
          <MdDashboard size={25} className="min-w-[40px]" />
          <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300">
            Dashboard
          </span>
        </Link>
        <div className="flex items-center w-full overflow-hidden hover:cursor-pointer hover:pl-2">
          <RiMoneyDollarCircleFill size={25} className="min-w-[40px]" />
          <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300">
            Billing
          </span>
        </div>
        <div className="flex items-center w-full overflow-hidden hover:cursor-pointer hover:pl-2">
          <IoMdSettings size={25} className="min-w-[40px]" />
          <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300">
            Settings
          </span>
        </div>
        <Link href="/profile" className="flex items-center w-full overflow-hidden hover:cursor-pointer hover:pl-2">
          {session.user.image ?
            <img src={session.user.image} className="rounded-full bg-[#20232D] h-10" /> :
            <IoMdPerson size={25} className="min-w-[40px]" />
          }
          <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300">
            {session.user.name}
          </span>
        </Link>
        <div className="flex items-center w-full overflow-hidden hover:cursor-pointer hover:pl-2">
          {session&& (
            <div className="flex gap-2 items-center">
              <LogoutButton/>
            </div>
          )}
        </div>
      </div>
      <div className="w-full bg-[#303346]">
        <div className='flex gap-4 bg-red-40 items-center justify-end pr-5 py-4'>
          {!session && (
            <Button label={'Log in'} href='/auth/login'/>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};
