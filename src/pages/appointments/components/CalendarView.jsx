import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const CalendarView = ({ appointments, selectedDate, onDateSelect, onAppointmentSelect, viewMode, onViewModeChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setMonth(currentDate?.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    const dateStr = date?.toDateString();
    return appointments?.filter(apt => new Date(apt.date)?.toDateString() === dateStr);
  };

  const isToday = (date) => {
    if (!date) return false;
    return date?.toDateString() === new Date()?.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);

    return (
      <div className="bg-card rounded-lg shadow-elevation-2 overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-heading font-semibold text-foreground">
              {months?.[currentDate?.getMonth()]} {currentDate?.getFullYear()}
            </h2>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                iconName="ChevronLeft"
                onClick={() => navigateMonth(-1)}
                className="h-8 w-8"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="ChevronRight"
                onClick={() => navigateMonth(1)}
                className="h-8 w-8"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('month')}
            >
              Month
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('week')}
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('day')}
            >
              Day
            </Button>
          </div>
        </div>
        {/* Week Days Header */}
        <div className="grid grid-cols-7 border-b">
          {weekDays?.map(day => (
            <div key={day} className="p-3 text-center border-r last:border-r-0 bg-muted/20">
              <span className="text-sm font-body font-medium text-muted-foreground">
                {day}
              </span>
            </div>
          ))}
        </div>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {days?.map((date, index) => {
            const dayAppointments = getAppointmentsForDate(date);
            
            return (
              <div
                key={index}
                className={`
                  min-h-[120px] border-r border-b last:border-r-0 p-2 cursor-pointer
                  transition-colors duration-150
                  ${date ? 'hover:bg-muted/50' : ''}
                  ${isSelected(date) ? 'bg-primary/10 border-primary' : ''}
                  ${isToday(date) ? 'bg-accent/20' : ''}
                `}
                onClick={() => date && onDateSelect(date)}
              >
                {date && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`
                        text-sm font-body font-medium
                        ${isToday(date) ? 'text-primary font-semibold' : 'text-foreground'}
                        ${isSelected(date) ? 'text-primary' : ''}
                      `}>
                        {date?.getDate()}
                      </span>
                      {dayAppointments?.length > 0 && (
                        <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                          {dayAppointments?.length}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      {dayAppointments?.slice(0, 3)?.map((appointment, idx) => (
                        <div
                          key={idx}
                          className={`
                            text-xs p-1.5 rounded truncate cursor-pointer
                            transition-colors duration-150
                            ${appointment?.status === 'confirmed' ? 'bg-success/20 text-success-foreground' : ''}
                            ${appointment?.status === 'pending' ? 'bg-warning/20 text-warning-foreground' : ''}
                            ${appointment?.status === 'cancelled' ? 'bg-error/20 text-error-foreground' : ''}
                          `}
                          onClick={(e) => {
                            e?.stopPropagation();
                            onAppointmentSelect(appointment);
                          }}
                        >
                          <div className="font-medium">{appointment?.time}</div>
                          <div className="opacity-80">{appointment?.patientName}</div>
                        </div>
                      ))}
                      {dayAppointments?.length > 3 && (
                        <div className="text-xs text-muted-foreground text-center py-1">
                          +{dayAppointments?.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek?.setDate(currentDate?.getDate() - currentDate?.getDay());
    
    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date?.setDate(startOfWeek?.getDate() + i);
      return date;
    });

    return (
      <div className="bg-card rounded-lg shadow-elevation-2 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Week of {startOfWeek?.toLocaleDateString()}
          </h2>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate?.setDate(currentDate?.getDate() - 7);
                setCurrentDate(newDate);
              }}
              className="h-8 w-8"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="ChevronRight"
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate?.setDate(currentDate?.getDate() + 7);
                setCurrentDate(newDate);
              }}
              className="h-8 w-8"
            />
          </div>
        </div>
        <div className="grid grid-cols-7">
          {weekDates?.map((date, index) => {
            const dayAppointments = getAppointmentsForDate(date);
            
            return (
              <div key={index} className="border-r last:border-r-0 min-h-[400px]">
                <div className={`
                  p-3 border-b text-center
                  ${isToday(date) ? 'bg-accent/20' : 'bg-muted/20'}
                `}>
                  <div className="text-sm font-body font-medium text-muted-foreground">
                    {weekDays?.[date?.getDay()]}
                  </div>
                  <div className={`
                    text-lg font-heading font-semibold mt-1
                    ${isToday(date) ? 'text-primary' : 'text-foreground'}
                  `}>
                    {date?.getDate()}
                  </div>
                </div>
                <div className="p-2 space-y-2">
                  {dayAppointments?.map((appointment, idx) => (
                    <div
                      key={idx}
                      className={`
                        p-2 rounded text-xs cursor-pointer
                        transition-colors duration-150 hover:opacity-80
                        ${appointment?.status === 'confirmed' ? 'bg-success/20 text-success-foreground' : ''}
                        ${appointment?.status === 'pending' ? 'bg-warning/20 text-warning-foreground' : ''}
                        ${appointment?.status === 'cancelled' ? 'bg-error/20 text-error-foreground' : ''}
                      `}
                      onClick={() => onAppointmentSelect(appointment)}
                    >
                      <div className="font-medium">{appointment?.time}</div>
                      <div className="opacity-80">{appointment?.patientName}</div>
                      <div className="opacity-60">{appointment?.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayAppointments = getAppointmentsForDate(selectedDate || currentDate);
    const timeSlots = Array.from({ length: 12 }, (_, i) => {
      const hour = i + 8; // Start from 8 AM
      return `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
    });

    return (
      <div className="bg-card rounded-lg shadow-elevation-2 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            {(selectedDate || currentDate)?.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h2>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => {
                const newDate = new Date(selectedDate || currentDate);
                newDate?.setDate(newDate?.getDate() - 1);
                setCurrentDate(newDate);
                onDateSelect(newDate);
              }}
              className="h-8 w-8"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="ChevronRight"
              onClick={() => {
                const newDate = new Date(selectedDate || currentDate);
                newDate?.setDate(newDate?.getDate() + 1);
                setCurrentDate(newDate);
                onDateSelect(newDate);
              }}
              className="h-8 w-8"
            />
          </div>
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          {timeSlots?.map((timeSlot, index) => {
            const slotAppointments = dayAppointments?.filter(apt => 
              apt?.time?.includes(timeSlot?.split(':')?.[0])
            );

            return (
              <div key={index} className="flex border-b">
                <div className="w-20 p-3 border-r bg-muted/20 text-center">
                  <span className="text-sm font-mono text-muted-foreground">
                    {timeSlot}
                  </span>
                </div>
                <div className="flex-1 p-3 min-h-[60px]">
                  {slotAppointments?.map((appointment, idx) => (
                    <div
                      key={idx}
                      className={`
                        p-3 rounded mb-2 cursor-pointer
                        transition-colors duration-150 hover:opacity-80
                        ${appointment?.status === 'confirmed' ? 'bg-success/20 text-success-foreground' : ''}
                        ${appointment?.status === 'pending' ? 'bg-warning/20 text-warning-foreground' : ''}
                        ${appointment?.status === 'cancelled' ? 'bg-error/20 text-error-foreground' : ''}
                      `}
                      onClick={() => onAppointmentSelect(appointment)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{appointment?.patientName}</div>
                          <div className="text-xs opacity-80">{appointment?.type}</div>
                        </div>
                        <div className="text-xs font-mono">{appointment?.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {viewMode === 'month' && renderMonthView()}
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'day' && renderDayView()}
    </div>
  );
};

export default CalendarView;