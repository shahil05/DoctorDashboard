import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatientTableRow = ({ patient, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'follow-up':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'completed':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getDoshaColor = (dosha) => {
    switch (dosha?.toLowerCase()) {
      case 'vata':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pitta':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'kapha':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <tr className="border-b hover:bg-muted/30 transition-colors duration-150">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={patient?.avatar}
              alt={patient?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {patient?.hasUrgentFollowUp && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-card" />
            )}
          </div>
          <div>
            <p className="font-body font-medium text-foreground">{patient?.name}</p>
            <p className="text-sm text-muted-foreground font-caption">ID: {patient?.id}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-body text-foreground">{patient?.age}</span>
      </td>
      <td className="px-6 py-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={14} className="text-muted-foreground" />
            <span className="text-sm font-mono text-foreground">{patient?.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={14} className="text-muted-foreground" />
            <span className="text-sm font-mono text-muted-foreground">{patient?.email}</span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-body text-foreground">{formatDate(patient?.lastVisit)}</span>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDoshaColor(patient?.primaryDosha)}`}>
          {patient?.primaryDosha}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(patient?.treatmentStatus)}`}>
            {patient?.treatmentStatus}
          </span>
          {patient?.hasPendingDietChart && (
            <Icon name="AlertCircle" size={16} className="text-warning" title="Pending diet chart update" />
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(patient?.id)}
        >
          View Details
        </Button>
      </td>
    </tr>
  );
};

export default PatientTableRow;