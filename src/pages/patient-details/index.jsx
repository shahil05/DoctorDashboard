import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import PatientProfileHeader from './components/PatientProfileHeader';
import MedicalHistorySection from './components/MedicalHistorySection';
import DietChartsSection from './components/DietChartsSection';
import HealthStatusPanel from './components/HealthStatusPanel';
import DocumentsSection from './components/DocumentsSection';
import Icon from '../../components/AppIcon';

const PatientDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock patient data
  const patientData = {
    id: searchParams?.get('id') || '1',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'Male',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'Active',
    dosha: 'Vata',
    rasa: 'Sweet',
    agni: 'Moderate',
    address: '123 Gandhi Nagar, Mumbai, Maharashtra 400001',
    emergencyContact: '+91 98765 43211',
    bloodGroup: 'B+',
    allergies: ['Peanuts', 'Shellfish'],
  };

  const medicalHistory = [
    {
      id: 1,
      condition: 'Chronic Digestive Issues',
      severity: 'Medium',
      date: '2024-08-15',
      doctor: 'Priya Sharma',
      duration: '45 min',
      summary:
        'Patient experiencing recurring digestive problems with bloating and irregular bowel movements. Recommended Ayurvedic treatment approach.',
      symptoms:
        'Bloating after meals, irregular bowel movements, occasional stomach pain, fatigue after eating',
      treatment:
        'Prescribed Triphala churna, dietary modifications, and specific yoga asanas for digestion',
      medications: ['Triphala Churna', 'Hingvastak Churna', 'Ajwain Powder'],
      notes:
        'Patient responded well to initial treatment. Follow-up scheduled in 2 weeks.',
    },
    {
      id: 2,
      condition: 'Stress-Related Insomnia',
      severity: 'High',
      date: '2024-07-20',
      doctor: 'Priya Sharma',
      duration: '60 min',
      summary:
        'Sleep disturbances due to work stress and irregular lifestyle. Implemented comprehensive Ayurvedic sleep therapy.',
      symptoms:
        'Difficulty falling asleep, frequent waking, morning fatigue, anxiety',
      treatment:
        'Brahmi and Shankhpushpi supplements, meditation practice, sleep hygiene counseling',
      medications: ['Brahmi Ghrita', 'Saraswatarishta', 'Jatamansi Powder'],
      notes:
        'Significant improvement in sleep quality after 3 weeks of treatment.',
    },
    {
      id: 3,
      condition: 'Joint Pain and Stiffness',
      severity: 'Low',
      date: '2024-06-10',
      doctor: 'Priya Sharma',
      duration: '30 min',
      summary:
        'Mild joint stiffness in knees and shoulders, likely due to Vata imbalance. Prescribed oil massage and herbal supplements.',
      symptoms: 'Morning stiffness, mild pain in knees, shoulder tension',
      treatment:
        'Daily oil massage with Mahanarayan oil, gentle yoga, dietary adjustments',
      medications: ['Mahanarayan Oil', 'Yograj Guggulu', 'Dashmool Kwath'],
      notes: 'Patient showing good compliance with treatment. Pain reduced by 70%.',
    },
  ];

  const dietCharts = [
    {
      id: 1,
      title: 'Digestive Health Diet Plan',
      createdDate: '2024-08-20',
      status: 'Active',
      duration: '4 weeks',
      focus: 'Digestive Health',
      effectiveness: 4,
      sampleMeals: [
        { time: 'Breakfast', description: 'Warm oatmeal with ginger and honey' },
        { time: 'Lunch', description: 'Khichdi with ghee and steamed vegetables' },
        { time: 'Dinner', description: 'Light soup with herbal tea' },
      ],
    },
    {
      id: 2,
      title: 'Stress Relief Nutrition Plan',
      createdDate: '2024-07-25',
      status: 'Completed',
      duration: '6 weeks',
      focus: 'Stress Management',
      effectiveness: 5,
      sampleMeals: [
        { time: 'Breakfast', description: 'Brahmi tea with whole grain toast' },
        { time: 'Lunch', description: 'Quinoa salad with nuts and seeds' },
        { time: 'Dinner', description: 'Warm milk with turmeric and dates' },
      ],
    },
    {
      id: 3,
      title: 'Joint Health Support Diet',
      createdDate: '2024-06-15',
      status: 'Completed',
      duration: '8 weeks',
      focus: 'Joint Health',
      effectiveness: 3,
      sampleMeals: [
        {
          time: 'Breakfast',
          description: 'Anti-inflammatory smoothie with turmeric',
        },
        { time: 'Lunch', description: 'Lentil curry with leafy greens' },
        { time: 'Dinner', description: 'Bone broth with ginger and garlic' },
      ],
    },
  ];

  const healthStatus = {
    overall: 'Good',
    energyLevel: 75,
    sleepQuality: 'Good',
    digestion: 'Fair',
    stressLevel: 40,
  };

  const vitalStats = [
    {
      name: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      normal: '120/80',
      icon: 'Heart',
    },
    {
      name: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      normal: '60-100',
      icon: 'Activity',
    },
    { name: 'Weight', value: '75', unit: 'kg', normal: '70-80', icon: 'Scale' },
    { name: 'BMI', value: '24.2', unit: '', normal: '18.5-24.9', icon: 'User' },
    {
      name: 'Temperature',
      value: '98.6',
      unit: '°F',
      normal: '97-99',
      icon: 'Thermometer',
    },
  ];

  const activeProtocols = [
    {
      name: 'Digestive Cleanse Protocol',
      progress: 65,
      startDate: '2024-08-15',
      targetDate: '2024-09-15',
      notes: 'Patient showing good response to Triphala treatment',
    },
    {
      name: 'Stress Management Program',
      progress: 80,
      startDate: '2024-07-20',
      targetDate: '2024-09-20',
      notes: 'Meditation practice established, sleep quality improved',
    },
  ];

  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Blood Test Results',
      fileName: 'blood_test_aug_2024.pdf',
      type: 'pdf',
      size: 245760,
      uploadDate: '2024-08-25',
      category: 'Lab Results',
    },
    {
      id: 2,
      title: 'X-Ray Report - Knee',
      fileName: 'knee_xray_july_2024.jpg',
      type: 'image',
      size: 1048576,
      uploadDate: '2024-07-30',
      category: 'Imaging',
    },
    {
      id: 3,
      title: 'Previous Consultation Notes',
      fileName: 'consultation_notes_june_2024.docx',
      type: 'docx',
      size: 51200,
      uploadDate: '2024-06-15',
      category: 'Consultation',
    },
  ]);

  const handleEditProfile = () => {
    navigate('/patient-details', {
      state: { mode: 'edit', patientId: patientData?.id },
    });
  };

  const handleCreateDietChart = () => {
    navigate('/diet-chart-generator', {
      state: { patientId: patientData?.id },
    });
  };

  const handleScheduleFollowup = () => {
    navigate('/appointments', {
      state: { patientId: patientData?.id, action: 'schedule' },
    });
  };

  const handleAddConsultation = () => {
    console.log('Add consultation for patient:', patientData?.id);
  };

  const handleUploadDocument = (newDocument) => {
    setDocuments((prev) => [newDocument, ...prev]);
  };

  const handleDeleteDocument = (documentId) => {
    setDocuments((prev) => prev?.filter((doc) => doc?.id !== documentId));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'history', label: 'Medical History', icon: 'FileText' },
    { id: 'diet', label: 'Diet Charts', icon: 'Utensils' },
    { id: 'documents', label: 'Documents', icon: 'FolderOpen' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <NavigationSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <main className="flex-1 transition-all duration-200">
        <div className="p-4 lg:p-6 space-y-6">
          {/* Patient Profile Header */}
          <PatientProfileHeader
            patient={patientData}
            onEditProfile={handleEditProfile}
            onCreateDietChart={handleCreateDietChart}
            onScheduleFollowup={handleScheduleFollowup}
          />

          {/* Tab Navigation */}
          <div className="bg-card rounded-lg shadow-elevation-1 border">
            <div className="flex overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-150 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  {tab?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              {activeTab === 'overview' && (
                <>
                  <MedicalHistorySection
                    medicalHistory={medicalHistory?.slice(0, 2)}
                    onAddConsultation={handleAddConsultation}
                  />
                  <DietChartsSection
                    dietCharts={dietCharts?.slice(0, 2)}
                    onCreateDietChart={handleCreateDietChart}
                  />
                </>
              )}

              {activeTab === 'history' && (
                <MedicalHistorySection
                  medicalHistory={medicalHistory}
                  onAddConsultation={handleAddConsultation}
                />
              )}

              {activeTab === 'diet' && (
                <DietChartsSection
                  dietCharts={dietCharts}
                  onCreateDietChart={handleCreateDietChart}
                />
              )}

              {activeTab === 'documents' && (
                <DocumentsSection
                  documents={documents}
                  onUploadDocument={handleUploadDocument}
                  onDeleteDocument={handleDeleteDocument}
                />
              )}
            </div>

            {/* Right Panel - Health Status */}
            <div className="xl:col-span-1">
              <HealthStatusPanel
                healthStatus={healthStatus}
                vitalStats={vitalStats}
                activeProtocols={activeProtocols}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDetails;
