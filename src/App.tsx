
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
import ForgotPassword from "./pages/ForgotPassword";
import RegisterMasseur from "./pages/RegisterMasseur";
import RegisterSchool from "./pages/RegisterSchool";
import RegisterSalon from "./pages/RegisterSalon";
import RegisterClient from "./pages/RegisterClient";
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
import MastermindLandingBuilder from "./pages/MastermindLandingBuilder";
import MastermindPublicLanding from "./pages/MastermindPublicLanding";
import OfflineTrainingLandingBuilder from "./pages/OfflineTrainingLandingBuilder";
import OfflineTrainingPublicLanding from "./pages/OfflineTrainingPublicLanding";
import OfflineTrainingReviews from "./pages/OfflineTrainingReviews";
import SchoolCatalog from "./pages/SchoolCatalog";
import SchoolLanding from "./pages/SchoolLanding";
import SchoolLandingBuilder from "./pages/SchoolLandingBuilder";
import SchoolAnalytics from "./pages/SchoolAnalytics";
import SchoolBalance from "./pages/SchoolBalance";
import SchoolSubscription from "./pages/dashboard/SchoolSubscription";
import SchoolPromoRequests from "./pages/dashboard/SchoolPromoRequests";
import SchoolsLanding from "./pages/SchoolsLanding";
import MasseursLanding from "./pages/MasseursLanding";
import SalonsLanding from "./pages/SalonsLanding";
import SalonCabinet from "./pages/SalonCabinet";
import SalonsCatalog from "./pages/SalonsCatalog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import PublicProfile from "./pages/dashboard/PublicProfile";
import ClientsCRM from "./pages/dashboard/ClientsCRM";
import PageBuilder from "./pages/dashboard/PageBuilder";
import PagePreview from "./pages/dashboard/PagePreview";
import TrustBadges from "./pages/dashboard/TrustBadges";
import ClientEducation from "./pages/dashboard/ClientEducation";
import Community from "./pages/dashboard/Community";
import Messages from "./pages/dashboard/Messages";
import AdminMessages from "./pages/dashboard/AdminMessages";
import PromoCodes from "./pages/dashboard/PromoCodes";
import Verification from "./pages/dashboard/Verification";
import MyReviews from "./pages/dashboard/MyReviews";
import Bookings from "./pages/dashboard/Bookings";
import SalonBookings from "./pages/dashboard/SalonBookings";
import Favorites from "./pages/dashboard/Favorites";
import MasseurBalance from "./pages/dashboard/MasseurBalance";
import MasseurReviews from "./pages/MasseurReviews";
import MasseurOrders from "./pages/MasseurOrders";
import ClientOrders from "./pages/ClientOrders";
import KnowledgeBase from "./pages/dashboard/KnowledgeBase";
import Tools from "./pages/dashboard/Tools";
import MasseurPromoOffers from "./pages/dashboard/MasseurPromoOffers";
import MasseurDiscountRequests from "./pages/dashboard/MasseurDiscountRequests";
import SalonPresentation from "./pages/SalonPresentation";
import MasseurWelcome from "./pages/MasseurWelcome";
import MasseurProfessionalLanding from "./pages/MasseurProfessionalLanding";
import AIDialogs from "./pages/dashboard/AIDialogs";
import AISubscription from "./pages/dashboard/AISubscription";
import SchoolMarketingAI from "./pages/dashboard/SchoolMarketingAI";
import ImportSpecialists from "./pages/admin/ImportSpecialists";
import ImportedSpecialists from "./pages/admin/ImportedSpecialists";
import ImportSalons from "./pages/admin/ImportSalons";
import MedicalReportLanding from "./pages/MedicalReportLanding";

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register/masseur" element={<RegisterMasseur />} />
          <Route path="/register/school" element={<RegisterSchool />} />
          <Route path="/register/salon" element={<RegisterSalon />} />
          <Route path="/register/client" element={<RegisterClient />} />
          <Route path="/masseur-welcome" element={<MasseurWelcome />} />
          <Route path="/for-specialists" element={<MasseurProfessionalLanding />} />
          <Route path="/medical-report" element={<MedicalReportLanding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/masseurs" element={<MasseursDirectory />} />
          <Route path="/masseurs/:id" element={<MasseurProfile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/school/dashboard" element={<SchoolDashboard />} />
          <Route path="/school/analytics" element={<SchoolAnalytics />} />
          <Route path="/school/balance" element={<SchoolBalance />} />
          <Route path="/school/subscription" element={<SchoolSubscription />} />
          <Route path="/school/promo-requests" element={<SchoolPromoRequests />} />
          <Route path="/courses" element={<CoursesCatalog />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/mastermind/:id" element={<MastermindPage />} />
          <Route path="/school/landing/builder" element={<SchoolLandingBuilder />} />
          <Route path="/school/landing/:id" element={<SchoolLandingBuilder />} />
          <Route path="/landing/:slug" element={<CourseLandingPublic />} />
          <Route path="/course/landing/builder" element={<CourseLandingBuilder />} />
          <Route path="/course/landing/:slug" element={<CoursePublicLanding />} />
          <Route path="/mastermind/landing/builder" element={<MastermindLandingBuilder />} />
          <Route path="/mastermind/landing/:slug" element={<MastermindPublicLanding />} />
          <Route path="/offline-training/landing/builder" element={<OfflineTrainingLandingBuilder />} />
          <Route path="/offline-training/landing/:slug" element={<OfflineTrainingPublicLanding />} />
          <Route path="/offline-training/:slug" element={<OfflineTrainingPublicLanding />} />
          <Route path="/offline-training/:slug/reviews" element={<OfflineTrainingReviews />} />
          <Route path="/schools-info" element={<SchoolsLanding />} />
          <Route path="/masseurs-info" element={<MasseursLanding />} />
          <Route path="/salons-info" element={<SalonsLanding />} />
          <Route path="/salons-presentation" element={<SalonPresentation />} />
          <Route path="/schools" element={<SchoolCatalog />} />
          <Route path="/school/:slug" element={<SchoolLanding />} />
          <Route path="/salon/cabinet" element={<SalonCabinet />} />
          <Route path="/salons" element={<SalonsCatalog />} />
          <Route path="/dashboard/public-profile" element={<PublicProfile />} />
          <Route path="/dashboard/clients" element={<ClientsCRM />} />
          <Route path="/dashboard/page-builder" element={<PageBuilder />} />
          <Route path="/dashboard/page-preview" element={<PagePreview />} />
          <Route path="/dashboard/badges" element={<TrustBadges />} />
          <Route path="/dashboard/education" element={<ClientEducation />} />
          <Route path="/dashboard/community" element={<Community />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          <Route path="/dashboard/admin-messages" element={<AdminMessages />} />
          <Route path="/dashboard/promo-codes" element={<PromoCodes />} />
          <Route path="/dashboard/verification" element={<Verification />} />
          <Route path="/dashboard/my-reviews" element={<MyReviews />} />
          <Route path="/dashboard/reviews" element={<MasseurReviews />} />
          <Route path="/dashboard/orders" element={<MasseurOrders />} />
          <Route path="/dashboard/my-orders" element={<ClientOrders />} />
          <Route path="/dashboard/bookings" element={<Bookings />} />
          <Route path="/dashboard/salon-bookings" element={<SalonBookings />} />
          <Route path="/dashboard/favorites" element={<Favorites />} />
          <Route path="/dashboard/balance" element={<MasseurBalance />} />
          <Route path="/dashboard/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/dashboard/tools" element={<Tools />} />
          <Route path="/dashboard/promo-offers" element={<MasseurPromoOffers />} />
          <Route path="/dashboard/discount-requests" element={<MasseurDiscountRequests />} />
          <Route path="/dashboard/ai-dialogs" element={<AIDialogs />} />
          <Route path="/dashboard/ai-subscription" element={<AISubscription />} />
          <Route path="/school/marketing-ai" element={<SchoolMarketingAI />} />
          <Route path="/admin/import-specialists" element={<ImportSpecialists />} />
          <Route path="/admin/imported-specialists" element={<ImportedSpecialists />} />
          <Route path="/admin/import-salons" element={<ImportSalons />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;