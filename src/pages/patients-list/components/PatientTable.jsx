import React from 'react';
import Icon from '../../../components/AppIcon';
import PatientTableRow from './PatientTableRow';

const PatientTable = ({ patients, onViewDetails, sortConfig, onSort }) => {
  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={16} className="text-foreground" />
      : <Icon name="ArrowDown" size={16} className="text-foreground" />;
  };

  const handleSort = (column) => {
    onSort(column);
  };

  const columns = [
    { key: 'name', label: 'Patient Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true },
    { key: 'contact', label: 'Contact Info', sortable: false },
    { key: 'lastVisit', label: 'Last Visit', sortable: true },
    { key: 'primaryDosha', label: 'Primary Dosha', sortable: true },
    { key: 'treatmentStatus', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  if (patients?.length === 0) {
    return (
      <div className="bg-card rounded-lg border shadow-elevation-1 p-8 text-center">
        <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="font-heading font-medium text-lg text-foreground mb-2">No patients found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria or add a new patient.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border shadow-elevation-1 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className={`px-6 py-4 text-left text-sm font-medium text-foreground ${
                    column?.sortable ? 'cursor-pointer hover:bg-muted/70 transition-colors duration-150' : ''
                  }`}
                  onClick={column?.sortable ? () => handleSort(column?.key) : undefined}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column?.label}</span>
                    {column?.sortable && getSortIcon(column?.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {patients?.map((patient) => (
              <PatientTableRow
                key={patient?.id}
                patient={patient}
                onViewDetails={onViewDetails}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientTable;