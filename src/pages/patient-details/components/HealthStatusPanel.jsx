import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthStatusPanel = ({ healthStatus, vitalStats, activeProtocols }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Excellent': 'text-success',
      'Good': 'text-success',
      'Fair': 'text-warning',
      'Poor': 'text-error'
    };
    return colors?.[status] || 'text-muted-foreground';
  };

  const getVitalStatusColor = (value, normal) => {
    const [min, max] = normal?.split('-')?.map(Number);
    const numValue = parseFloat(value);
    
    if (numValue >= min && numValue <= max) return 'text-success';
    if (numValue < min * 0.9 || numValue > max * 1.1) return 'text-error';
    return 'text-warning';
  };

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Current Health Status */}
      <div className="bg-card rounded-lg shadow-elevation-2 p-6 border">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Current Health Status
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Overall Health</span>
            <span className={`font-medium ${getStatusColor(healthStatus?.overall)}`}>
              {healthStatus?.overall}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Energy Level</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${healthStatus?.energyLevel}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground">
                {healthStatus?.energyLevel}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Sleep Quality</span>
            <span className={`font-medium ${getStatusColor(healthStatus?.sleepQuality)}`}>
              {healthStatus?.sleepQuality}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Digestion</span>
            <span className={`font-medium ${getStatusColor(healthStatus?.digestion)}`}>
              {healthStatus?.digestion}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Stress Level</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-error transition-all duration-300"
                  style={{ width: `${healthStatus?.stressLevel}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground">
                {healthStatus?.stressLevel}%
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Vital Statistics */}
      <div className="bg-card rounded-lg shadow-elevation-2 p-6 border">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Vital Statistics
        </h3>
        
        <div className="space-y-4">
          {vitalStats?.map((vital, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name={vital?.icon} size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{vital?.name}</span>
              </div>
              <div className="text-right">
                <span className={`font-medium ${getVitalStatusColor(vital?.value, vital?.normal)}`}>
                  {vital?.value} {vital?.unit}
                </span>
                <p className="text-xs text-muted-foreground">
                  Normal: {vital?.normal} {vital?.unit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Active Treatment Protocols */}
      <div className="bg-card rounded-lg shadow-elevation-2 p-6 border">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Active Protocols
        </h3>
        
        <div className="space-y-4">
          {activeProtocols?.map((protocol, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {protocol?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {protocol?.progress}% Complete
                </span>
              </div>
              
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${protocol?.progress}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Started: {protocol?.startDate}</span>
                <span>Target: {protocol?.targetDate}</span>
              </div>
              
              {protocol?.notes && (
                <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  {protocol?.notes}
                </p>
              )}
            </div>
          ))}
          
          {activeProtocols?.length === 0 && (
            <div className="text-center py-4">
              <Icon name="Activity" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No active protocols</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthStatusPanel;