import React from "react";
import { User, Mail, Phone, MessageCircle } from "lucide-react";

interface PeopleInClassItemProps {
  person: {
    id: number;
    name: string;
    email: string;
    role: "teacher" | "student";
    avatar?: string;
    phone?: string;
    status: "online" | "offline";
  };
  onMessage?: (person: any) => void;
  onCall?: (person: any) => void;
}

export default function PeopleInClassItem({
  person,
  onMessage,
  onCall,
}: PeopleInClassItemProps) {
  const getRoleColor = (role: string) => {
    if (role === "teacher") {
      return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700";
    }
    return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700";
  };

  const getStatusIndicator = (status: string) => {
    if (status === "online") {
      return "bg-green-500";
    }
    return "bg-neutral-400 dark:bg-neutral-500";
  };

  return (
    <div className='group bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-md transition-all duration-200'>
      <div className='flex items-center gap-4'>
        {/* Avatar */}
        <div className='relative'>
          {person.avatar ? (
            <img
              src={person.avatar}
              alt={person.name}
              className='w-12 h-12 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-600'
            />
          ) : (
            <div className='w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 dark:from-primary/30 dark:to-primary/40 flex items-center justify-center border-2 border-neutral-200 dark:border-neutral-600'>
              <User className='h-6 w-6 text-primary dark:text-primary' />
            </div>
          )}

          {/* Status Indicator */}
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white dark:border-neutral-800 ${getStatusIndicator(
              person.status
            )}`}
          />
        </div>

        {/* User Info */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-1'>
            <h4 className='font-semibold text-neutral-900 dark:text-neutral-100 truncate'>
              {person.name}
            </h4>
            <span
              className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border ${getRoleColor(
                person.role
              )}`}>
              {person.role.charAt(0).toUpperCase() + person.role.slice(1)}
            </span>
          </div>

          <div className='flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 mb-1'>
            <Mail className='h-3 w-3' />
            <span className='truncate'>{person.email}</span>
          </div>

          {person.phone && (
            <div className='flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400'>
              <Phone className='h-3 w-3' />
              <span>{person.phone}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
          {onMessage && (
            <button
              onClick={() => onMessage(person)}
              className='p-2 text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors duration-200'
              title='Send message'>
              <MessageCircle className='h-4 w-4' />
            </button>
          )}

          {onCall && person.phone && (
            <button
              onClick={() => onCall(person)}
              className='p-2 text-neutral-500 dark:text-neutral-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200'
              title='Call'>
              <Phone className='h-4 w-4' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
