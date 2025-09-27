import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterToolbar = ({
  searchTerm,
  onSearchChange,
  selectedDosha,
  onDoshaChange,
  selectedStatus,
  onStatusChange,
  dateRange,
  onDateRangeChange,
  onClearFilters,
  onAddPatient
}) => {
  const doshaOptions = [
    { value: '', label: 'All Doshas' },
    { value: 'vata', label: 'Vata' },
    { value: 'pitta', label: 'Pitta' },
    { value: 'kapha', label: 'Kapha' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'completed', label: 'Completed' }
  ];

  const hasActiveFilters = searchTerm || selectedDosha || selectedStatus || dateRange?.from || dateRange?.to;

  return (
    <div className="bg-card rounded-lg border shadow-elevation-1 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-lg text-foreground">Patient Filters</h2>
        <Button
          variant="default"
          iconName="UserPlus"
          iconPosition="left"
          onClick={onAddPatient}
        >
          Add New Patient
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search patients by name, ID, or phone..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        <Select
          placeholder="Filter by Dosha"
          options={doshaOptions}
          value={selectedDosha}
          onChange={onDoshaChange}
        />

        <Select
          placeholder="Filter by Status"
          options={statusOptions}
          value={selectedStatus}
          onChange={onStatusChange}
        />

        <div className="flex items-end space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="default"
              iconName="X"
              iconPosition="left"
              onClick={onClearFilters}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label="Last Visit From"
          value={dateRange?.from}
          onChange={(e) => onDateRangeChange({ ...dateRange, from: e?.target?.value })}
        />
        
        <Input
          type="date"
          label="Last Visit To"
          value={dateRange?.to}
          onChange={(e) => onDateRangeChange({ ...dateRange, to: e?.target?.value })}
        />
      </div>
      {hasActiveFilters && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Filter" size={16} />
          <span>Active filters applied</span>
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;