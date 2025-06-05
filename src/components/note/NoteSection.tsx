
import React from 'react';

interface NoteSectionProps {
  title: string;
  content: string;
  className?: string;
}

const NoteSection: React.FC<NoteSectionProps> = ({ title, content, className = "" }) => {
  return (
    <div className={`mb-3 ${className}`}>
      <h3 className="text-rose-600 font-semibold mb-2 flex items-center gap-2 text-sm">
        <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
        {title}
      </h3>
      <div className="text-slate-700 leading-relaxed text-xs bg-gray-50 p-2 rounded whitespace-pre-line">
        {content}
      </div>
    </div>
  );
};

export default NoteSection;
