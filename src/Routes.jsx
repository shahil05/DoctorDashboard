import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, SignUp, useUser } from "@clerk/clerk-react";

import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Dashboard from "./pages/dashboard";
import PatientsListPage from "./pages/patients-list";
import DoctorProfile from "./pages/doctor-profile";
import PatientDetails from "./pages/patient-details";
import AppointmentsPage from "./pages/appointments";
import DietChartGenerator from "./pages/diet-chart-generator";

const Routes = () => {
  // Clerk hook for accessing user
  const { isSignedIn, user } = useUser();

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />

        {/* If signed out → show SignUp page */}
        <SignedOut>
          <SignUp routing="path" path="/sign-up" />
          <RedirectToSignIn />
        </SignedOut>

        {/* If signed in → show all app routes */}
        <SignedIn>
          <RouterRoutes>
            <Route path="/" element={<AppointmentsPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients-list" element={<PatientsListPage />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            <Route path="/patient-details" element={<PatientDetails />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/diet-chart-generator" element={<DietChartGenerator />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </SignedIn>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
