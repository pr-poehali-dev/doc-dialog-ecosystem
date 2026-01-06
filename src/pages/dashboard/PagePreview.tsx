import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import LandingHero from '@/components/landing/LandingHero';
import LandingContentSections from '@/components/landing/LandingContentSections';
import LandingPremiumSections from '@/components/landing/LandingPremiumSections';
import LandingFooterSections from '@/components/landing/LandingFooterSections';

interface PageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  profilePhoto: string;
  aboutTitle: string;
  aboutText: string;
  services: Array<{
    name: string;
    duration: string;
    price: string;
    description: string;
  }>;
  processTitle: string;
  processSteps: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  gallery: string[];
  certificates: string[];
  reviews: Array<{
    name: string;
    rating: number;
    text: string;
    date: string;
  }>;
  blog: Array<{
    title: string;
    content: string;
    image: string;
    date: string;
  }>;
  videos: string[];
  offers: Array<{
    title: string;
    description: string;
    discount: string;
    image: string;
  }>;
  template: string;
  showPhone: boolean;
  showTelegram: boolean;
  colorTheme: string;
}

export default function PagePreview() {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('pageBuilderData');
    if (data) {
      try {
        setPageData(JSON.parse(data));
      } catch (e) {
        console.error('Failed to parse page data', e);
      }
    }

    // Загружаем профиль пользователя
    const loadUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Loading user profile with token:', token ? 'exists' : 'missing');
        const response = await fetch('https://functions.poehali.dev/0fb6eb3b-ce10-437e-a4a7-fec98d24a9a2', {
          headers: { 'X-Authorization': `Bearer ${token}` }
        });
        console.log('Profile response status:', response.status);
        if (response.ok) {
          const profile = await response.json();
          console.log('Profile loaded:', profile);
          setUserProfile(profile);
        } else {
          console.error('Failed to load profile, status:', response.status);
        }
      } catch (error) {
        console.error('Failed to load profile', error);
      }
    };

    loadUserProfile();
  }, []);

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Загрузка предпросмотра...</p>
        </div>
      </div>
    );
  }

  const themeColors = {
    gradient: 'from-blue-600 to-indigo-600',
    blue: 'from-blue-600 to-blue-700',
    purple: 'from-purple-600 to-pink-600',
  };

  const gradientClass = themeColors[pageData.colorTheme as keyof typeof themeColors] || themeColors.gradient;

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setIsPostDialogOpen(true);
  };

  const handleClosePostDialog = () => {
    setIsPostDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <LandingHero
        heroTitle={pageData.heroTitle}
        heroSubtitle={pageData.heroSubtitle}
        heroImage={pageData.heroImage}
        profilePhoto={pageData.profilePhoto}
        gradientClass={gradientClass}
      />

      <LandingContentSections
        aboutTitle={pageData.aboutTitle}
        aboutText={pageData.aboutText}
        services={pageData.services}
        processTitle={pageData.processTitle}
        processSteps={pageData.processSteps}
        gallery={pageData.gallery}
        certificates={pageData.certificates}
        gradientClass={gradientClass}
      />

      <LandingPremiumSections
        blog={pageData.blog}
        offers={pageData.offers}
        template={pageData.template}
        gradientClass={gradientClass}
        onPostClick={handlePostClick}
      />

      <LandingFooterSections
        reviews={pageData.reviews}
        showPhone={pageData.showPhone}
        showTelegram={pageData.showTelegram}
        userProfile={userProfile}
        gradientClass={gradientClass}
        selectedPost={selectedPost}
        isPostDialogOpen={isPostDialogOpen}
        onClosePostDialog={handleClosePostDialog}
      />
    </div>
  );
}