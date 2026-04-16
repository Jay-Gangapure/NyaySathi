import { createBrowserRouter, Navigate } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import SituationAssistant from "./pages/SituationAssistant";
import GuidanceResult from "./pages/GuidanceResult";
import AIChatPage from "./pages/AIChatPage";
import SchemesPage from "./pages/SchemesPage";
import DocumentUpload from "./pages/DocumentUpload";
import LegalDirectory from "./pages/LegalDirectory";
import ProfilePage from "./pages/ProfilePage";
import RestrictedAccess from "./pages/RestrictedAccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/restricted",
    element: <RestrictedAccess />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/situation",
    element: (
      <ProtectedRoute>
        <SituationAssistant />
      </ProtectedRoute>
    ),
  },
  {
    path: "/guidance/:id",
    element: (
      <ProtectedRoute>
        <GuidanceResult />
      </ProtectedRoute>
    ),
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <AIChatPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/schemes",
    element: (
      <ProtectedRoute>
        <SchemesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/documents",
    element: (
      <ProtectedRoute>
        <DocumentUpload />
      </ProtectedRoute>
    ),
  },
  {
    path: "/directory",
    element: (
      <ProtectedRoute>
        <LegalDirectory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
