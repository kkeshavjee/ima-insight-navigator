
import React from 'react';
import { Clock, User } from 'lucide-react';

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
  // Mock data for appointments
  const mockAppointments: Appointment[] = [
    { id: 'p001', encounterId: 'e001', name: 'John Doe', time: '09:00 AM', reason: 'Annual Physical' },
    { id: 'p002', encounterId: 'e002', name: 'Jane Smith', time: '09:30 AM', reason: 'Follow-up' },
    { id: 'p003', encounterId: 'e003', name: 'Alice Brown', time: '10:00 AM', reason: 'New Complaint' },
    { id: 'p004', encounterId: 'e004', name: 'Robert Wilson', time: '10:30 AM', reason: 'Medication Review' },
    { id: 'p005', encounterId: 'e005', name: 'Maria Garcia', time: '11:00 AM', reason: 'Lab Results' },
  ];

  return (
    <div className="h-full bg-slate-100 p-3 rounded-lg shadow-md overflow-y-auto">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-slate-600" />
        <h2 className="text-lg font-semibold text-slate-700">Day Schedule</h2>
      </div>
      <ul className="space-y-2">
        {mockAppointments.map(appt => (
          <li
            key={appt.id}
            onClick={() => onSelectPatient(appt.id, appt.encounterId)}
            className={`p-2 rounded-md shadow hover:bg-sky-100 cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-[1.02]
                        ${selectedPatientId === appt.id ? 'bg-sky-200 ring-2 ring-sky-500 shadow-lg' : 'bg-white hover:shadow-md'}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <User className="w-3 h-3 text-sky-600" />
              <div className={`font-medium text-sm ${selectedPatientId === appt.id ? 'text-sky-800' : 'text-sky-700'}`}>
                {appt.name}
              </div>
            </div>
            <div className={`text-xs ${selectedPatientId === appt.id ? 'text-slate-700' : 'text-slate-600'}`}>
              {appt.time} - {appt.reason}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DaySchedulePane;
