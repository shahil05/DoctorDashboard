import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const PatientInfoPanel = ({ patient, onPatientSelect }) => {
  const patientData = {
    id: 'P001',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    dosha: 'Vata-Pitta',
    rasa: 'Madhura',
    agni: 'Sama',
    height: '5\'8"',
    weight: '72 kg',
    bmi: '23.4',
    conditions: ['Hypertension', 'Diabetes Type 2', 'Arthritis'],
    allergies: ['Nuts', 'Dairy'],
    restrictions: ['Low Sodium', 'Sugar-Free', 'Gluten-Free'],
    lastVisit: '2025-01-15',
    previousCharts: [
      {
        id: 'DC001',
        date: '2025-01-15',
        type: 'Weight Management',
        status: 'Active'
      },
      {
        id: 'DC002',
        date: '2024-12-20',
        type: 'Diabetes Control',
        status: 'Completed'
      }
    ]
  };

  const doshaColors = {
    'Vata': 'bg-blue-100 text-blue-800',
    'Pitta': 'bg-red-100 text-red-800',
    'Kapha': 'bg-green-100 text-green-800',
    'Vata-Pitta': 'bg-purple-100 text-purple-800',
    'Pitta-Kapha': 'bg-orange-100 text-orange-800',
    'Vata-Kapha': 'bg-teal-100 text-teal-800'
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 border h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Patient Information
          </h2>
          <button
            onClick={onPatientSelect}
            className="text-sm text-primary hover:text-primary/80 font-body"
          >
            Change Patient
          </button>
        </div>

        {/* Patient Basic Info */}
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Image
              src={patientData?.avatar}
              alt={patientData?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card flex items-center justify-center">
              <Icon name="Check" size={12} className="text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-foreground">
              {patientData?.name}
            </h3>
            <p className="text-sm text-muted-foreground font-body">
              ID: {patientData?.id} • {patientData?.age} years • {patientData?.gender}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-caption ${doshaColors?.[patientData?.dosha]}`}>
                {patientData?.dosha}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-caption bg-accent/20 text-accent-foreground">
                {patientData?.rasa}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-caption bg-secondary/20 text-secondary-foreground">
                {patientData?.agni}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Physical Stats */}
      <div className="p-6 border-b">
        <h4 className="font-heading font-medium text-foreground mb-3">
          Physical Stats
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-caption">Height</p>
            <p className="font-mono font-medium text-foreground">{patientData?.height}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-caption">Weight</p>
            <p className="font-mono font-medium text-foreground">{patientData?.weight}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-caption">BMI</p>
            <p className="font-mono font-medium text-foreground">{patientData?.bmi}</p>
          </div>
        </div>
      </div>
      {/* Health Conditions */}
      <div className="p-6 border-b">
        <h4 className="font-heading font-medium text-foreground mb-3">
          Current Conditions
        </h4>
        <div className="space-y-2">
          {patientData?.conditions?.map((condition, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-warning" />
              <span className="text-sm font-body text-foreground">{condition}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Allergies & Restrictions */}
      <div className="p-6 border-b">
        <h4 className="font-heading font-medium text-foreground mb-3">
          Allergies & Restrictions
        </h4>
        
        <div className="mb-4">
          <p className="text-sm font-caption text-muted-foreground mb-2">Allergies:</p>
          <div className="flex flex-wrap gap-2">
            {patientData?.allergies?.map((allergy, index) => (
              <span key={index} className="px-2 py-1 bg-error/10 text-error rounded-full text-xs font-caption">
                {allergy}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-caption text-muted-foreground mb-2">Dietary Restrictions:</p>
          <div className="flex flex-wrap gap-2">
            {patientData?.restrictions?.map((restriction, index) => (
              <span key={index} className="px-2 py-1 bg-warning/10 text-warning rounded-full text-xs font-caption">
                {restriction}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Previous Diet Charts */}
      <div className="p-6">
        <h4 className="font-heading font-medium text-foreground mb-3">
          Previous Diet Charts
        </h4>
        <div className="space-y-3">
          {patientData?.previousCharts?.map((chart) => (
            <div key={chart?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-body font-medium text-foreground">{chart?.type}</p>
                <p className="text-xs text-muted-foreground font-caption">{chart?.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-caption ${
                  chart?.status === 'Active' ?'bg-success/20 text-success' :'bg-muted-foreground/20 text-muted-foreground'
                }`}>
                  {chart?.status}
                </span>
                <button className="text-primary hover:text-primary/80">
                  <Icon name="Eye" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientInfoPanel;