import React, { useEffect, useRef } from "react";
import { UserIcon, KeyIcon, PowerIcon } from "lucide-react";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

interface UserDropdownMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function UserDropdownMenu({
  isOpen,
  setIsOpen,
}: UserDropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthentication();
  const router = useRouter();

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, setIsOpen]);

  const handleUserProfile = () => {
    console.log("Navigate to user profile");
    setIsOpen(false);
  };

  const handleChangePassword = () => {
    console.log("Navigate to change password");
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
    toast.success("Logged out successfully");
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={menuRef}>
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50'>
          {user?.full_name && (
            <div className='px-4 py-3 border-b border-gray-100 text-gray-800 font-semibold text-base truncate'>
              {user.full_name}
            </div>
          )}
          <button
            onClick={handleUserProfile}
            className='w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150'>
            <UserIcon className='w-4 h-4 mr-3 text-gray-500' />
            User Profile
          </button>

          <button
            onClick={handleChangePassword}
            className='w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150'>
            <KeyIcon className='w-4 h-4 mr-3 text-gray-500' />
            Change Password
          </button>

          <div className='border-t border-gray-100 my-1'></div>

          <button
            onClick={handleLogout}
            className='w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150'>
            <PowerIcon className='w-4 h-4 mr-3 text-red-500' />
            Logout
          </button>
        </div>
      )}
      <Toaster />
    </div>
  );
}
