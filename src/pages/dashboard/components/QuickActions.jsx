import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Add New Patient',
      icon: 'UserPlus',
      variant: 'default',
      onClick: () => navigate('/patients-list')
    },
    {
      label: 'Create Diet Chart',
      icon: 'Utensils',
      variant: 'secondary',
      onClick: () => navigate('/diet-chart-generator')
    },
    {
      label: 'Schedule Appointment',
      icon: 'Calendar',
      variant: 'outline',
      onClick: () => navigate('/appointments')
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 border shadow-elevation-1">
      <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
        Quick Actions
      </h2>
      <div className="space-y-3">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            fullWidth
            iconName={action?.icon}
            iconPosition="left"
            onClick={action?.onClick}
            className="justify-start"
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;