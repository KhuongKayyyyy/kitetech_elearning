"use client";
import LoginForm from "@/components/form/login_form";
import React from "react";
import Image from "next/image";
import schoolIllustration from "@/public/assets/image/school.jpeg";

export default function Home() {
  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      <div className='w-full max-w-6xl flex items-center justify-center gap-8'>
        {/* Image - hidden on small screens, visible on lg and up */}
        <div className='hidden lg:flex lg:w-1/2 xl:w-3/5'>
          <div className='relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl'>
            <Image
              src={schoolIllustration}
              alt='School illustration'
              fill
              className='object-cover'
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent' />
          </div>
        </div>

        {/* Login Form */}
        <div className='w-full lg:w-1/2 xl:w-2/5 max-w-sm sm:max-w-md md:max-w-lg'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
