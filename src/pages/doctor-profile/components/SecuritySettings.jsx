import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SecuritySettings = ({ onSave }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  
  const [errors, setErrors] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const sessionTimeoutOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '120', label: '2 hours' },
    { value: '240', label: '4 hours' }
  ];

  const activeSessions = [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'Mumbai, India',
      lastActive: '2025-01-17 13:30:00',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'Mumbai, India',
      lastActive: '2025-01-17 10:15:00',
      current: false
    },
    {
      id: 3,
      device: 'Chrome on Android',
      location: 'Mumbai, India',
      lastActive: '2025-01-16 18:45:00',
      current: false
    }
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData?.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData?.newPassword?.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    }
    
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handlePasswordSubmit = () => {
    if (validatePasswordForm()) {
      // Mock password change
      if (passwordData?.currentPassword === 'ayurdoc123') {
        onSave({ type: 'password', success: true });
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setIsChangingPassword(false);
      } else {
        setErrors({ currentPassword: 'Current password is incorrect' });
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev?.[field]
    }));
  };

  const handleTerminateSession = (sessionId) => {
    onSave({ type: 'session_terminated', sessionId });
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    onSave({ type: 'two_factor', enabled: !twoFactorEnabled });
  };

  const formatLastActive = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Active now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return date?.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="bg-card rounded-lg p-6 shadow-elevation-2 border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Password & Security
          </h3>
          
          {!isChangingPassword && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsChangingPassword(true)}
              iconName="Lock"
              iconPosition="left"
            >
              Change Password
            </Button>
          )}
        </div>

        {isChangingPassword && (
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Input
                label="Current Password"
                type={showPasswords?.current ? 'text' : 'password'}
                value={passwordData?.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
                error={errors?.currentPassword}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPasswords?.current ? 'EyeOff' : 'Eye'} size={16} />
              </button>
            </div>

            <div className="relative">
              <Input
                label="New Password"
                type={showPasswords?.new ? 'text' : 'password'}
                value={passwordData?.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
                error={errors?.newPassword}
                description="Must be at least 8 characters long"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPasswords?.new ? 'EyeOff' : 'Eye'} size={16} />
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirm New Password"
                type={showPasswords?.confirm ? 'text' : 'password'}
                value={passwordData?.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
                error={errors?.confirmPassword}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPasswords?.confirm ? 'EyeOff' : 'Eye'} size={16} />
              </button>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={handlePasswordSubmit}
                iconName="Save"
                iconPosition="left"
              >
                Update Password
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                  setErrors({});
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Two-Factor Authentication */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-body font-medium text-foreground">
                Two-Factor Authentication
              </h4>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              {twoFactorEnabled && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                  <Icon name="Shield" size={12} className="mr-1" />
                  Enabled
                </span>
              )}
              <Button
                variant={twoFactorEnabled ? 'outline' : 'default'}
                size="sm"
                onClick={handleTwoFactorToggle}
              >
                {twoFactorEnabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Session Management */}
      <div className="bg-card rounded-lg p-6 shadow-elevation-2 border">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
          Active Sessions
        </h3>

        <div className="space-y-4">
          {activeSessions?.map((session) => (
            <div key={session?.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon 
                    name={session?.device?.includes('iPhone') ? 'Smartphone' : 'Monitor'} 
                    size={20} 
                    className="text-muted-foreground" 
                  />
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-body font-medium text-foreground">
                      {session?.device}
                    </h4>
                    {session?.current && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session?.location} • {formatLastActive(session?.lastActive)}
                  </p>
                </div>
              </div>
              
              {!session?.current && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTerminateSession(session?.id)}
                  iconName="LogOut"
                >
                  Terminate
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Session Timeout
              </label>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {sessionTimeoutOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <Checkbox
                label="Email notifications for new logins"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e?.target?.checked)}
              />
              <Checkbox
                label="SMS notifications for security alerts"
                checked={smsNotifications}
                onChange={(e) => setSmsNotifications(e?.target?.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;