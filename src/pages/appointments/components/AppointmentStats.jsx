import React from 'react';
import Icon from '../../../components/AppIcon';

const AppointmentStats = ({ appointments }) => {
  const today = new Date();
  const todayStr = today?.toDateString();
  const thisWeekStart = new Date(today.setDate(today.getDate() - today.getDay()));
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const todayAppointments = appointments?.filter(apt => 
    new Date(apt.date)?.toDateString() === todayStr
  );

  const thisWeekAppointments = appointments?.filter(apt => 
    new Date(apt.date) >= thisWeekStart
  );

  const thisMonthAppointments = appointments?.filter(apt => 
    new Date(apt.date) >= thisMonthStart
  );

  const confirmedToday = todayAppointments?.filter(apt => apt?.status === 'confirmed')?.length;
  const pendingToday = todayAppointments?.filter(apt => apt?.status === 'pending')?.length;
  const cancelledToday = todayAppointments?.filter(apt => apt?.status === 'cancelled')?.length;

  const stats = [
    {
      title: 'Today\'s Appointments',
      value: todayAppointments?.length,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+2 from yesterday',
      changeType: 'positive'
    },
    {
      title: 'Confirmed Today',
      value: confirmedToday,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: `${confirmedToday}/${todayAppointments?.length} confirmed`,
      changeType: 'neutral'
    },
    {
      title: 'Pending Confirmations',
      value: pendingToday,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: 'Needs attention',
      changeType: pendingToday > 0 ? 'negative' : 'positive'
    },
    {
      title: 'This Week',
      value: thisWeekAppointments?.length,
      icon: 'CalendarDays',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: '+15% from last week',
      changeType: 'positive'
    },
    {
      title: 'This Month',
      value: thisMonthAppointments?.length,
      icon: 'BarChart3',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: `${Math.round((thisMonthAppointments?.length / 120) * 100)}% of target`,
      changeType: 'neutral'
    },
    {
      title: 'Cancellations',
      value: cancelledToday,
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      change: cancelledToday === 0 ? 'No cancellations' : `${cancelledToday} cancelled`,
      changeType: cancelledToday === 0 ? 'positive' : 'negative'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg shadow-elevation-2 p-4 border">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
                  <Icon 
                    name={stat?.icon} 
                    size={20} 
                    className={stat?.color}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat?.title}
                  </p>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {stat?.value}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className={`text-xs font-body ${getChangeColor(stat?.changeType)}`}>
                  {stat?.change}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentStats;