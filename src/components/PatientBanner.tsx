
import React from 'react';
import { User, Calendar, Heart, CreditCard } from 'lucide-react';

interface PatientBannerProps {
  selectedPatientId: string | null;
}

const PatientBanner: React.FC<PatientBannerProps> = ({ selectedPatientId }) => {
  // Mock patient data
  const patientData: Record<string, any> = {
    p001: {
      name: 'John Doe',
      dateOfBirth: '1975-03-15',
      sex: 'Male',
      healthCardNumber: '1234-567-890'
    },
    p002: {
      name: 'Jane Smith',
      dateOfBirth: '1988-07-22',
      sex: 'Female',
      healthCardNumber: '2345-678-901'
    },
    p003: {
      name: 'Alice Brown',
      dateOfBirth: '1992-11-08',
      sex: 'Female',
      healthCardNumber: '3456-789-012'
    },
    p004: {
      name: 'Robert Wilson',
      dateOfBirth: '1965-01-30',
      sex: 'Male',
      healthCardNumber: '4567-890-123'
    },
    p005: {
      name: 'Maria Garcia',
      dateOfBirth: '1980-09-12',
      sex: 'Female',
      healthCardNumber: '5678-901-234'
    }
  };

  const patient = selectedPatientId ? patientData[selectedPatientId] : null;

  if (!patient) return null;

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="bg-blue-600 text-white p-3 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="text-sm font-semibold">{patient.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">DOB: {patient.dateOfBirth} (Age: {calculateAge(patient.dateOfBirth)})</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span className="text-sm">Sex: {patient.sex}</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="text-sm">Health Card: {patient.healthCardNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientBanner;
