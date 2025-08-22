"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  UserCog,
  Settings,
  LogOut,
  Calendar,
  BookOpen,
  ListTodo,
  ListOrdered,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { FakeData } from "@/app/data/FakeData";
import { UserRole } from "@/app/data/enum/UserRole";

export function AppSidebar() {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const role = FakeData.getCurrentUserRole();

  const getLinksForRole = () => {
    const baseLinks = [
      {
        label: "Courses",
        href: "/course",
        icon: <LayoutDashboard className='h-5 w-5 flex-shrink-0' />,
      },
      {
        label: "Calendar",
        href: "/calendar",
        icon: <Calendar className='h-5 w-5 flex-shrink-0' />,
      },
    ];

    if (role === UserRole.TEACHER) {
      return [
        ...baseLinks,
        {
          label: "Settings",
          href: "/settings",
          icon: <Settings className='h-5 w-5 flex-shrink-0' />,
        },
        {
          label: "Score",
          href: "/score",
          icon: <ListTodo className='h-5 w-5 flex-shrink-0' />,
        },
        {
          label: "Logout",
          href: "/logout",
          icon: <LogOut className='h-5 w-5 flex-shrink-0' />,
        },
      ];
    } else {
      // student role
      return [
        ...baseLinks,

        {
          label: "Assignments",
          href: "/assignment",
          icon: <BookOpen className='h-5 w-5 flex-shrink-0' />,
        },
        {
          label: "Curriculum",
          href: "/curriculum",
          icon: <ListOrdered className='h-5 w-5 flex-shrink-0' />,
        },
        {
          label: "Registration",
          href: "/registration",
          icon: <ListTodo className='h-5 w-5 flex-shrink-0' />,
        },
        {
          label: "Profile",
          href: "/profile",
          icon: <UserCog className='h-5 w-5 flex-shrink-0' />,
        },
        {
          label: "Logout",
          href: "/logout",
          icon: <LogOut className='h-5 w-5 flex-shrink-0' />,
        },
      ];
    }
  };

  const links = getLinksForRole();

  const { open, setOpen } = useSidebar();

  const isActiveLink = (link: { href: string }) => {
    if (link.href === "/course") {
      return pathname.startsWith("/course");
    }
    if (link.href === "/profile") {
      return pathname.startsWith("/profile");
    }
    if (link.href === "/settings") {
      return (
        pathname.startsWith("/settings") || pathname.startsWith("/setting")
      );
    }
    if (link.href === "/logout") {
      return pathname.startsWith("/logout");
    }
    return pathname === link.href;
  };

  return (
    <div className='h-screen'>
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className='justify-between gap-10'>
          <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
            {open ? <Logo /> : <LogoIcon />}
            <div className='mt-8 flex flex-col gap-2'>
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  isActive={isActiveLink(link)}
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

const Logo = () => (
  <Link
    href='/'
    className='font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20'>
    <div className='h-5 w-6 bg-black dark:bg-white rounded-lg flex-shrink-0' />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='font-medium'>
      Acet Labs
    </motion.span>
  </Link>
);

const LogoIcon = () => (
  <Link
    href='/'
    className='font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20'>
    <div className='h-5 w-6 bg-black dark:bg-white rounded-lg flex-shrink-0' />
  </Link>
);
