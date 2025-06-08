
import React, { useState, useMemo } from 'react';
import { Clock, User, Search } from 'lucide-react';
import { Input } from './ui/input';

interface Appointment {
  id: string;
  encounterId: string;
  name: string;
  time: string;
  reason: string;
}

interface DaySchedulePaneProps {
  onSelectPatient: (patientId: string, encounterId: string) => void;
  selectedPatientId: string | null;
}

const DaySchedulePane: React.FC<DaySchedulePaneProps> = ({ onSelectPatient, selectedPatientId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for appointments
  const mockAppointments: Appointment[] = [
    { id: 'p001', encounterId: 'e001', name: 'John Doe', time: '09:00 AM', reason: 'Annual Physical' },
    { id: 'p002', encounterId: 'e002', name: 'Jane Smith', time: '09:30 AM', reason: 'Follow-up' },
    { id: 'p003', encounterId: 'e003', name: 'Alice Brown', time: '10:00 AM', reason: 'New Complaint' },
    { id: 'p004', encounterId: 'e004', name: 'Robert Wilson', time: '10:30 AM', reason: 'Medication Review' },
    { id: 'p005', encounterId: 'e005', name: 'Maria Garcia', time: '11:00 AM', reason: 'Lab Results' },
  ];

  // Filter appointments based on search term
  const filteredAppointments = useMemo(() => {
    if (!searchTerm.trim()) {
      return mockAppointments;
    }
    return mockAppointments.filter(appt => 
      appt.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="h-full bg-slate-100 p-2 rounded-lg shadow-md overflow-y-auto">
      <div className="flex items-center gap-1 mb-2">
        <Clock className="w-3 h-3 text-slate-600" />
        <h2 className="text-sm font-semibold text-slate-700">Day Schedule</h2>
      </div>
      
      {/* Search input */}
      <div className="relative mb-3">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-slate-400" />
        <Input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-7 h-7 text-xs bg-white border-slate-300 focus:border-sky-500 focus:ring-sky-500"
        />
      </div>

      <ul className="space-y-1">
        {filteredAppointments.map(appt => (
          <li
            key={appt.id}
            onClick={() => onSelectPatient(appt.id, appt.encounterId)}
            className={`p-1.5 rounded-md shadow hover:bg-sky-100 cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-[1.02]
                        ${selectedPatientId === appt.id ? 'bg-sky-200 ring-1 ring-sky-500 shadow-lg' : 'bg-white hover:shadow-md'}`}
          >
            <div className="flex items-center gap-1 mb-0.5">
              <User className="w-2.5 h-2.5 text-sky-600" />
              <div className={`font-medium text-xs ${selectedPatientId === appt.id ? 'text-sky-800' : 'text-sky-700'}`}>
                {appt.name}
              </div>
            </div>
            <div className={`text-xs ${selectedPatientId === appt.id ? 'text-slate-700' : 'text-slate-600'}`}>
              {appt.time} - {appt.reason}
            </div>
          </li>
        ))}
        {filteredAppointments.length === 0 && searchTerm && (
          <li className="p-3 text-center text-xs text-slate-500">
            No patients found matching "{searchTerm}"
          </li>
        )}
      </ul>
    </div>
  );
};

export default DaySchedulePane;
