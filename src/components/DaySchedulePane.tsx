
import React, { useState, useMemo } from 'react';
import { Clock, User, Search, Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface Appointment {
  id: string;
  encounterId: string;
  name: string;
  time: string;
  reason: string;
}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  phone: string;
}

interface DaySchedulePaneProps {
  onSelectPatient: (patientId: string, encounterId: string) => void;
  selectedPatientId: string | null;
}

const DaySchedulePane: React.FC<DaySchedulePaneProps> = ({ onSelectPatient, selectedPatientId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 'p001', encounterId: 'e001', name: 'John Doe', time: '09:00 AM', reason: 'Annual Physical' },
    { id: 'p002', encounterId: 'e002', name: 'Jane Smith', time: '09:30 AM', reason: 'Follow-up' },
    { id: 'p003', encounterId: 'e003', name: 'Alice Brown', time: '10:00 AM', reason: 'New Complaint' },
    { id: 'p004', encounterId: 'e004', name: 'Robert Wilson', time: '10:30 AM', reason: 'Medication Review' },
    { id: 'p005', encounterId: 'e005', name: 'Maria Garcia', time: '11:00 AM', reason: 'Lab Results' },
  ]);
  
  // Mock patient database (broader than just today's schedule)
  const patientDatabase: Patient[] = [
    // Current day patients
    { id: 'p001', name: 'John Doe', dateOfBirth: '1975-03-15', phone: '(555) 123-4567' },
    { id: 'p002', name: 'Jane Smith', dateOfBirth: '1982-07-22', phone: '(555) 234-5678' },
    { id: 'p003', name: 'Alice Brown', dateOfBirth: '1990-11-08', phone: '(555) 345-6789' },
    { id: 'p004', name: 'Robert Wilson', dateOfBirth: '1968-01-30', phone: '(555) 456-7890' },
    { id: 'p005', name: 'Maria Garcia', dateOfBirth: '1985-09-12', phone: '(555) 567-8901' },
    // Additional patients in database
    { id: 'p006', name: 'David Johnson', dateOfBirth: '1979-05-18', phone: '(555) 678-9012' },
    { id: 'p007', name: 'Sarah Williams', dateOfBirth: '1992-12-03', phone: '(555) 789-0123' },
    { id: 'p008', name: 'Michael Brown', dateOfBirth: '1965-08-25', phone: '(555) 890-1234' },
    { id: 'p009', name: 'Emily Davis', dateOfBirth: '1988-04-14', phone: '(555) 901-2345' },
    { id: 'p010', name: 'James Miller', dateOfBirth: '1973-10-07', phone: '(555) 012-3456' },
  ];

  // Filter appointments based on search term
  const filteredAppointments = useMemo(() => {
    if (!searchTerm.trim()) {
      return appointments;
    }
    return appointments.filter(appt => 
      appt.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, appointments]);

  // Find patients in database that match search but aren't scheduled today
  const availablePatients = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }
    const scheduledPatientIds = appointments.map(appt => appt.id);
    return patientDatabase.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !scheduledPatientIds.includes(patient.id)
    );
  }, [searchTerm, appointments]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const addPatientToSchedule = (patient: Patient) => {
    const newEncounterId = `e${Date.now()}`;
    const newAppointment: Appointment = {
      id: patient.id,
      encounterId: newEncounterId,
      name: patient.name,
      time: getCurrentTime(),
      reason: 'Walk-in'
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    console.log(`Added ${patient.name} to schedule at ${newAppointment.time}`);
  };

  return (
    <div className="h-full bg-slate-100 p-2 rounded-lg shadow-md overflow-y-auto">
      <div className="flex items-center gap-1 mb-2">
        <Clock className="w-2.5 h-2.5 text-slate-600" />
        <h2 className="text-xs font-semibold text-slate-700">Day Schedule</h2>
      </div>
      
      {/* Search input */}
      <div className="relative mb-3">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 text-slate-400" />
        <Input
          type="text"
          placeholder="Search all patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-6 h-6 text-xs bg-white border-slate-300 focus:border-sky-500 focus:ring-sky-500"
        />
      </div>

      {/* Available patients to add (when searching) */}
      {availablePatients.length > 0 && (
        <div className="mb-3">
          <h3 className="text-xs font-medium text-slate-600 mb-1">Add to Schedule:</h3>
          <div className="space-y-1">
            {availablePatients.map(patient => (
              <div key={patient.id} className="flex items-center justify-between p-1 bg-green-50 rounded border border-green-200">
                <div className="flex-1">
                  <div className="text-xs font-medium text-green-800">{patient.name}</div>
                  <div className="text-xs text-green-600">{patient.phone}</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addPatientToSchedule(patient)}
                  className="h-5 px-1.5 text-xs border-green-300 hover:bg-green-100"
                >
                  <Plus className="w-2.5 h-2.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current day schedule */}
      <div className="mb-2">
        <h3 className="text-xs font-medium text-slate-600 mb-1">Today's Schedule:</h3>
      </div>

      <ul className="space-y-1">
        {filteredAppointments.map(appt => (
          <li
            key={`${appt.id}-${appt.encounterId}`}
            onClick={() => onSelectPatient(appt.id, appt.encounterId)}
            className={`p-1 rounded-md shadow hover:bg-sky-100 cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-[1.02]
                        ${selectedPatientId === appt.id ? 'bg-sky-200 ring-1 ring-sky-500 shadow-lg' : 'bg-white hover:shadow-md'}`}
          >
            <div className="flex items-center gap-1 mb-0.5">
              <User className="w-2 h-2 text-sky-600" />
              <div className={`font-medium text-xs ${selectedPatientId === appt.id ? 'text-sky-800' : 'text-sky-700'}`}>
                {appt.name}
              </div>
            </div>
            <div className={`text-xs ${selectedPatientId === appt.id ? 'text-slate-700' : 'text-slate-600'}`}>
              {appt.time} - {appt.reason}
            </div>
          </li>
        ))}
        {filteredAppointments.length === 0 && searchTerm && availablePatients.length === 0 && (
          <li className="p-2 text-center text-xs text-slate-500">
            No patients found matching "{searchTerm}"
          </li>
        )}
      </ul>
    </div>
  );
};

export default DaySchedulePane;
