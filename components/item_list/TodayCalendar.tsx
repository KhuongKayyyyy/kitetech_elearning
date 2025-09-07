import React, { useEffect, useMemo, useState } from "react";
import { Calendar, Clock, MapPin, BookOpen } from "lucide-react";
import ClassScheduleItem from "../item/ClassScheduleItem";
import { classService } from "@/app/data/services/classService";
export default function TodayCalendar() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const todayWeekday = new Date().toLocaleString("en-US", { weekday: "long" });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await classService.getClasses();
        setClasses(Array.isArray(data) ? data : []);
      } catch (e) {
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const sectionsToday = useMemo(() => {
    const setNums = new Set<number>();
    classes.forEach((c) => {
      (c.schedules || [])
        .filter((s: any) => s.schedule === todayWeekday)
        .forEach((s: any) => setNums.add(Number(s.sections)));
    });
    return Array.from(setNums).sort((a, b) => a - b);
  }, [classes, todayWeekday]);

  const getCoursesForSection = (sectionNum: number) => {
    return classes.filter((c) =>
      (c.schedules || []).some(
        (s: any) =>
          s.schedule === todayWeekday && Number(s.sections) === sectionNum
      )
    );
  };

  return (
    <div className='p-6 w-full max-w-4xl'>
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

      <div className='bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm overflow-hidden'>
        {loading ? (
          <div className='p-6 text-center text-sm text-neutral-500 dark:text-neutral-400'>
            Loading today2s schedule…
          </div>
        ) : sectionsToday.length === 0 ? (
          <div className='p-6 text-center text-sm text-neutral-500 dark:text-neutral-400'>
            No classes scheduled today.
          </div>
        ) : (
          sectionsToday.map((sectionNum, index) => {
            const coursesInSlot = getCoursesForSection(sectionNum);
            return (
              <div
                key={index}
                className='group flex border-b border-neutral-100 dark:border-neutral-700 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors duration-200'>
                <div className='w-40 p-4 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-750 border-r border-neutral-200 dark:border-neutral-700'>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4 text-neutral-500 dark:text-neutral-400' />
                    <span className='text-sm font-semibold text-neutral-700 dark:text-neutral-300'>
                      Section {sectionNum}
                    </span>
                  </div>
                </div>
                <div className='flex-1 p-4 bg-white dark:bg-neutral-800 group-hover:bg-neutral-50 dark:group-hover:bg-neutral-750 transition-colors duration-200'>
                  {coursesInSlot.length > 0 ? (
                    <div className='space-y-2'>
                      {coursesInSlot.map((course) => (
                        <ClassScheduleItem key={course.id} course={course} />
                      ))}
                    </div>
                  ) : (
                    <div className='flex items-center justify-between'>
                      <span className='text-sm text-neutral-500 dark:text-neutral-400 italic'>
                        No events scheduled
                      </span>
                      <div className='w-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-600 opacity-50'></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className='mt-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg'>
        <p className='text-sm text-primary/80 dark:text-primary/70 text-center'>
          {classes.length > 0
            ? `You have classes scheduled today if your section matches. Stay focused! 📚`
            : "Your schedule is clear today. Perfect time to focus on your goals! 🎯"}
        </p>
      </div>
    </div>
  );
}
