
import React from 'react';
import { FileText } from 'lucide-react';

const EmptyNoteState: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-32">
      <div className="text-center">
        <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
        <p className="text-slate-500 text-sm">Select a patient encounter from the schedule to view the AI-generated clinical note.</p>
      </div>
    </div>
  );
};

export default EmptyNoteState;
