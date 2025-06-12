"use client";

import React from "react";
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useSidebar, SidebarProvider } from "./ui/sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";

const TopbarContent = () => {
  const { setOpen } = useSidebar();
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    return paths.map((path) => {
      return path.charAt(0).toUpperCase() + path.slice(1);
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <>
      <div className='h-14 px-4 sm:px-6 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900'>
        <div className='flex items-center gap-2 sm:gap-4'>
          <Menu
            className='h-5 w-5 text-neutral-600 dark:text-neutral-400 cursor-pointer md:hidden'
            onClick={() => setOpen(true)}
          />

          <div className='flex items-center gap-2'>
            <Image
              src='/assets/image/logo.png'
              alt='School Logo'
              width={28}
              height={28}
              className='rounded-full sm:w-8 sm:h-8'
            />
            <span className='font-semibold text-sm sm:text-base text-neutral-900 dark:text-white'>
              Kite Tech
            </span>
          </div>
        </div>

        {/* Search box - visible on tablet and desktop */}
        <div className='hidden sm:flex items-center relative max-w-md w-full'>
          <Search className='absolute left-3 h-4 w-4 text-neutral-400 pointer-events-none' />
          <input
            type='text'
            placeholder='Search...'
            className='w-full pl-10 pr-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-neutral-100'
          />
        </div>

        <div className='flex items-center gap-1 sm:gap-4'>
          {/* Search icon - visible only on mobile */}
          <button className='sm:hidden p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full'>
            <Search className='h-4 w-4 text-neutral-600 dark:text-neutral-400' />
          </button>

          <button className='p-1.5 sm:p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full'>
            <Bell className='h-4 w-4 sm:h-5 sm:w-5 text-neutral-600 dark:text-neutral-400' />
          </button>

          <button className='p-1.5 sm:p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full'>
            <MessageSquare className='h-4 w-4 sm:h-5 sm:w-5 text-neutral-600 dark:text-neutral-400' />
          </button>

          <div className='flex items-center gap-1 sm:gap-2 cursor-pointer p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg'>
            <Image
              src='/assets/image/logo.png'
              alt='Student Avatar'
              width={28}
              height={28}
              className='rounded-full sm:w-8 sm:h-8'
            />
            <ChevronDown className='h-3 w-3 sm:h-4 sm:w-4 text-neutral-600 dark:text-neutral-400' />
          </div>
        </div>
      </div>

      {breadcrumbs.length > 0 && (
        <div className='px-4 sm:px-6 py-1.5 sm:py-2 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700'>
          <div className='flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400'>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <ChevronRight className='h-3 w-3 sm:h-4 sm:w-4' />
                )}
                <span>{crumb}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default function AppTopbar() {
  return <TopbarContent />;
}
