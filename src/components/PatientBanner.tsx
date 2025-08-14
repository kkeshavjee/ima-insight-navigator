
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
    <div className="apollo-glass rounded-xl mx-4 apollo-animate-in">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-lg apollo-text-glow">{patient.name}</div>
              <div className="text-xs text-muted-foreground">Patient ID: {selectedPatientId}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">DOB:</span>
              <span>{patient.dateOfBirth}</span>
              <span className="text-accent font-medium">({calculateAge(patient.dateOfBirth)} years)</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Sex:</span>
              <span>{patient.sex}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Health Card:</span>
              <span className="font-mono">{patient.healthCardNumber}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-accent/10 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full apollo-status-active animate-apollo-pulse"></div>
            <span className="text-xs text-accent font-medium">Active Session</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientBanner;
