"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "h-full px-4 py-6 hidden md:flex md:flex-col bg-sidebar/95 dark:bg-sidebar/95 backdrop-blur-md w-[300px] flex-shrink-0 border-r border-sidebar-border shadow-lg shadow-black/5 dark:shadow-black/10",
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "100px") : "300px",
      }}
      transition={{
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1],
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}>
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden'
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 400,
                mass: 0.8,
              }}
              className={cn(
                "fixed left-0 top-0 h-full w-[300px] z-50 bg-sidebar/98 dark:bg-sidebar/98 backdrop-blur-xl shadow-2xl shadow-black/20 md:hidden overflow-y-auto border-r border-sidebar-border",
                className
              )}>
              <div className='p-6 flex justify-between items-center border-b border-sidebar-border/50'>
                <h2 className='text-lg font-semibold text-sidebar-foreground'>
                  Menu
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className='p-2 hover:bg-sidebar-accent/50 dark:hover:bg-sidebar-accent/50 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95'>
                  <X className='h-5 w-5 text-sidebar-foreground/70' />
                </button>
              </div>

              <div className='px-6 py-4'>{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  isActive = false,
  ...props
}: {
  link: Links;
  className?: string;
  isActive?: boolean;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-4 group/sidebar px-4 py-4 mx-1 rounded-xl transition-all duration-300 relative overflow-hidden",
        isActive
          ? "bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 scale-[1.02]"
          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 hover:shadow-md hover:scale-[1.01] active:scale-[0.98]",
        className
      )}
      {...props}>
      {isActive && (
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl'
          layoutId='activeBackground'
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
        />
      )}
      <span
        className={cn(
          "transition-all duration-300 relative z-10",
          isActive
            ? "text-primary-foreground drop-shadow-sm"
            : "group-hover/sidebar:scale-110 group-hover/sidebar:rotate-3"
        )}>
        {link.icon}
      </span>
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
          x: animate ? (open ? 0 : -10) : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.23, 1, 0.32, 1],
        }}
        className={cn(
          "text-sm font-medium group-hover/sidebar:translate-x-1 transition-all duration-300 whitespace-pre inline-block relative z-10",
          isActive
            ? "text-primary-foreground font-semibold"
            : "text-sidebar-foreground/80 group-hover/sidebar:text-sidebar-foreground"
        )}>
        {link.label}
      </motion.span>
      {isActive && (
        <motion.div
          className='absolute right-2 w-1 h-6 bg-primary-foreground rounded-full'
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        />
      )}
    </Link>
  );
};
