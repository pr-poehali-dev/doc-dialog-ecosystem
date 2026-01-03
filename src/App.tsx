
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MasseursDirectory from "./pages/MasseursDirectory";
import MasseurProfile from "./pages/MasseurProfile";
import ProfileEdit from "./pages/ProfileEdit";
import AdminPanel from "./pages/AdminPanel";
import SchoolDashboard from "./pages/SchoolDashboard";
import CoursesCatalog from "./pages/CoursesCatalog";
import CoursePage from "./pages/CoursePage";
import MastermindPage from "./pages/MastermindPage";
import CourseLandingEditor from "./pages/CourseLandingEditor";
import CourseLandingPublic from "./pages/CourseLandingPublic";
import CourseLandingBuilder from "./pages/CourseLandingBuilder";
import CoursePublicLanding from "./pages/CoursePublicLanding";
import SchoolCatalog from "./pages/SchoolCatalog";
import SchoolLanding from "./pages/SchoolLanding";
import SchoolLandingBuilder from "./pages/SchoolLandingBuilder";
import SalonCabinet from "./pages/SalonCabinet";
import SalonsCatalog from "./pages/SalonsCatalog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/masseurs" element={<MasseursDirectory />} />
          <Route path="/masseurs/:id" element={<MasseurProfile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/school/dashboard" element={<SchoolDashboard />} />
          <Route path="/courses" element={<CoursesCatalog />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/mastermind/:id" element={<MastermindPage />} />
          <Route path="/school/landing/builder" element={<SchoolLandingBuilder />} />
          <Route path="/school/landing/:id" element={<SchoolLandingBuilder />} />
          <Route path="/landing/:slug" element={<CourseLandingPublic />} />
          <Route path="/course/landing/builder" element={<CourseLandingBuilder />} />
          <Route path="/course/landing/:slug" element={<CoursePublicLanding />} />
          <Route path="/schools" element={<SchoolCatalog />} />
          <Route path="/school/:slug" element={<SchoolLanding />} />
          <Route path="/salon/cabinet" element={<SalonCabinet />} />
          <Route path="/salons" element={<SalonsCatalog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;