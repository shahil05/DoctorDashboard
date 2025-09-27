import React, { useState } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProfileImageUpload from './components/ProfileImageUpload';
import PersonalInformationForm from './components/PersonalInformationForm';
import ProfessionalCredentials from './components/ProfessionalCredentials';
import PracticeInformation from './components/PracticeInformation';
import SecuritySettings from './components/SecuritySettings';
import ProfessionalBio from './components/ProfessionalBio';
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

const DoctorProfile = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [profileImage, setProfileImage] = useState('/assets/images/doctor-avatar.jpg');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'credentials', label: 'Credentials', icon: 'Award' },
    { id: 'practice', label: 'Practice Info', icon: 'Building' },
    { id: 'bio', label: 'Bio & Philosophy', icon: 'FileText' },
    { id: 'security', label: 'Security', icon: 'Shield' }
  ];

  const handleSave = (data) => {
    console.log('Saving data:', data);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleImageChange = (newImageUrl) => {
    setProfileImage(newImageUrl);
  };

  const handleExportProfile = () => {
    const profileData = {
      personalInfo: { fullName: 'Dr. Priya Sharma', email: 'priya.sharma@ayurdoc.com', phone: '+91 98765 43210' },
      practice: { clinicName: 'Ayur Wellness Clinic', specializations: 'Panchakarma, Ayurvedic Nutrition' }
    };
    const dataStr = JSON.stringify(profileData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'doctor-profile.json';
    link?.click();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal': return <PersonalInformationForm onSave={handleSave} initialData={{}} />;
      case 'credentials': return <ProfessionalCredentials onSave={handleSave} initialData={{}} />;
      case 'practice': return <PracticeInformation onSave={handleSave} initialData={{}} />;
      case 'bio': return <ProfessionalBio onSave={handleSave} initialData={{}} />;
      case 'security': return <SecuritySettings onSave={handleSave} />;
      default: return <PersonalInformationForm onSave={handleSave} initialData={{}} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <NavigationSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="bg-card border-b shadow-elevation-1 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="font-heading font-bold text-2xl text-foreground">Doctor Profile</h1>
              <p className="text-muted-foreground font-caption text-sm mt-1">
                Manage your professional information and account settings
              </p>
            </div>

            <div className="flex items-center space-x-3">
               <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>

      {/* If signed out → show sign in button */}
      <SignedOut>
        <SignInButton />
      </SignedOut>

              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                {/* <Icon name="UserCircle" size={24} className="text-primary" /> */}

              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mx-6 mt-4">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4 flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <p className="text-success font-body text-sm">Profile updated successfully!</p>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Profile Image Upload */}
            <ProfileImageUpload
              currentImage={profileImage}
              onImageChange={handleImageChange}
            />

            {/* Tab Navigation */}
            <div className="border-b border-border mb-8">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-150
                      ${activeTab === tab?.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                      }
                    `}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {renderTabContent()}
            </div>

            {/* Profile Preview */}
            <div className="bg-card rounded-lg p-6 shadow-elevation-2 border">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Profile Preview</h3>
              <p className="text-muted-foreground font-caption text-sm mb-4">
                This is how your profile appears to patients when they book appointments
              </p>

              <div className="bg-muted/30 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-muted">
                    <img
                      src={profileImage}
                      alt="Doctor profile preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = '/assets/images/no_image.png'; }}
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-heading font-semibold text-foreground mb-1">Dr. Priya Sharma</h4>
                    <p className="text-muted-foreground font-body text-sm mb-2">
                      Ayurvedic Physician • 12 years experience
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>₹1,500 consultation</span>
                      <span>•</span>
                      <span>45 min sessions</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>Mumbai</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} className="text-warning fill-current" />
                    <span className="text-sm font-medium text-foreground">4.8</span>
                    <span className="text-xs text-muted-foreground">(124 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorProfile;
