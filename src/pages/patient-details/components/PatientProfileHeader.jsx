import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatientProfileHeader = ({ patient, onEditProfile, onCreateDietChart, onScheduleFollowup }) => {
  const getDoshaColor = (dosha) => {
    const colors = {
      'Vata': 'bg-blue-100 text-blue-800',
      'Pitta': 'bg-red-100 text-red-800',
      'Kapha': 'bg-green-100 text-green-800'
    };
    return colors?.[dosha] || 'bg-gray-100 text-gray-800';
  };

  const getRasaColor = (rasa) => {
    const colors = {
      'Sweet': 'bg-pink-100 text-pink-800',
      'Sour': 'bg-yellow-100 text-yellow-800',
      'Salty': 'bg-orange-100 text-orange-800',
      'Pungent': 'bg-red-100 text-red-800',
      'Bitter': 'bg-green-100 text-green-800',
      'Astringent': 'bg-purple-100 text-purple-800'
    };
    return colors?.[rasa] || 'bg-gray-100 text-gray-800';
  };

  const getAgniColor = (agni) => {
    const colors = {
      'Strong': 'bg-green-100 text-green-800',
      'Moderate': 'bg-yellow-100 text-yellow-800',
      'Weak': 'bg-red-100 text-red-800'
    };
    return colors?.[agni] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-6 border">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* Patient Basic Info */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="relative">
            <Image
              src={patient?.avatar}
              alt={patient?.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary/10"
            />
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-card flex items-center justify-center ${
              patient?.status === 'Active' ? 'bg-success' : 'bg-warning'
            }`}>
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-heading font-semibold text-foreground">
                {patient?.name}
              </h1>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                patient?.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
              }`}>
                {patient?.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Age:</span>
                <span className="font-medium text-foreground">{patient?.age} years</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Gender:</span>
                <span className="font-medium text-foreground">{patient?.gender}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium text-foreground">{patient?.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium text-foreground">{patient?.email}</span>
              </div>
            </div>

            {/* Ayurvedic Indicators */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-foreground mb-2">Ayurvedic Profile</h3>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Dosha:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDoshaColor(patient?.dosha)}`}>
                    {patient?.dosha}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Rasa:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRasaColor(patient?.rasa)}`}>
                    {patient?.rasa}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Agni:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAgniColor(patient?.agni)}`}>
                    {patient?.agni}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:min-w-[200px]">
          <Button
            variant="default"
            iconName="Utensils"
            iconPosition="left"
            onClick={onCreateDietChart}
            className="w-full sm:w-auto lg:w-full"
          >
            Create Diet Chart
          </Button>
          <Button
            variant="outline"
            iconName="Calendar"
            iconPosition="left"
            onClick={onScheduleFollowup}
            className="w-full sm:w-auto lg:w-full"
          >
            Schedule Follow-up
          </Button>
          <Button
            variant="ghost"
            iconName="Edit"
            iconPosition="left"
            onClick={onEditProfile}
            className="w-full sm:w-auto lg:w-full"
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileHeader;