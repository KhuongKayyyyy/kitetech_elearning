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

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import Link from "next/link";
import { useSidebar } from "../ui/sidebar";

const TopbarContent = () => {
  const { setOpen } = useSidebar();
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    return paths.map((path) => {
      return path.charAt(0).toUpperCase() + path.slice(1);
    });
  };

  const breadcrumbs = useBreadcrumbs();

  return (
    <>
      <div className=' h-16 p-6 sm:px-8 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900'>
        <div className='flex items-center gap-3 sm:gap-5'>
          <Menu
            className='h-6 w-6 text-neutral-600 dark:text-neutral-400 cursor-pointer md:hidden hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors'
            onClick={() => setOpen(true)}
          />

          <div className='flex items-center gap-3'>
            <Image
              src='/assets/image/logo.png'
              alt='School Logo'
              width={32}
              height={32}
              className='rounded-full sm:w-9 sm:h-9'
            />
            <span className='font-semibold text-base sm:text-lg text-neutral-900 dark:text-white'>
              Kite Tech
            </span>
          </div>
        </div>

        {/* Search box - visible on tablet and desktop */}
        <div className='hidden sm:flex items-center relative max-w-md w-full mx-8'>
          <Search className='absolute left-4 h-5 w-5 text-neutral-400 pointer-events-none' />
          <input
            type='text'
            placeholder='Search...'
            className='w-full pl-12 pr-5 py-2.5 text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors placeholder-neutral-400 dark:placeholder-neutral-500 text-neutral-900 dark:text-neutral-100'
          />
        </div>

        <div className='flex items-center gap-2 sm:gap-5'>
          {/* Search icon - visible only on mobile */}
          <button className='sm:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors'>
            <Search className='h-5 w-5 text-neutral-600 dark:text-neutral-400' />
          </button>

          <button className='p-2 sm:p-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors relative'>
            <Bell className='h-5 w-5 sm:h-6 sm:w-6 text-neutral-600 dark:text-neutral-400' />
            <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
          </button>

          <button className='p-2 sm:p-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors'>
            <MessageSquare className='h-5 w-5 sm:h-6 sm:w-6 text-neutral-600 dark:text-neutral-400' />
          </button>

          <div className='flex items-center gap-2 sm:gap-3 cursor-pointer p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors'>
            <Image
              src='/assets/image/logo.png'
              alt='Student Avatar'
              width={32}
              height={32}
              className='rounded-full sm:w-9 sm:h-9'
            />
            <ChevronDown className='h-4 w-4 sm:h-5 sm:w-5 text-neutral-600 dark:text-neutral-400' />
          </div>
        </div>
      </div>

      {breadcrumbs.length > 0 && (
        <div className='px-6 sm:px-8 py-2.5 sm:py-3 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700'>
          <div className='flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-neutral-500 dark:text-neutral-400'>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <ChevronRight className='h-4 w-4 sm:h-5 sm:w-5' />
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className='font-medium text-neutral-700 dark:text-neutral-200'>
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className='hover:text-neutral-900 dark:hover:text-white hover:underline transition-colors'>
                    {crumb.label}
                  </Link>
                )}
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
