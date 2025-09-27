import React, { useState, useEffect } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import CalendarView from './components/CalendarView';
import AppointmentDetailsPanel from './components/AppointmentDetailsPanel';
import QuickActions from './components/QuickActions';
import AppointmentStats from './components/AppointmentStats';

import Button from '../../components/ui/Button';

const AppointmentsPage = ({ onScheduleNew, onBlockTime, onSetAvailability, onFilterChange } ) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [viewMode, setViewMode] = useState('month');
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    urgency: 'all'
  });


  // Mock appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'Rajesh Kumar',
      patientAge: 45,
      patientGender: 'Male',
      patientPhone: '+91 98765 43210',
      patientEmail: 'rajesh.kumar@email.com',
      patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      date: '2025-01-18',
      time: '10:00 AM',
      duration: 45,
      type: 'Initial Consultation',
      status: 'confirmed',
      dosha: 'Vata',
      rasa: 'Madhura',
      agni: 'Sama',
      treatmentStatus: 'New Patient',
      urgency: 'normal',
      notes: `Patient reports chronic fatigue and digestive issues. Recommended fasting before consultation.\nBring previous medical reports and current medications list.`,
      previousConsultations: [
        { date: '2024-12-15', type: 'Phone Consultation', duration: '20 min' },
        { date: '2024-11-28', type: 'Initial Assessment', duration: '60 min' }
      ]
    },
    {
      id: 2,
      patientName: 'Priya Sharma',
      patientAge: 32,
      patientGender: 'Female',
      patientPhone: '+91 87654 32109',
      patientEmail: 'priya.sharma@email.com',
      patientAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      date: '2025-01-18',
      time: '2:30 PM',
      duration: 30,
      type: 'Follow-up',
      status: 'pending',
      dosha: 'Pitta',
      rasa: 'Tikta',
      agni: 'Tikshna',
      treatmentStatus: 'Ongoing',
      urgency: 'normal',
      notes: 'Follow-up for Panchakarma treatment. Check progress on dietary changes.',
      previousConsultations: [
        { date: '2025-01-04', type: 'Follow-up', duration: '30 min' },
        { date: '2024-12-21', type: 'Diet Planning', duration: '45 min' }
      ]
    },
    {
      id: 3,
      patientName: 'Amit Patel',
      patientAge: 28,
      patientGender: 'Male',
      patientPhone: '+91 76543 21098',
      patientEmail: 'amit.patel@email.com',
      patientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      date: '2025-01-19',
      time: '9:00 AM',
      duration: 60,
      type: 'Diet Planning',
      status: 'confirmed',
      dosha: 'Kapha',
      rasa: 'Katu',
      agni: 'Manda',
      treatmentStatus: 'Weight Management',
      urgency: 'routine',
      notes: 'Weight management consultation. Create personalized diet chart for Kapha constitution.',
      previousConsultations: []
    },
    {
      id: 4,
      patientName: 'Sunita Reddy',
      patientAge: 55,
      patientGender: 'Female',
      patientPhone: '+91 65432 10987',
      patientEmail: 'sunita.reddy@email.com',
      patientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      date: '2025-01-19',
      time: '11:30 AM',
      duration: 45,
      type: 'Panchakarma',
      status: 'confirmed',
      dosha: 'Vata',
      rasa: 'Kashaya',
      agni: 'Vishama',
      treatmentStatus: 'Detox Program',
      urgency: 'urgent',
      notes: 'Pre-Panchakarma consultation. Assess readiness for detoxification program.',
      previousConsultations: [
        { date: '2025-01-10', type: 'Assessment', duration: '45 min' }
      ]
    },
    {
      id: 5,
      patientName: 'Vikram Singh',
      patientAge: 38,
      patientGender: 'Male',
      patientPhone: '+91 54321 09876',
      patientEmail: 'vikram.singh@email.com',
      patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      date: '2025-01-20',
      time: '3:00 PM',
      duration: 30,
      type: 'Wellness Check',
      status: 'pending',
      dosha: 'Pitta',
      rasa: 'Amla',
      agni: 'Tikshna',
      treatmentStatus: 'Maintenance',
      urgency: 'routine',
      notes: 'Quarterly wellness check-up. Review current health status and lifestyle.',
      previousConsultations: [
        { date: '2024-10-15', type: 'Wellness Check', duration: '30 min' },
        { date: '2024-07-20', type: 'Wellness Check', duration: '30 min' }
      ]
    },
    {
      id: 6,
      patientName: 'Meera Joshi',
      patientAge: 42,
      patientGender: 'Female',
      patientPhone: '+91 43210 98765',
      patientEmail: 'meera.joshi@email.com',
      patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      date: '2025-01-21',
      time: '10:30 AM',
      duration: 45,
      type: 'Follow-up',
      status: 'cancelled',
      dosha: 'Kapha',
      rasa: 'Madhura',
      agni: 'Manda',
      treatmentStatus: 'Recovery',
      urgency: 'normal',
      notes: 'Follow-up cancelled by patient. Reschedule for next week.',
      previousConsultations: [
        { date: '2025-01-07', type: 'Treatment Review', duration: '45 min' }
      ]
    }
  ]);

  const filteredAppointments = appointments?.filter(appointment => {
    if (filters?.type !== 'all' && appointment?.type?.toLowerCase()?.replace(/\s+/g, '-') !== filters?.type) {
      return false;
    }
    if (filters?.status !== 'all' && appointment?.status !== filters?.status) {
      return false;
    }
    if (filters?.urgency !== 'all' && appointment?.urgency !== filters?.urgency) {
      return false;
    }
    return true;
  });
  

  

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedAppointment(null);
  };

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsPanel(true);
  };

  const handleScheduleNew = (appointmentData) => {
    const newAppointment = {
      id: appointments?.length + 1,
      ...appointmentData,
      patientAge: 30,
      patientGender: 'Unknown',
      patientAvatar: '/assets/images/no_image.png',
      status: 'pending',
      dosha: 'Unknown',
      rasa: 'Unknown',
      agni: 'Unknown',
      treatmentStatus: 'New Patient',
      urgency: 'normal',
      notes: 'New appointment scheduled',
      previousConsultations: []
    };
    setAppointments([...appointments, newAppointment]);
  };

  const handleBlockTime = (blockData) => {
    console.log('Blocking time:', blockData);
    // Implementation for blocking time slots
  };

  const handleSetAvailability = (availabilityData) => {
    console.log('Setting availability:', availabilityData);
    // Implementation for setting recurring availability
  };

  const handleReschedule = (appointment) => {
    console.log('Rescheduling appointment:', appointment);
    // Implementation for rescheduling
  };

  const handleCancel = (appointment) => {
    setAppointments(appointments?.map(apt => 
      apt?.id === appointment?.id 
        ? { ...apt, status: 'cancelled' }
        : apt
    ));
    setSelectedAppointment(null);
  };

  const handleConfirm = (appointment) => {
    setAppointments(appointments?.map(apt => 
      apt?.id === appointment?.id 
        ? { ...apt, status: 'confirmed' }
        : apt
    ));
    setSelectedAppointment({ ...appointment, status: 'confirmed' });
  };

  return (
  <div className="min-h-screen bg-background flex">
    {/* Sidebar */}
    <NavigationSidebar
      isCollapsed={sidebarCollapsed}
      onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
    />
  

    {/* Main content */}
    <main
      className={`
        flex-1 transition-all duration-200 ease-out
        ${sidebarCollapsed ? 'ml-16' : 'ml-10'}
      `}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Appointments
            </h1>
            <p className="text-muted-foreground font-body mt-1">
              Manage your consultation schedule and patient appointments
            </p>
          </div>

        
        </div>

        {/* Stats */}
        <AppointmentStats appointments={filteredAppointments} />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Quick Actions */}
          <div className="xl:col-span-1">
            <QuickActions
              onScheduleNew={handleScheduleNew}
              onBlockTime={handleBlockTime}
              onSetAvailability={handleSetAvailability}
              onFilterChange={setFilters}
              filters={filters}
            />
          </div>

          {/* Calendar */}
          <div className={`${showDetailsPanel ? 'xl:col-span-2' : 'xl:col-span-3'}`}>
            <CalendarView
              appointments={filteredAppointments}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              onAppointmentSelect={handleAppointmentSelect}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          {/* Appointment Details Panel */}
          {showDetailsPanel && (
            <div className="xl:col-span-1">
              <AppointmentDetailsPanel
                selectedAppointment={selectedAppointment}
                onClose={() => setShowDetailsPanel(false)}
                onReschedule={handleReschedule}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
              />
            </div>
          )}
        </div>

        {/* Mobile Details Panel */}
        {showDetailsPanel && (
          <div className="xl:hidden">
            <AppointmentDetailsPanel
              selectedAppointment={selectedAppointment}
              onClose={() => setShowDetailsPanel(false)}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
              onConfirm={handleConfirm}
            />
          </div>
        )}
      </div>
    </main>
  </div>
);

};

export default AppointmentsPage;