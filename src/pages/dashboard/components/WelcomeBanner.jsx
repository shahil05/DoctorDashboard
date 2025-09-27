import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeBanner = () => {
  const currentDate = new Date()?.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const doctorName = "Dr. Priya Sharma";

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-primary-foreground shadow-elevation-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold mb-2">
            Welcome back, {doctorName}
          </h1>
          <p className="text-primary-foreground/80 font-body">
            {currentDate}
          </p>
          <p className="text-primary-foreground/70 text-sm mt-1 font-caption">
            Ready to help your patients achieve optimal health through Ayurveda
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Icon name="Stethoscope" size={32} className="text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;