import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, icon, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20'
  };

  const iconColorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning'
  };

  return (
    <div className="bg-card rounded-lg p-6 border shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-caption mb-1">
            {title}
          </p>
          <p className="text-2xl font-heading font-semibold text-foreground">
            {value}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              <Icon 
                name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={trend === 'up' ? 'text-success' : 'text-error'} 
              />
              <span className={`text-sm ml-1 font-mono ${trend === 'up' ? 'text-success' : 'text-error'}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses?.[color]}`}>
          <Icon name={icon} size={24} className={iconColorClasses?.[color]} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;