import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import DoctorProfileCard from './DoctorProfileCard';
import NavigationMenuItem from './NavigationMenuItem';

const NavigationSidebar = ({ isCollapsed = false, onToggle, children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'Practice overview and quick access hub'
    },
    {
      label: 'Patients',
      icon: 'Users',
      children: [
        {
          label: 'Patients List',
          path: '/patients-list',
          icon: 'List',
          description: 'Browse and manage patient records'
        },
        {
          label: 'Patient Details',
          path: '/patient-details',
          icon: 'User',
          description: 'Detailed patient information and history'
        },
        {
          label: 'Diet Chart Generator',
          path: '/diet-chart-generator',
          icon: 'Utensils',
          description: 'Create personalized Ayurvedic diet plans'
        }
      ]
    },
    {
      label: 'Appointments',
      path: '/appointments',
      icon: 'Calendar',
      description: 'Schedule management and consultation planning'
    },
    {
      label: 'Profile',
      path: '/doctor-profile',
      icon: 'UserCircle',
      description: 'Doctor information and system preferences'
    }
  ];

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActiveRoute = (path) => location?.pathname === path;

  const hasActiveChild = (children) =>
    children?.some((child) => isActiveRoute(child?.path));

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-card border-r shadow-elevation-2 z-50
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
          ${isCollapsed ? 'w-16' : 'w-64'}
          flex-shrink-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                  <path
                    d="M12 16L10.91 22.26L4 23L10.91 23.74L12 30L13.09 23.74L20 23L13.09 22.26L12 16Z"
                    opacity="0.6"
                  />
                </svg>
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="font-heading text-green-600 font-extrabold text-xl text-foreground">
                    Herbal Bites
                  </h1>
                  <p className="text-xs text-muted-foreground font-caption">
                    Doctor Dashboard
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Doctor Profile Card */}
          {!isCollapsed && (
            <div className="p-4 border-b">
              <DoctorProfileCard />
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems?.map((item, index) => (
              <NavigationMenuItem
                key={index}
                item={item}
                isActive={
                  item?.path
                    ? isActiveRoute(item?.path)
                    : hasActiveChild(item?.children)
                }
                isCollapsed={isCollapsed}
                onNavigate={handleNavigation}
                isActiveRoute={isActiveRoute}
              />
            ))}
          </nav>

          {/* Collapse Toggle (Desktop Only) */}
          {onToggle && (
            <div className="hidden lg:block p-4 border-t">
              <button
                onClick={onToggle}
                className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors duration-150"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <Icon
                  name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
                  size={20}
                  className="text-muted-foreground"
                />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 p-6 transition-all duration-300 ease-in-out">
        {children}
      </main>

      {/* Mobile Hamburger Button */}
      <button
        onClick={handleMobileToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card shadow-elevation-2 border"
        aria-label="Toggle navigation menu"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={24} />
      </button>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
};

export default NavigationSidebar;
