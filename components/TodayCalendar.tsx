import React, { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TimeSlot {
  id: string;
  time: string;
  section: string;
}

function SortableTimeSlot({ slot }: { slot: TimeSlot }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slot.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='group flex border-b border-neutral-100 dark:border-neutral-700 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors duration-200 cursor-move'>
      <div className='w-32 p-4 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-750 border-r border-neutral-200 dark:border-neutral-700'>
        <div className='flex items-center gap-2'>
          <Clock className='h-4 w-4 text-neutral-500 dark:text-neutral-400' />
          <span className='text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
            {slot.time}
          </span>
        </div>
      </div>
      <div className='flex-1 p-4 bg-white dark:bg-neutral-800 group-hover:bg-neutral-50 dark:group-hover:bg-neutral-750 transition-colors duration-200'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <span className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
              {slot.section}
            </span>
            <span className='text-sm text-neutral-500 dark:text-neutral-400 italic'>
              No events scheduled
            </span>
          </div>
          <div className='w-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-600 opacity-50'></div>
        </div>
      </div>
    </div>
  );
}

export default function TodayCalendar() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTimeSlots((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className='p-6'>
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-3'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <Calendar className='h-5 w-5 text-primary' />
          </div>
          <h2 className='text-2xl font-bold text-neutral-900 dark:text-white'>
            Today's Schedule
          </h2>
        </div>
        <p className='text-neutral-600 dark:text-neutral-400 font-medium'>
          {today}
        </p>
      </div>

      {timeSlots.length === 0 ? (
        <div className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm p-12 text-center'>
          <div className='flex flex-col items-center gap-4'>
            <div className='p-4 bg-neutral-100 dark:bg-neutral-700 rounded-full'>
              <Calendar className='h-8 w-8 text-neutral-400 dark:text-neutral-500' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2'>
                No Schedule Available
              </h3>
              <p className='text-neutral-500 dark:text-neutral-400'>
                No events are scheduled for today. Your day is completely free!
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm overflow-hidden'>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <SortableContext
              items={timeSlots.map((slot) => slot.id)}
              strategy={verticalListSortingStrategy}>
              {timeSlots.map((slot) => (
                <SortableTimeSlot key={slot.id} slot={slot} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}

      <div className='mt-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg'>
        <p className='text-sm text-primary/80 dark:text-primary/70 text-center'>
          Your schedule is clear today. Perfect time to focus on your goals! 🎯
        </p>
      </div>
    </div>
  );
}
