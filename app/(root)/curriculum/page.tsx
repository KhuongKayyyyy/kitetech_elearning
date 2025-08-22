"use client";
import { FakeCurriclumnData } from "@/app/data/FakeCurriculumData";
import { CurriculumnSubjectModel } from "@/app/data/model/CurriculumnSubjectModel";

import CurriculumnBoard from "@/components/item_list/CurriculumnBoard";
import React, { useState, useEffect } from "react";

export default function page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className='p-6'>
        <div className='animate-pulse'>
          <div className='h-8 bg-gray-300 rounded w-1/4 mb-6'></div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className='bg-gray-200 rounded-lg p-4 space-y-3'>
                <div className='h-4 bg-gray-300 rounded w-3/4'></div>
                <div className='h-3 bg-gray-300 rounded w-1/2'></div>
                <div className='h-3 bg-gray-300 rounded w-full'></div>
                <div className='h-3 bg-gray-300 rounded w-2/3'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CurriculumnBoard
        subjects={FakeCurriclumnData as CurriculumnSubjectModel[]}
      />
    </div>
  );
}
