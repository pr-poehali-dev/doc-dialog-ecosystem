import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SEOManager from "@/components/SEOManager";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index";

const About = lazy(() => import("./pages/About"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const RegisterMasseur = lazy(() => import("./pages/RegisterMasseur"));
const RegisterSchool = lazy(() => import("./pages/RegisterSchool"));
const RegisterSalon = lazy(() => import("./pages/RegisterSalon"));
const RegisterClient = lazy(() => import("./pages/RegisterClient"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MasseursDirectory = lazy(() => import("./pages/MasseursDirectory"));
const MasseurProfile = lazy(() => import("./pages/MasseurProfile"));
const ProfileEdit = lazy(() => import("./pages/ProfileEdit"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const SchoolDashboard = lazy(() => import("./pages/SchoolDashboard"));
const CoursesCatalog = lazy(() => import("./pages/CoursesCatalog"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
const MastermindPage = lazy(() => import("./pages/MastermindPage"));
const MastermindLandingBuilder = lazy(() => import("./pages/MastermindLandingBuilder"));
const MastermindPublicLanding = lazy(() => import("./pages/MastermindPublicLanding"));
const OfflineTrainingLandingBuilder = lazy(() => import("./pages/OfflineTrainingLandingBuilder"));
const OfflineTrainingPublicLanding = lazy(() => import("./pages/OfflineTrainingPublicLanding"));
const OfflineTrainingReviews = lazy(() => import("./pages/OfflineTrainingReviews"));
const SchoolCatalog = lazy(() => import("./pages/SchoolCatalog"));
const SchoolLanding = lazy(() => import("./pages/SchoolLanding"));
const SchoolLandingBuilder = lazy(() => import("./pages/SchoolLandingBuilder"));
const SchoolAnalytics = lazy(() => import("./pages/SchoolAnalytics"));
const SchoolBalance = lazy(() => import("./pages/SchoolBalance"));
const SchoolBalanceTopup = lazy(() => import("./pages/dashboard/SchoolBalanceTopup"));
const SchoolSubscription = lazy(() => import("./pages/dashboard/SchoolSubscription"));
const SchoolPromoRequests = lazy(() => import("./pages/dashboard/SchoolPromoRequests"));
const SchoolsLanding = lazy(() => import("./pages/SchoolsLanding"));
const MasseursLanding = lazy(() => import("./pages/MasseursLanding"));
const SalonsLanding = lazy(() => import("./pages/SalonsLanding"));
const SalonCabinet = lazy(() => import("./pages/SalonCabinet"));
const SalonsCatalog = lazy(() => import("./pages/SalonsCatalog"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PublicProfile = lazy(() => import("./pages/dashboard/PublicProfile"));
const ClientsCRM = lazy(() => import("./pages/dashboard/ClientsCRM"));
const PageBuilder = lazy(() => import("./pages/dashboard/PageBuilder"));
const PagePreview = lazy(() => import("./pages/dashboard/PagePreview"));
const TrustBadges = lazy(() => import("./pages/dashboard/TrustBadges"));
const ClientEducation = lazy(() => import("./pages/dashboard/ClientEducation"));
const Community = lazy(() => import("./pages/dashboard/Community"));
const Messages = lazy(() => import("./pages/dashboard/Messages"));
const AdminMessages = lazy(() => import("./pages/dashboard/AdminMessages"));
const PromoCodes = lazy(() => import("./pages/dashboard/PromoCodes"));
const Verification = lazy(() => import("./pages/dashboard/Verification"));
const MyReviews = lazy(() => import("./pages/dashboard/MyReviews"));
const Bookings = lazy(() => import("./pages/dashboard/Bookings"));
const SalonBookings = lazy(() => import("./pages/dashboard/SalonBookings"));
const Favorites = lazy(() => import("./pages/dashboard/Favorites"));
const MasseurBalance = lazy(() => import("./pages/dashboard/MasseurBalance"));
const MasseurBalanceTopup = lazy(() => import("./pages/dashboard/MasseurBalanceTopup"));
const MasseurReviews = lazy(() => import("./pages/MasseurReviews"));
const MasseurOrders = lazy(() => import("./pages/MasseurOrders"));
const ClientOrders = lazy(() => import("./pages/ClientOrders"));
const KnowledgeBase = lazy(() => import("./pages/dashboard/KnowledgeBase"));
const Tools = lazy(() => import("./pages/dashboard/Tools"));
const AnamnesisHistory = lazy(() => import("./pages/dashboard/AnamnesisHistory"));
const MasseurPromoOffers = lazy(() => import("./pages/dashboard/MasseurPromoOffers"));
const MasseurDiscountRequests = lazy(() => import("./pages/dashboard/MasseurDiscountRequests"));
const SalonPresentation = lazy(() => import("./pages/SalonPresentation"));
const MasseurWelcome = lazy(() => import("./pages/MasseurWelcome"));
const MasseurProfessionalLanding = lazy(() => import("./pages/MasseurProfessionalLanding"));
const AIDialogs = lazy(() => import("./pages/dashboard/AIDialogs"));
const AISubscription = lazy(() => import("./pages/dashboard/AISubscription"));
const SchoolMarketingAI = lazy(() => import("./pages/dashboard/SchoolMarketingAI"));
const ImportSpecialists = lazy(() => import("./pages/admin/ImportSpecialists"));
const ImportedSpecialists = lazy(() => import("./pages/admin/ImportedSpecialists"));
const ImportSalons = lazy(() => import("./pages/admin/ImportSalons"));
const ImportVacancies = lazy(() => import("./pages/admin/ImportVacancies"));
const PaymentHistory = lazy(() => import("./pages/admin/PaymentHistory"));
const MedicalReportLanding = lazy(() => import("./pages/MedicalReportLanding"));
const VacanciesCatalog = lazy(() => import("./pages/VacanciesCatalog"));
const VacanciesImport = lazy(() => import("./pages/VacanciesImport"));
const Premium = lazy(() => import("./pages/Premium"));
const AccountSettings = lazy(() => import("./pages/dashboard/AccountSettings"));
const VisceraCourse = lazy(() => import("./pages/VisceraCourse"));
const ArsenalCourse = lazy(() => import("./pages/ArsenalCourse"));
const BrandCourse = lazy(() => import("./pages/BrandCourse"));
const MastermindMoscow = lazy(() => import("./pages/MastermindMoscow"));
const BasicsCourse = lazy(() => import("./pages/BasicsCourse"));
const AdvancedCourse = lazy(() => import("./pages/AdvancedCourse"));
const CorrectionCourse = lazy(() => import("./pages/CorrectionCourse"));
const VNSCourse = lazy(() => import("./pages/VNSCourse"));
const PregnancyFitness = lazy(() => import("./pages/PregnancyFitness"));
const InvestorPresentation = lazy(() => import("./pages/InvestorPresentation"));
const PremiumPresentation = lazy(() => import("./pages/PremiumPresentation"));
const Forum = lazy(() => import("./pages/Forum").catch((error) => {
  console.error('Failed to load Forum, retrying...', error);
  window.location.reload();
  return import("./pages/Forum");
}));
const ForumTopic = lazy(() => import("./pages/ForumTopic").catch((error) => {
  console.error('Failed to load ForumTopic, retrying...', error);
  window.location.reload();
  return import("./pages/ForumTopic");
}));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const EducationPlatform = lazy(() => import("./pages/EducationPlatform"));
const PartnerProgram = lazy(() => import("./pages/PartnerProgram"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentFailed = lazy(() => import("./pages/PaymentFailed"));
const PaymentProcessing = lazy(() => import("./pages/PaymentProcessing"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CookieConsent />
      <BrowserRouter>
        <SEOManager />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600 text-lg">Загрузка...</p>
            </div>
          </div>
        }>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
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
          <Route path="/dashboard/school-balance-topup" element={<SchoolBalanceTopup />} />
          <Route path="/school/subscription" element={<SchoolSubscription />} />
          <Route path="/school/promo-requests" element={<SchoolPromoRequests />} />
          <Route path="/courses" element={<CoursesCatalog />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/mastermind/:id" element={<MastermindPage />} />
          <Route path="/school/landing/builder" element={<SchoolLandingBuilder />} />
          <Route path="/school/landing/:id" element={<SchoolLandingBuilder />} />
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
          <Route path="/vacancies" element={<VacanciesCatalog />} />
          <Route path="/vacancies-import" element={<VacanciesImport />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/viscera-course" element={<VisceraCourse />} />
          <Route path="/arsenal-course" element={<ArsenalCourse />} />
          <Route path="/brand-course" element={<BrandCourse />} />
          <Route path="/mastermind-moscow" element={<MastermindMoscow />} />
          <Route path="/basics-course" element={<BasicsCourse />} />
          <Route path="/advanced-course" element={<AdvancedCourse />} />
          <Route path="/correction-course" element={<CorrectionCourse />} />
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
          <Route path="/dashboard/masseur-balance-topup" element={<MasseurBalanceTopup />} />
          <Route path="/dashboard/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/dashboard/tools" element={<Tools />} />
          <Route path="/dashboard/anamnesis-history" element={<AnamnesisHistory />} />
          <Route path="/dashboard/promo-offers" element={<MasseurPromoOffers />} />
          <Route path="/dashboard/discount-requests" element={<MasseurDiscountRequests />} />
          <Route path="/dashboard/ai-dialogs" element={<AIDialogs />} />
          <Route path="/dashboard/ai-subscription" element={<AISubscription />} />
          <Route path="/dashboard/account-settings" element={<AccountSettings />} />
          <Route path="/school/marketing-ai" element={<SchoolMarketingAI />} />
          <Route path="/admin/import-specialists" element={<ImportSpecialists />} />
          <Route path="/admin/imported-specialists" element={<ImportedSpecialists />} />
          <Route path="/admin/import-salons" element={<ImportSalons />} />
          <Route path="/admin/import-vacancies" element={<ImportVacancies />} />
          <Route path="/admin/payment-history" element={<PaymentHistory />} />
          <Route path="/vns-course" element={<VNSCourse />} />
          <Route path="/pregnancy-fitness" element={<PregnancyFitness />} />
          <Route path="/investor-presentation" element={<InvestorPresentation />} />
          <Route path="/premium-presentation" element={<PremiumPresentation />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/category/:categoryId" element={<Forum />} />
          <Route path="/forum/topic/:topicId" element={<ForumTopic />} />
          <Route path="/education-platform" element={<EducationPlatform />} />
          <Route path="/partner-program" element={<PartnerProgram />} />
          <Route path="/payment/processing" element={<PaymentProcessing />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failed" element={<PaymentFailed />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;