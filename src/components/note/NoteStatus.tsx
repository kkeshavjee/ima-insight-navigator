
import React from 'react';

const NoteStatus: React.FC = () => {
  return (
    <div className="mb-3 p-2 bg-white rounded-lg shadow-sm">
      <div className="mt-2 flex gap-2">
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">AI Generated</span>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Ready for Review</span>
      </div>
    </div>
  );
};

export default NoteStatus;
