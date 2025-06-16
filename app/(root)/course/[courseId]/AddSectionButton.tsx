import React from "react";
import { Plus } from "lucide-react";
import { FakeData } from "@/app/data/FakeData";

export default function AddSectionButton() {
  const currentUserRole = FakeData.getCurrentUserRole();

  const handleAddSection = () => {
    // TODO: Implement add section functionality
    console.log("Add new section");
  };

  if (currentUserRole !== "teacher") {
    return null;
  }

  return (
    <div className='p-6'>
      <button
        onClick={handleAddSection}
        className='group relative flex items-center justify-center gap-3 w-full px-6 py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold text-sm rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-primary/20 backdrop-blur-sm'>
        <div className='flex items-center justify-center w-5 h-5 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors duration-200'>
          <Plus className='h-3 w-3' />
        </div>
        <span>Add New Section</span>
        <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </button>
    </div>
  );
}
