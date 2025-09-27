import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PatientInfoPanel from './components/PatientInfoPanel';
import DoshaTemplateBar from './components/DoshaTemplateBar';
import WeeklyDietTable from './components/WeeklyDietTable';
import ActionControlsBar from './components/ActionControlsBar';
import IngredientDatabase from './components/IngredientDatabase';

const DietChartGenerator = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('patient'); // For mobile: 'patient' or 'chart'
  const [selectedDosha, setSelectedDosha] = useState('Vata-Pitta');
  const [showIngredientDB, setShowIngredientDB] = useState(false);
  const [dietData, setDietData] = useState({});
  const [patient, setPatient] = useState({
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    constitution: 'Vata-Pitta',
    height: "5'8\"",
    weight: '70 kg',
    medicalHistory: 'No major health issues',
    currentMedications: 'None',
    allergies: 'None known',
    preferences: 'Vegetarian',
  });

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handlePatientSelect = () => {
    navigate('/patients-list');
  };

  const handleTemplateSelect = (template) => {
    if (template === 'reset') {
      setDietData({});
    } else if (template === 'auto') {
      const autoFillData = {
        Monday: {
          Breakfast: 'Warm oats with almonds\nGinger tea',
          Lunch: 'Quinoa with vegetables\nButtermilk',
          Dinner: 'Khichdi with ghee\nTurmeric milk',
        },
        Tuesday: {
          Breakfast: 'Upma with vegetables\nHerbal tea',
          Lunch: 'Brown rice with dal\nCucumber raita',
          Dinner: 'Vegetable soup\nWarm milk',
        },
      };
      setDietData(autoFillData);
    } else {
      setSelectedDosha(template);
    }
  };

  const handleSeasonalSelect = (season) => {
    console.log('Selected season:', season);
  };

  const handleMealUpdate = (day, meal, content) => {
    setDietData((prev) => ({
      ...prev,
      [day]: {
        ...prev?.[day],
        [meal]: content,
      },
    }));
  };

  const handleSaveDraft = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Diet chart saved as draft');
        resolve();
      }, 1000);
    });
  };

  const handlePreview = () => {
    console.log('Preview diet chart');
  };

  const handleSendToPatient = () => {
    console.log('Send diet chart to patient');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = (format) => {
    console.log('Export as:', format);
  };

  const handleIngredientSelect = (ingredient) => {
    console.log('Selected ingredient:', ingredient);
    setShowIngredientDB(false);
  };

  const handleSaveChart = () => {
    console.log('Save complete chart');
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <NavigationSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col transition-all duration-200">
        {/* Header */}
        <div className="bg-card border-b shadow-elevation-1 p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">
                Diet Chart Generator
              </h1>
              <p className="text-muted-foreground font-body mt-1">
                Create personalized Ayurvedic meal plans for your patients
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Database"
                iconPosition="left"
                onClick={() => setShowIngredientDB(true)}
              >
                Ingredient Database
              </Button>
              <Button
                variant="secondary"
                iconName="ArrowLeft"
                iconPosition="left"
                onClick={() => navigate('/patient-details')}
              >
                Back to Patient
              </Button>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mt-4">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('patient')}
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md transition-colors duration-150 ${
                  activeTab === 'patient'
                    ? 'bg-card text-foreground shadow-elevation-1'
                    : 'text-muted-foreground'
                }`}
              >
                <Icon name="User" size={16} />
                <span className="text-sm font-body font-medium">Patient Info</span>
              </button>
              <button
                onClick={() => setActiveTab('chart')}
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md transition-colors duration-150 ${
                  activeTab === 'chart'
                    ? 'bg-card text-foreground shadow-elevation-1'
                    : 'text-muted-foreground'
                }`}
              >
                <Icon name="Calendar" size={16} />
                <span className="text-sm font-body font-medium">Diet Chart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 lg:h-[calc(100vh-200px)]">
            {/* Left Panel - Patient Info */}
            <div className="col-span-4">
              <PatientInfoPanel
                patient={patient}
                onPatientSelect={handlePatientSelect}
              />
            </div>

            {/* Right Panel - Diet Chart */}
            <div className="col-span-8 space-y-6 overflow-y-auto">
              <DoshaTemplateBar
                selectedDosha={selectedDosha}
                onTemplateSelect={handleTemplateSelect}
                onSeasonalSelect={handleSeasonalSelect}
              />

              <WeeklyDietTable
                dietData={dietData}
                onMealUpdate={handleMealUpdate}
                onSaveChart={handleSaveChart}
              />

              <ActionControlsBar
                onSaveDraft={handleSaveDraft}
                onPreview={handlePreview}
                onSendToPatient={handleSendToPatient}
                onPrint={handlePrint}
                onExport={handleExport}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {activeTab === 'patient' ? (
              <div className="h-[calc(100vh-250px)]">
                <PatientInfoPanel
                  patient={patient}
                  onPatientSelect={handlePatientSelect}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <DoshaTemplateBar
                  selectedDosha={selectedDosha}
                  onTemplateSelect={handleTemplateSelect}
                  onSeasonalSelect={handleSeasonalSelect}
                />

                <WeeklyDietTable
                  dietData={dietData}
                  onMealUpdate={handleMealUpdate}
                  onSaveChart={handleSaveChart}
                />

                <ActionControlsBar
                  onSaveDraft={handleSaveDraft}
                  onPreview={handlePreview}
                  onSendToPatient={handleSendToPatient}
                  onPrint={handlePrint}
                  onExport={handleExport}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Ingredient Database Modal */}
      <IngredientDatabase
        isVisible={showIngredientDB}
        onClose={() => setShowIngredientDB(false)}
        onIngredientSelect={handleIngredientSelect}
      />
    </div>
  );
};

export default DietChartGenerator;
