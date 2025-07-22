"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/bar/app_sidebar";
import AppTopbar from "@/components/bar/app_topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

interface RootProps {
  children: React.ReactNode;
}

export default function Root({ children }: RootProps) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/";

  if (isAuthPage) {
    return (
      <div className='flex h-screen relative'>
        <main className='flex-1'>{children}</main>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className='flex h-screen relative'>
        <AppSidebar />
        <div className='flex-1 flex flex-col'>
          <AppTopbar />
          <main className='flex-1'>
            <div className='flex-1'>{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
