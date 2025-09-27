import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../AppImage';
import Icon from '../AppIcon';

const DoctorProfileCard = ({ compact = false }) => {
  const navigate = useNavigate();

  const doctorData = {
    name: 'Dr. Priya Sharma',
    specialization: 'Ayurvedic Physician',
    experience: '12 years',
    avatar: '/assets/images/doctor-avatar.jpg',
    status: 'Available',
    nextAppointment: '2:30 PM'
  };

  const handleProfileClick = () => {
    navigate('/doctor-profile');
  };

  if (compact) {
    return (
      <button
        onClick={handleProfileClick}
        className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-muted transition-colors duration-150 text-left"
      >
        <div className="relative">
          <Image
            src={doctorData?.avatar}
            alt={doctorData?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-body font-medium text-sm text-foreground truncate">
            {doctorData?.name}
          </p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleProfileClick}
      className="w-full p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-150 text-left group"
    >
      <div className="flex items-start space-x-3">
        <div className="relative flex-shrink-0">
          <Image
            src={doctorData?.avatar}
            alt={doctorData?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-medium text-sm text-foreground truncate">
              {doctorData?.name}
            </h3>
            <Icon
              name="ChevronRight"
              size={16}
              className="text-muted-foreground group-hover:text-foreground transition-colors duration-150"
            />
          </div>
          
          <p className="text-xs text-muted-foreground font-caption mt-1">
            {doctorData?.specialization}
          </p>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-xs text-success font-caption">
                {doctorData?.status}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-mono">
                {doctorData?.nextAppointment}
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default DoctorProfileCard;