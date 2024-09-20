import { IoIosArrowBack, IoMdSettings } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

interface SidebarWrapperProps {
  children: React.ReactNode;
}

export const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
  return (
    <div className="flex h-[100vh]">
      {/* Sidebar */}
      <div className="h-full gap-7 bg-black text-white transition-all duration-300 ease-in-out py-10 px-2 flex flex-col items-center group w-[4rem] hover:w-[12rem]">
        <div className="flex items-center w-full overflow-hidden hover:cursor-pointer hover:pl-2">
          <MdDashboard size={25} className="min-w-[40px]" />
          <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300">
            Dashboard
          </span>
        </div>
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
        <div className="flex items-center w-full overflow-hidden hover:cursor-pointer hover:pl-2">
          <IoIosArrowBack size={25} className="min-w-[40px]" />
          <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300">
            Logout
          </span>
        </div>
      </div>
      {/* Main Content */}
      <div className="w-full bg-[#252525]">{children}</div>
    </div>
  );
};