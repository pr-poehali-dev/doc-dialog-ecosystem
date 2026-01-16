import { useState, useEffect } from 'react';
import { useUnreadMessages } from '@/hooks/useUnreadMessages';
import VacancyForm from '@/components/dashboard/VacancyForm';
import VerificationBanner from '@/components/dashboard/salon/VerificationBanner';
import DashboardCards from '@/components/dashboard/salon/DashboardCards';
import SalonProfileDialog from '@/components/dashboard/salon/SalonProfileDialog';

const SALON_API = 'https://functions.poehali.dev/01aa5a2f-6476-4fbc-ba10-6808960c8a21';

export default function SalonDashboard() {
  const { unreadCount } = useUnreadMessages();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [salonExists, setSalonExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showCatalogInfo, setShowCatalogInfo] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo_url: '',
    website: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    photos: [] as string[]
  });
  const [showVacancyForm, setShowVacancyForm] = useState(false);

  useEffect(() => {
    loadSalonStatus();
  }, []);

  const loadSalonStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch(`${SALON_API}?action=salon_profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.salon) {
          setSalonExists(true);
          setIsVerified(data.salon.is_verified);
          setFormData({
            name: data.salon.name || '',
            description: data.salon.description || '',
            logo_url: data.salon.logo_url || '',
            website: data.salon.website || '',
            phone: data.salon.phone || '',
            email: data.salon.email || '',
            city: data.salon.city || '',
            address: data.salon.address || '',
            photos: data.salon.photos || []
          });
        }
      } else if (res.status === 404) {
        setSalonExists(false);
      }
    } catch (error) {
      console.error('Ошибка загрузки статуса салона:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <VerificationBanner
        isVerified={isVerified}
        salonExists={salonExists}
        loading={loading}
        onEditProfile={() => setShowForm(true)}
      />

      <DashboardCards
        unreadCount={unreadCount}
        showCatalogInfo={showCatalogInfo}
        onShowCatalogInfo={setShowCatalogInfo}
        onEditProfile={() => setShowForm(true)}
        onAddVacancy={() => setShowVacancyForm(true)}
      />

      <SalonProfileDialog
        open={showForm}
        onOpenChange={setShowForm}
        salonExists={salonExists}
        formData={formData}
        setFormData={setFormData}
        onSaved={loadSalonStatus}
      />

      <VacancyForm
        isOpen={showVacancyForm}
        onClose={() => setShowVacancyForm(false)}
        salonName={formData.name}
      />
    </>
  );
}
