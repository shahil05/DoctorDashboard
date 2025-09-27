import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'new_patient',
      title: 'New Patient Registration',
      description: 'Rahul Kumar registered as a new patient',
      time: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      icon: 'UserPlus',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'consultation',
      title: 'Consultation Completed',
      description: 'Follow-up session with Meera Patel completed',
      time: '4 hours ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      icon: 'CheckCircle',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'diet_chart',
      title: 'Diet Chart Created',
      description: 'Personalized diet plan created for Amit Sharma',
      time: '6 hours ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      icon: 'Utensils',
      color: 'text-secondary'
    },
    {
      id: 4,
      type: 'appointment',
      title: 'Appointment Scheduled',
      description: 'New appointment booked for tomorrow 10:00 AM',
      time: '8 hours ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      icon: 'Calendar',
      color: 'text-warning'
    },
    {
      id: 5,
      type: 'prescription',
      title: 'Prescription Updated',
      description: 'Medicine dosage adjusted for Priya Singh',
      time: '1 day ago',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      icon: 'Pill',
      color: 'text-accent'
    }
  ];

  return (
    <div className="bg-card rounded-lg border shadow-elevation-1">
      <div className="p-4 border-b">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Recent Activity
        </h2>
        <p className="text-sm text-muted-foreground font-caption">
          Latest updates from your practice
        </p>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className="relative">
                <Image
                  src={activity?.avatar}
                  alt="Patient"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-card rounded-full flex items-center justify-center border">
                  <Icon 
                    name={activity?.icon} 
                    size={10} 
                    className={activity?.color} 
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body font-medium text-foreground">
                  {activity?.title}
                </p>
                <p className="text-sm text-muted-foreground font-caption">
                  {activity?.description}
                </p>
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  {activity?.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-body transition-colors duration-150">
            View all activities
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;