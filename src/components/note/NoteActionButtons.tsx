
import React from 'react';
import { Edit, CheckCircle, UserPlus, Calendar, FileCheck } from 'lucide-react';

const NoteActionButtons: React.FC = () => {
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
      <button className="flex items-center gap-2 px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors shadow-sm text-xs">
        <Calendar className="w-3 h-3" />
        Follow-up
      </button>
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
