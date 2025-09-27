import React, { useState } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import WelcomeBanner from './components/WelcomeBanner';
import StatsCard from './components/StatsCard';
import AppointmentCard from './components/AppointmentCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const statsData = [
    { title: "Today's Appointments", value: "8", icon: "Calendar", trend: "up", trendValue: "+2", color: "primary" },
    { title: "Total Patients", value: "247", icon: "Users", trend: "up", trendValue: "+12", color: "secondary" },
    { title: "Pending Diet Charts", value: "5", icon: "Utensils", color: "warning" },
    { title: "Monthly Consultations", value: "156", icon: "Stethoscope", trend: "up", trendValue: "+8%", color: "success" }
  ];

  const upcomingAppointments = [
    { id: 1, patientName: "Rahul Kumar", patientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", time: "10:00 AM", duration: "30 min", consultationType: "Initial Consultation", dosha: "Vata", age: 32, gender: "Male", visitCount: 1, notes: "First visit for digestive issues and stress management" },
    { id: 2, patientName: "Meera Patel", patientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face", time: "11:30 AM", duration: "45 min", consultationType: "Follow-up", dosha: "Pitta", age: 28, gender: "Female", visitCount: 4, notes: "Diet chart review and progress assessment" },
    { id: 3, patientName: "Amit Sharma", patientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", time: "2:00 PM", duration: "30 min", consultationType: "Diet Review", dosha: "Kapha", age: 45, gender: "Male", visitCount: 7, notes: "Weight management and seasonal diet adjustments" },
    { id: 4, patientName: "Priya Singh", patientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", time: "3:30 PM", duration: "30 min", consultationType: "General Checkup", dosha: "Vata", age: 35, gender: "Female", visitCount: 3, notes: "Routine health assessment and preventive care" }
  ];

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <NavigationSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={handleSidebarToggle} 
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-6 space-y-8 flex-1">
          {/* Welcome Banner */}
          <WelcomeBanner />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData?.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat?.title}
                value={stat?.value}
                icon={stat?.icon}
                trend={stat?.trend}
                trendValue={stat?.trendValue}
                color={stat?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
            {/* Upcoming Appointments */}
            <div className="lg:col-span-2 flex flex-col overflow-y-auto">
              <div className="bg-card rounded-lg border shadow-elevation-1 overflow-hidden flex flex-col flex-1">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-heading font-semibold text-foreground">
                    Upcoming Appointments
                  </h2>
                  <p className="text-sm text-muted-foreground font-caption">
                    Today's scheduled consultations
                  </p>
                </div>
                <div className="p-6 space-y-4 flex-1 overflow-y-auto">
                  {upcomingAppointments?.map((appointment) => (
                    <AppointmentCard
                      key={appointment?.id}
                      appointment={appointment}
                    />
                  ))}

                  {upcomingAppointments?.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground font-body">
                        No appointments scheduled for today
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Content (Right Panel) */}
            <div className="space-y-6">
              <QuickActions />
              <ActivityFeed />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
