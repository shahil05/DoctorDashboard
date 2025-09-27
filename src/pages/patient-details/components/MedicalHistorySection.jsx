import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MedicalHistorySection = ({ medicalHistory, onAddConsultation }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded?.has(id)) {
      newExpanded?.delete(id);
    } else {
      newExpanded?.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'Low': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-red-100 text-red-800'
    };
    return colors?.[severity] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-6 border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Medical History
        </h2>
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          onClick={onAddConsultation}
        >
          Add Consultation
        </Button>
      </div>
      <div className="space-y-4">
        {medicalHistory?.map((record) => (
          <div
            key={record?.id}
            className="border rounded-lg p-4 hover:shadow-elevation-1 transition-shadow duration-150"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-foreground">{record?.condition}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(record?.severity)}`}>
                    {record?.severity}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(record?.date)}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Icon name="User" size={14} />
                    <span>Dr. {record?.doctor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    <span>{record?.duration}</span>
                  </div>
                </div>

                <p className="text-sm text-foreground mb-3">
                  {record?.summary}
                </p>

                {expandedItems?.has(record?.id) && (
                  <div className="space-y-3 pt-3 border-t">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">Symptoms</h4>
                      <p className="text-sm text-muted-foreground">{record?.symptoms}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">Treatment</h4>
                      <p className="text-sm text-muted-foreground">{record?.treatment}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">Medications</h4>
                      <div className="flex flex-wrap gap-2">
                        {record?.medications?.map((med, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-muted rounded-full text-xs text-foreground"
                          >
                            {med}
                          </span>
                        ))}
                      </div>
                    </div>
                    {record?.notes && (
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-1">Notes</h4>
                        <p className="text-sm text-muted-foreground">{record?.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                iconName={expandedItems?.has(record?.id) ? "ChevronUp" : "ChevronDown"}
                onClick={() => toggleExpanded(record?.id)}
                className="ml-2"
              />
            </div>
          </div>
        ))}

        {medicalHistory?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No medical history records found</p>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              onClick={onAddConsultation}
              className="mt-3"
            >
              Add First Consultation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalHistorySection;