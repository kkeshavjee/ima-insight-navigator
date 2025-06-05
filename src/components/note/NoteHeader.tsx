
import React from 'react';
import { FileText } from 'lucide-react';

const NoteHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <FileText className="w-4 h-4 text-rose-600" />
      <h2 className="text-sm font-semibold text-rose-700">Note Constructor</h2>
    </div>
  );
};

export default NoteHeader;
