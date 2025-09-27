import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AppointmentDetailsPanel = ({ selectedAppointment, onClose,onScheduleNew, onBlockTime, onSetAvailability, onFilterChange, filters, onReschedule, onCancel, onConfirm }) => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
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
  if (!selectedAppointment) {
    return (
      <div className="bg-card rounded-lg shadow-elevation-2 p-6">
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-medium text-foreground mb-2">
            No Appointment Selected
          </h3>
          <p className="text-muted-foreground font-body">
            Select an appointment from the calendar to view details
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'cancelled':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getDoshaColor = (dosha) => {
    switch (dosha?.toLowerCase()) {
      case 'vata':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pitta':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'kapha':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Appointment Details
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClose}
          className="h-8 w-8"
        />
      </div>
      <div className="p-6 space-y-6">
        {/* Patient Information */}
        <div className="flex items-start space-x-4">
          <Image
            src={selectedAppointment?.patientAvatar}
            alt={selectedAppointment?.patientName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="text-lg font-heading font-semibold text-foreground">
              {selectedAppointment?.patientName}
            </h4>
            <p className="text-muted-foreground font-body text-sm">
              Age: {selectedAppointment?.patientAge} • {selectedAppointment?.patientGender}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium border
                ${getStatusColor(selectedAppointment?.status)}
              `}>
                {selectedAppointment?.status?.charAt(0)?.toUpperCase() + selectedAppointment?.status?.slice(1)}
              </span>
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium border
                ${getDoshaColor(selectedAppointment?.dosha)}
              `}>
                {selectedAppointment?.dosha} Dosha
              </span>
            </div>
          </div>
        </div>

        {/* Appointment Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Date & Time</label>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm font-body text-foreground">
                  {new Date(selectedAppointment.date)?.toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm font-mono text-foreground">
                  {selectedAppointment?.time}
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Consultation Type</label>
              <p className="text-sm font-body text-foreground mt-1">
                {selectedAppointment?.type}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Contact</label>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <span className="text-sm font-mono text-foreground">
                  {selectedAppointment?.patientPhone}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span className="text-sm font-body text-foreground">
                  {selectedAppointment?.patientEmail}
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Duration</label>
              <p className="text-sm font-body text-foreground mt-1">
                {selectedAppointment?.duration} minutes
              </p>
            </div>
          </div>
        </div>

        {/* Health Information */}
        <div>
          <label className="text-sm font-medium text-muted-foreground">Health Status</label>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              Rasa: {selectedAppointment?.rasa}
            </span>
            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
              Agni: {selectedAppointment?.agni}
            </span>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
              Treatment: {selectedAppointment?.treatmentStatus}
            </span>
          </div>
        </div>

        {/* Notes */}
        {selectedAppointment?.notes && (
          <div>
            <label className="text-sm font-medium text-muted-foreground">Preparation Notes</label>
            <div className="mt-2 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-body text-foreground">
                {selectedAppointment?.notes}
              </p>
            </div>
          </div>
        )}

        {/* Previous Consultations */}
        {selectedAppointment?.previousConsultations && (
          <div>
            <label className="text-sm font-medium text-muted-foreground">Recent Consultations</label>
            <div className="mt-2 space-y-2">
              {selectedAppointment?.previousConsultations?.map((consultation, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <div>
                    <span className="text-sm font-body text-foreground">
                      {consultation?.date}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {consultation?.type}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {consultation?.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2 pt-4 border-t">
          {selectedAppointment?.status === 'pending' && (
            <Button
              variant="default"
              iconName="Check"
              iconPosition="left"
              onClick={() => onConfirm(selectedAppointment)}
              fullWidth
            >
              Confirm Appointment
            </Button>
          )}
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              iconName="Calendar"
              iconPosition="left"
              onClick={() => onReschedule(selectedAppointment)}
            >
              Reschedule
            </Button>
            <Button
              variant="outline"
              iconName="MessageSquare"
              iconPosition="left"
            >
              Send Reminder
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              iconName="Phone"
              iconPosition="left"
            >
              Call Patient
            </Button>
            <Button
              variant="outline"
              iconName="FileText"
              iconPosition="left"
            >
              View Records
            </Button>
          </div>
          
          {selectedAppointment?.status !== 'cancelled' && (
            <Button
              variant="destructive"
              iconName="X"
              iconPosition="left"
              onClick={() => onCancel(selectedAppointment)}
              fullWidth
            >
              Cancel Appointment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsPanel;