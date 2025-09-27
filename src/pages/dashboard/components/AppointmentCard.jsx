import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AppointmentCard = ({ appointment }) => {
  const navigate = useNavigate();

  const handleViewPatient = () => {
    navigate('/patient-details');
  };

  const handleReschedule = () => {
    navigate('/appointments');
  };

  const getDoshaColor = (dosha) => {
    const colors = {
      'Vata': 'bg-blue-100 text-blue-800',
      'Pitta': 'bg-red-100 text-red-800',
      'Kapha': 'bg-green-100 text-green-800'
    };
    return colors?.[dosha] || 'bg-gray-100 text-gray-800';
  };

  const getConsultationTypeIcon = (type) => {
    const icons = {
      'Initial Consultation': 'UserPlus',
      'Follow-up': 'RefreshCw',
      'Diet Review': 'Utensils',
      'General Checkup': 'Stethoscope'
    };
    return icons?.[type] || 'Calendar';
  };

  return (
    <div className="bg-card rounded-lg p-4 border shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Image
            src={appointment?.patientAvatar}
            alt={appointment?.patientName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-heading font-medium text-foreground">
              {appointment?.patientName}
            </h3>
            <p className="text-sm text-muted-foreground font-caption">
              Age {appointment?.age} • {appointment?.gender}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-mono font-medium text-foreground">
            {appointment?.time}
          </p>
          <p className="text-xs text-muted-foreground font-caption">
            {appointment?.duration}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-3">
        <Icon 
          name={getConsultationTypeIcon(appointment?.consultationType)} 
          size={16} 
          className="text-muted-foreground" 
        />
        <span className="text-sm text-muted-foreground font-body">
          {appointment?.consultationType}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-caption ${getDoshaColor(appointment?.dosha)}`}>
          {appointment?.dosha}
        </span>
      </div>
      {appointment?.notes && (
        <p className="text-sm text-muted-foreground mb-3 font-body">
          {appointment?.notes}
        </p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Icon name="History" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-caption">
            {appointment?.visitCount} visits
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Clock"
            iconPosition="left"
            onClick={handleReschedule}
          >
            Reschedule
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={handleViewPatient}
          >
            View Patient
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;