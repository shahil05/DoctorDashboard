import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActionControlsBar = ({ onSaveDraft, onPreview, onSendToPatient, onPrint, onExport }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await onSaveDraft();
      setLastSaved(new Date());
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const exportOptions = [
    { label: 'PDF Document', icon: 'FileText', action: () => onExport('pdf') },
    { label: 'Excel Spreadsheet', icon: 'FileSpreadsheet', action: () => onExport('excel') },
    { label: 'Word Document', icon: 'FileType', action: () => onExport('word') }
  ];

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 border p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Primary Actions */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            iconName="Save"
            iconPosition="left"
            loading={isSaving}
            onClick={handleSaveDraft}
          >
            Save Draft
          </Button>

          <Button
            variant="secondary"
            iconName="Eye"
            iconPosition="left"
            onClick={onPreview}
          >
            Preview Chart
          </Button>

          <Button
            variant="default"
            iconName="Send"
            iconPosition="left"
            onClick={onSendToPatient}
          >
            Send to Patient
          </Button>

          <Button
            variant="outline"
            iconName="Printer"
            iconPosition="left"
            onClick={onPrint}
          >
            Print
          </Button>
        </div>

        {/* Secondary Actions & Status */}
        <div className="flex items-center space-x-4">
          {/* Last Saved Status */}
          {lastSaved && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span className="font-caption">
                Saved at {lastSaved?.toLocaleTimeString()}
              </span>
            </div>
          )}

          {/* Export Dropdown */}
          <div className="relative group">
            <Button
              variant="ghost"
              iconName="Download"
              iconPosition="left"
              size="sm"
            >
              Export
              <Icon name="ChevronDown" size={16} className="ml-1" />
            </Button>
            
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover border rounded-lg shadow-elevation-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <div className="p-2">
                {exportOptions?.map((option, index) => (
                  <button
                    key={index}
                    onClick={option?.action}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg hover:bg-muted transition-colors duration-150"
                  >
                    <Icon name={option?.icon} size={16} className="text-muted-foreground" />
                    <span className="text-sm font-body text-foreground">{option?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Status */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
            <span className="text-sm font-caption text-muted-foreground">
              Draft
            </span>
          </div>
        </div>
      </div>
      {/* Progress Indicator */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-caption text-muted-foreground">
            Chart Completion
          </span>
          <span className="text-sm font-mono text-foreground">
            18/21 meals
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: '85.7%' }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1 font-caption">
          3 meals remaining to complete the weekly chart
        </p>
      </div>
    </div>
  );
};

export default ActionControlsBar;