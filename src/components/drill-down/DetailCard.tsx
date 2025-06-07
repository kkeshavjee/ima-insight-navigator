
import React from 'react';
import { LucideIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface DetailCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
}

const DetailCard: React.FC<DetailCardProps> = ({ 
  icon: Icon, 
  iconColor, 
  title, 
  items, 
  renderItem 
}) => {
  if (items.length === 0) return null;

  return (
    <div className="p-3 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-3 h-3 ${iconColor}`} />
        <h3 className="text-xs font-medium text-indigo-600">{title}</h3>
      </div>
      <div className="space-y-1">
        {items.map(renderItem)}
      </div>
    </div>
  );
};

export default DetailCard;
export { StatusBadge };
