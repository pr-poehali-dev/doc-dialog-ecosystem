import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import CourseModerationTab from "@/components/CourseModerationTab";
import MastermindModerationTab from "@/components/MastermindModerationTab";
import OfflineTrainingModerationTab from "@/components/OfflineTrainingModerationTab";
import ReviewsModerationTab from "@/components/ReviewsModerationTab";
import AdminDashboardTab from "@/components/admin/AdminDashboardTab";
import AdminUsersTab from "@/components/admin/AdminUsersTab";
import AdminModerationTab from "@/components/admin/AdminModerationTab";
import AdminSchoolsTab from "@/components/admin/AdminSchoolsTab";
import KnowledgeBaseManagement from "@/components/admin/KnowledgeBaseManagement";
import VerificationModerationTab from "@/components/admin/VerificationModerationTab";
import SalonModerationTab from "@/components/admin/SalonModerationTab";
import PaymentSettingsTab from "@/components/admin/PaymentSettingsTab";
import AdminTabNavigation from "@/components/admin/AdminTabNavigation";
import Tools from "@/pages/admin/Tools";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useAdminData } from "@/hooks/useAdminData";
import { useAdminActions } from "@/hooks/useAdminActions";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'moderation' | 'verifications' | 'salons' | 'courses' | 'masterminds' | 'offline-training' | 'reviews' | 'schools' | 'knowledge' | 'payments' | 'tools'>('dashboard');
  
  useAdminAuth();
  
  const {
    loading,
    stats,
    pendingVerifications,
    users,
    moderationItems,
    loadDashboardStats,
    loadVerificationCount,
    loadUsers,
    loadModerationItems
  } = useAdminData(activeTab);

  const {
    updateUserRole,
    deleteUser,
    moderateItem
  } = useAdminActions(loadUsers, loadModerationItems);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Панель администратора</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Управление пользователями и модерация контента</p>
            </div>
            <Button onClick={() => navigate('/dashboard')} variant="outline" className="w-full sm:w-auto">
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              В личный кабинет
            </Button>
          </div>

          <AdminTabNavigation 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            stats={stats}
            pendingVerifications={pendingVerifications}
          />

          {activeTab === 'dashboard' && <AdminDashboardTab stats={stats} />}

          {activeTab === 'users' && (
            <AdminUsersTab 
              users={users} 
              loading={loading} 
              onUpdateUserRole={updateUserRole}
              onDeleteUser={deleteUser}
            />
          )}

          {activeTab === 'moderation' && (
            <AdminModerationTab 
              moderationItems={moderationItems} 
              loading={loading} 
              onModerate={moderateItem} 
            />
          )}

          {activeTab === 'courses' && <CourseModerationTab onModerationComplete={loadDashboardStats} />}

          {activeTab === 'masterminds' && <MastermindModerationTab onModerationComplete={loadDashboardStats} />}

          {activeTab === 'offline-training' && <OfflineTrainingModerationTab onModerationComplete={loadDashboardStats} />}

          {activeTab === 'reviews' && <ReviewsModerationTab />}

          {activeTab === 'schools' && <AdminSchoolsTab />}

          {activeTab === 'knowledge' && <KnowledgeBaseManagement />}
          
          {activeTab === 'verifications' && <VerificationModerationTab onModerationComplete={loadVerificationCount} />}

          {activeTab === 'salons' && <SalonModerationTab />}

          {activeTab === 'payments' && <PaymentSettingsTab />}

          {activeTab === 'tools' && <Tools />}
        </div>
      </div>
    </div>
  );
}
