import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import FilterToolbar from './components/FilterToolbar';
import PatientTable from './components/PatientTable';
import PatientCard from './components/PatientCard';
import PaginationControls from './components/PaginationControls';
import Icon from '../../components/AppIcon';

const PatientsListPage = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDosha, setSelectedDosha] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Sorting states
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Mock patient data
  const mockPatients = [
    {
      id: "PAT001",
      name: "Rajesh Kumar",
      age: 45,
      phone: "+91 98765 43210",
      email: "rajesh.kumar@email.com",
      lastVisit: "2025-01-15",
      primaryDosha: "Vata",
      treatmentStatus: "Active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      hasUrgentFollowUp: false,
      hasPendingDietChart: true
    },
    {
      id: "PAT002",
      name: "Priya Sharma",
      age: 32,
      phone: "+91 87654 32109",
      email: "priya.sharma@email.com",
      lastVisit: "2025-01-12",
      primaryDosha: "Pitta",
      treatmentStatus: "Follow-up",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      hasUrgentFollowUp: true,
      hasPendingDietChart: false
    },
    {
      id: "PAT003",
      name: "Amit Patel",
      age: 28,
      phone: "+91 76543 21098",
      email: "amit.patel@email.com",
      lastVisit: "2025-01-10",
      primaryDosha: "Kapha",
      treatmentStatus: "Active",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      hasUrgentFollowUp: false,
      hasPendingDietChart: false
    },
    {
      id: "PAT004",
      name: "Sunita Devi",
      age: 52,
      phone: "+91 65432 10987",
      email: "sunita.devi@email.com",
      lastVisit: "2025-01-08",
      primaryDosha: "Vata",
      treatmentStatus: "Completed",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      hasUrgentFollowUp: false,
      hasPendingDietChart: false
    },
    {
      id: "PAT005",
      name: "Vikram Singh",
      age: 38,
      phone: "+91 54321 09876",
      email: "vikram.singh@email.com",
      lastVisit: "2025-01-05",
      primaryDosha: "Pitta",
      treatmentStatus: "Active",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      hasUrgentFollowUp: false,
      hasPendingDietChart: true
    },
    {
      id: "PAT006",
      name: "Meera Joshi",
      age: 29,
      phone: "+91 43210 98765",
      email: "meera.joshi@email.com",
      lastVisit: "2025-01-03",
      primaryDosha: "Kapha",
      treatmentStatus: "Follow-up",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      hasUrgentFollowUp: true,
      hasPendingDietChart: false
    },
    {
      id: "PAT007",
      name: "Ravi Gupta",
      age: 41,
      phone: "+91 32109 87654",
      email: "ravi.gupta@email.com",
      lastVisit: "2024-12-28",
      primaryDosha: "Vata",
      treatmentStatus: "Active",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      hasUrgentFollowUp: false,
      hasPendingDietChart: false
    },
    {
      id: "PAT008",
      name: "Kavita Reddy",
      age: 35,
      phone: "+91 21098 76543",
      email: "kavita.reddy@email.com",
      lastVisit: "2024-12-25",
      primaryDosha: "Pitta",
      treatmentStatus: "Completed",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      hasUrgentFollowUp: false,
      hasPendingDietChart: false
    },
    {
      id: "PAT009",
      name: "Arjun Nair",
      age: 26,
      phone: "+91 10987 65432",
      email: "arjun.nair@email.com",
      lastVisit: "2024-12-22",
      primaryDosha: "Kapha",
      treatmentStatus: "Active",
      avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      hasUrgentFollowUp: false,
      hasPendingDietChart: true
    },
    {
      id: "PAT010",
      name: "Deepika Iyer",
      age: 33,
      phone: "+91 09876 54321",
      email: "deepika.iyer@email.com",
      lastVisit: "2024-12-20",
      primaryDosha: "Vata",
      treatmentStatus: "Follow-up",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      hasUrgentFollowUp: true,
      hasPendingDietChart: false
    }
  ];

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter and sort patients
  const filteredAndSortedPatients = useMemo(() => {
    let filtered = mockPatients?.filter(patient => {
      const matchesSearch = !searchTerm || 
        patient?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        patient?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        patient?.phone?.includes(searchTerm);

      const matchesDosha = !selectedDosha || 
        patient?.primaryDosha?.toLowerCase() === selectedDosha?.toLowerCase();

      const matchesStatus = !selectedStatus || 
        patient?.treatmentStatus?.toLowerCase() === selectedStatus?.toLowerCase();

      const matchesDateRange = (!dateRange?.from || new Date(patient.lastVisit) >= new Date(dateRange.from)) &&
        (!dateRange?.to || new Date(patient.lastVisit) <= new Date(dateRange.to));

      return matchesSearch && matchesDosha && matchesStatus && matchesDateRange;
    });

    // Sort patients
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'lastVisit') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [mockPatients, searchTerm, selectedDosha, selectedStatus, dateRange, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPatients?.length / itemsPerPage);
  const paginatedPatients = filteredAndSortedPatients?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDosha('');
    setSelectedStatus('');
    setDateRange({ from: '', to: '' });
    setCurrentPage(1);
  };

  const handleViewDetails = (patientId) => {
    navigate(`/patient-details?id=${patientId}`);
  };

  const handleAddPatient = () => {
    // In a real app, this would open a modal or navigate to add patient form
    alert('Add New Patient functionality would be implemented here');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
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
      <div className="p-6 space-y-6 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-2xl text-foreground">Patients List</h1>
            <p className="text-muted-foreground font-caption mt-1">
              Manage and browse your patient database
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="bg-card rounded-lg border px-3 py-2 shadow-elevation-1">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {filteredAndSortedPatients?.length} Patients
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <FilterToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedDosha={selectedDosha}
          onDoshaChange={setSelectedDosha}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onClearFilters={handleClearFilters}
          onAddPatient={handleAddPatient}
        />

        {/* Patients Display */}
        <div className="flex-1 overflow-y-auto">
          {isMobileView ? (
            <div className="grid grid-cols-1 gap-4">
              {paginatedPatients?.map((patient) => (
                <PatientCard
                  key={patient?.id}
                  patient={patient}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <PatientTable
              patients={paginatedPatients}
              onViewDetails={handleViewDetails}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          )}
        </div>

        {/* Pagination */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredAndSortedPatients?.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </main>
  </div>
);

};

export default PatientsListPage;