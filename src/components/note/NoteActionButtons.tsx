
import React from 'react';
import { Edit, CheckCircle, UserPlus, Calendar, FileCheck, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const NoteActionButtons: React.FC = () => {
  const handleFollowUp = (period: string) => {
    console.log(`Follow-up scheduled for: ${period}`);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <button className="flex items-center gap-2 px-3 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors shadow-sm text-xs">
        <CheckCircle className="w-3 h-3" />
        Sign Note
      </button>
      <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm text-xs">
        <Edit className="w-3 h-3" />
        Edit with AI
      </button>
      <button className="flex items-center gap-2 px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors shadow-sm text-xs">
        <UserPlus className="w-3 h-3" />
        Referrals
      </button>
      
      {/* Follow-up dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors shadow-sm text-xs">
            <Calendar className="w-3 h-3" />
            Follow-up
            <ChevronDown className="w-3 h-3" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md z-50">
          <DropdownMenuItem 
            onClick={() => handleFollowUp('10 days')}
            className="text-xs px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Follow up in 10 days
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleFollowUp('1 month')}
            className="text-xs px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Follow up in 1 month
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleFollowUp('3 months')}
            className="text-xs px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Follow up in 3 months
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleFollowUp('other')}
            className="text-xs px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Other
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <button className="flex items-center gap-2 px-3 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors shadow-sm text-xs">
        <FileCheck className="w-3 h-3" />
        Fill Forms
      </button>
      <button className="px-3 py-2 bg-gray-200 text-slate-700 rounded-md hover:bg-gray-300 transition-colors shadow-sm text-xs">
        Save Draft
      </button>
    </div>
  );
};

export default NoteActionButtons;
