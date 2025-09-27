import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DietChartsSection = ({ dietCharts, onCreateDietChart }) => {
  const navigate = useNavigate();
  const [selectedChart, setSelectedChart] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEffectivenessColor = (rating) => {
    if (rating >= 4) return 'text-success';
    if (rating >= 3) return 'text-warning';
    return 'text-error';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={`${
          index < rating
            ? 'text-warning fill-current' :'text-muted-foreground'
        }`}
      />
    ));
  };

  const handleViewChart = (chartId) => {
    navigate('/diet-chart-generator', { state: { chartId, mode: 'view' } });
  };

  const handleEditChart = (chartId) => {
    navigate('/diet-chart-generator', { state: { chartId, mode: 'edit' } });
  };

  const showPreview = (chart) => {
    setSelectedChart(chart);
  };

  const closePreview = () => {
    setSelectedChart(null);
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-6 border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Diet Charts History
        </h2>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={onCreateDietChart}
        >
          Create New Chart
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dietCharts?.map((chart) => (
          <div
            key={chart?.id}
            className="border rounded-lg p-4 hover:shadow-elevation-1 transition-shadow duration-150"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-foreground mb-1">{chart?.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Created: {formatDate(chart?.createdDate)}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                chart?.status === 'Active' ?'bg-success/10 text-success'
                  : chart?.status === 'Completed' ?'bg-blue-100 text-blue-800' :'bg-muted text-muted-foreground'
              }`}>
                {chart?.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium text-foreground">{chart?.duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Focus:</span>
                <span className="font-medium text-foreground">{chart?.focus}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Effectiveness:</span>
                <div className="flex items-center gap-1">
                  {renderStars(chart?.effectiveness)}
                  <span className={`text-sm font-medium ml-1 ${getEffectivenessColor(chart?.effectiveness)}`}>
                    {chart?.effectiveness}/5
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                onClick={() => handleViewChart(chart?.id)}
                className="flex-1"
              >
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit"
                onClick={() => handleEditChart(chart?.id)}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Search"
                onClick={() => showPreview(chart)}
              >
                Preview
              </Button>
            </div>
          </div>
        ))}

        {dietCharts?.length === 0 && (
          <div className="col-span-full text-center py-8">
            <Icon name="Utensils" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground mb-3">No diet charts created yet</p>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              onClick={onCreateDietChart}
            >
              Create First Diet Chart
            </Button>
          </div>
        )}
      </div>
      {/* Preview Modal */}
      {selectedChart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-elevation-4 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {selectedChart?.title} - Preview
              </h3>
              <Button
                variant="ghost"
                iconName="X"
                onClick={closePreview}
              />
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm text-muted-foreground">Duration:</span>
                  <p className="font-medium text-foreground">{selectedChart?.duration}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Focus:</span>
                  <p className="font-medium text-foreground">{selectedChart?.focus}</p>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-foreground mb-2">Sample Meals:</h4>
                <div className="space-y-2">
                  {selectedChart?.sampleMeals?.map((meal, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <span className="text-sm font-medium text-foreground">{meal?.time}</span>
                      <span className="text-sm text-muted-foreground">{meal?.description}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  iconName="Eye"
                  iconPosition="left"
                  onClick={() => {
                    closePreview();
                    handleViewChart(selectedChart?.id);
                  }}
                  className="flex-1"
                >
                  View Full Chart
                </Button>
                <Button
                  variant="outline"
                  iconName="Edit"
                  iconPosition="left"
                  onClick={() => {
                    closePreview();
                    handleEditChart(selectedChart?.id);
                  }}
                  className="flex-1"
                >
                  Edit Chart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietChartsSection;