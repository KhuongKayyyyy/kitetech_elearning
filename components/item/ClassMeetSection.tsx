import React from "react";
import { MoreVertical, Video } from "lucide-react";

export default function ClassMeetSection() {
  return (
    <div className='bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm'>
      <div className='flex items-center justify-between'>
        {/* Left side - Google Meet icon and title */}
        <div className='flex items-center gap-3'>
          <div className='relative'>
            {/* Google Meet icon recreation */}
            <div className='w-10 h-10 rounded-lg overflow-hidden bg-white flex items-center justify-center border border-gray-200'>
              <div className='w-8 h-6 relative'>
                {/* Green section */}
                <div className='absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-tl-lg'></div>
                {/* Blue section */}
                <div className='absolute top-0 right-0 w-5 h-6 bg-blue-500 rounded-tr-lg rounded-br-lg'></div>
                {/* Yellow section */}
                <div className='absolute bottom-0 left-0 w-3 h-3 bg-yellow-500 rounded-bl-lg'></div>
                {/* Orange section */}
                <div className='absolute bottom-0 left-3 w-2 h-3 bg-orange-500'></div>
              </div>
            </div>
          </div>
          <h3 className='text-lg font-medium text-neutral-900 dark:text-neutral-100'>
            Meet
          </h3>
        </div>

        {/* Right side - Three dots menu */}
        <button className='p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors'>
          <MoreVertical className='h-5 w-5 text-neutral-500 dark:text-neutral-400' />
        </button>
      </div>

      {/* Join button */}
      <div className='mt-6'>
        <button className='w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] group'>
          <Video className='h-5 w-5 group-hover:scale-110 transition-transform duration-200' />
          Join Meeting
        </button>
      </div>
    </div>
  );
}
