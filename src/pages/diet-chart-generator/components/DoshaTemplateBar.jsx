import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DoshaTemplateBar = ({ selectedDosha, onTemplateSelect, onSeasonalSelect }) => {
  const doshaTemplates = [
    {
      dosha: 'Vata',
      color: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: 'Wind',
      description: 'Warm, moist, grounding foods'
    },
    {
      dosha: 'Pitta',
      color: 'bg-red-50 border-red-200 text-red-800',
      icon: 'Flame',
      description: 'Cool, sweet, bitter foods'
    },
    {
      dosha: 'Kapha',
      color: 'bg-green-50 border-green-200 text-green-800',
      icon: 'Mountain',
      description: 'Light, warm, spicy foods'
    }
  ];

  const seasonalOptions = [
    { season: 'Spring', icon: 'Flower2', foods: 'Detoxifying greens, light grains' },
    { season: 'Summer', icon: 'Sun', foods: 'Cooling fruits, coconut water' },
    { season: 'Monsoon', icon: 'CloudRain', foods: 'Warm spices, dry preparations' },
    { season: 'Autumn', icon: 'Leaf', foods: 'Nourishing roots, warming herbs' },
    { season: 'Winter', icon: 'Snowflake', foods: 'Heavy grains, warming oils' }
  ];

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 border p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Dosha Templates */}
        <div className="flex-1">
          <h3 className="text-sm font-heading font-medium text-foreground mb-3">
            Dosha-Based Templates
          </h3>
          <div className="flex flex-wrap gap-2">
            {doshaTemplates?.map((template) => (
              <button
                key={template?.dosha}
                onClick={() => onTemplateSelect(template?.dosha)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-150
                  ${selectedDosha === template?.dosha 
                    ? template?.color + ' shadow-elevation-1' 
                    : 'bg-muted/50 border-border text-muted-foreground hover:bg-muted'
                  }
                `}
                title={template?.description}
              >
                <Icon name={template?.icon} size={16} />
                <span className="text-sm font-body font-medium">{template?.dosha}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Seasonal Recommendations */}
        <div className="flex-1 lg:ml-6">
          <h3 className="text-sm font-heading font-medium text-foreground mb-3">
            Seasonal Recommendations
          </h3>
          <div className="flex flex-wrap gap-2">
            {seasonalOptions?.map((option) => (
              <button
                key={option?.season}
                onClick={() => onSeasonalSelect(option?.season)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent-foreground hover:bg-accent/20 transition-colors duration-150"
                title={option?.foods}
              >
                <Icon name={option?.icon} size={16} />
                <span className="text-sm font-body font-medium">{option?.season}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2 lg:ml-6">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={() => onTemplateSelect('reset')}
          >
            Reset
          </Button>
          <Button
            variant="secondary"
            size="sm"
            iconName="Sparkles"
            iconPosition="left"
            onClick={() => onTemplateSelect('auto')}
          >
            Auto-Fill
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoshaTemplateBar;