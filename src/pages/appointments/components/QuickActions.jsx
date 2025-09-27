import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuickActions = ({ onScheduleNew, onBlockTime, onSetAvailability, onFilterChange, filters }) => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [showBlockTimeForm, setShowBlockTimeForm] = useState(false);
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);

  const consultationTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'initial', label: 'Initial Consultation' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'diet-planning', label: 'Diet Planning' },
    { value: 'panchakarma', label: 'Panchakarma' },
    { value: 'wellness', label: 'Wellness Check' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const urgencyOptions = [
    { value: 'all', label: 'All Urgency' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'normal', label: 'Normal' },
    { value: 'routine', label: 'Routine' }
  ];

  const handleScheduleSubmit = (e) => {
    e?.preventDefault();
    const formData = new FormData(e.target);
    const appointmentData = {
      patientName: formData?.get('patientName'),
      date: formData?.get('date'),
      time: formData?.get('time'),
      type: formData?.get('type'),
      duration: formData?.get('duration'),
      phone: formData?.get('phone'),
      email: formData?.get('email')
    };
    onScheduleNew(appointmentData);
    setShowScheduleForm(false);
  };

  const handleBlockTimeSubmit = (e) => {
    e?.preventDefault();
    const formData = new FormData(e.target);
    const blockData = {
      date: formData?.get('date'),
      startTime: formData?.get('startTime'),
      endTime: formData?.get('endTime'),
      reason: formData?.get('reason')
    };
    onBlockTime(blockData);
    setShowBlockTimeForm(false);
  };

  const handleAvailabilitySubmit = (e) => {
    e?.preventDefault();
    const formData = new FormData(e.target);
    const availabilityData = {
      days: Array.from(formData?.getAll('days')),
      startTime: formData?.get('startTime'),
      endTime: formData?.get('endTime'),
      slotDuration: formData?.get('slotDuration')
    };
    onSetAvailability(availabilityData);
    setShowAvailabilityForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Quick Action Buttons */}
      <div className="bg-card rounded-lg shadow-elevation-2 p-4">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setShowScheduleForm(true)}
            fullWidth
          >
            Schedule New
          </Button>
          <Button
            variant="outline"
            iconName="Clock"
            iconPosition="left"
            onClick={() => setShowBlockTimeForm(true)}
            fullWidth
          >
            Block Time
          </Button>
          <Button
            variant="outline"
            iconName="Settings"
            iconPosition="left"
            onClick={() => setShowAvailabilityForm(true)}
            fullWidth
          >
            Set Availability
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-card rounded-lg shadow-elevation-2 p-4">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Filter Appointments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Select
            label="Consultation Type"
            options={consultationTypes}
            value={filters?.type}
            onChange={(value) => onFilterChange({ ...filters, type: value })}
          />
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange({ ...filters, status: value })}
          />
          <Select
            label="Urgency"
            options={urgencyOptions}
            value={filters?.urgency}
            onChange={(value) => onFilterChange({ ...filters, urgency: value })}
          />
        </div>
      </div>
      {/* Schedule New Appointment Modal */}
      {showScheduleForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-elevation-4 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Schedule New Appointment
              </h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowScheduleForm(false)}
                className="h-8 w-8"
              />
            </div>
            
            <form onSubmit={handleScheduleSubmit} className="p-4 space-y-4">
              <Input
                label="Patient Name"
                name="patientName"
                type="text"
                placeholder="Enter patient name"
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Date"
                  name="date"
                  type="date"
                  required
                />
                <Input
                  label="Time"
                  name="time"
                  type="time"
                  required
                />
              </div>
              
              <Select
                label="Consultation Type"
                name="type"
                options={consultationTypes?.slice(1)}
                required
              />
              
              <Input
                label="Duration (minutes)"
                name="duration"
                type="number"
                placeholder="30"
                min="15"
                max="120"
                required
              />
              
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                required
              />
              
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="patient@example.com"
                required
              />
              
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowScheduleForm(false)}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  fullWidth
                >
                  Schedule
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Block Time Modal */}
      {showBlockTimeForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-elevation-4 w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Block Time Slot
              </h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowBlockTimeForm(false)}
                className="h-8 w-8"
              />
            </div>
            
            <form onSubmit={handleBlockTimeSubmit} className="p-4 space-y-4">
              <Input
                label="Date"
                name="date"
                type="date"
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start Time"
                  name="startTime"
                  type="time"
                  required
                />
                <Input
                  label="End Time"
                  name="endTime"
                  type="time"
                  required
                />
              </div>
              
              <Input
                label="Reason"
                name="reason"
                type="text"
                placeholder="Personal time, break, etc."
                required
              />
              
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowBlockTimeForm(false)}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  fullWidth
                >
                  Block Time
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Set Availability Modal */}
      {showAvailabilityForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-elevation-4 w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Set Recurring Availability
              </h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowAvailabilityForm(false)}
                className="h-8 w-8"
              />
            </div>
            
            <form onSubmit={handleAvailabilitySubmit} className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Working Days
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']?.map(day => (
                    <label key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="days"
                        value={day?.toLowerCase()}
                        className="rounded border-border"
                      />
                      <span className="text-sm font-body text-foreground">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start Time"
                  name="startTime"
                  type="time"
                  required
                />
                <Input
                  label="End Time"
                  name="endTime"
                  type="time"
                  required
                />
              </div>
              
              <Input
                label="Slot Duration (minutes)"
                name="slotDuration"
                type="number"
                placeholder="30"
                min="15"
                max="120"
                required
              />
              
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAvailabilityForm(false)}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  fullWidth
                >
                  Save Availability
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;