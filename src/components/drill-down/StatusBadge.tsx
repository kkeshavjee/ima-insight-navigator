
import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'normal':
        return 'bg-green-500';
      case 'elevated':
        return 'bg-orange-500';
      case 'high':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
  );
};

export default StatusBadge;
