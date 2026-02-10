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
  showMaxMessenger?: boolean;
  colorTheme: string;
}

export default function PagePreview() {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // Убираем padding-top у body
    document.body.classList.add('no-padding');
    
    return () => {
      document.body.classList.remove('no-padding');
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Загружаем данные лендинга
        const landingResponse = await fetch('https://functions.poehali.dev/ea735e68-a4b3-4d19-bb7a-4f720bd82568', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (landingResponse.ok) {
          const data = await landingResponse.json();
          setPageData(data);
        } else {
          const localData = localStorage.getItem('pageBuilderData');
          if (localData) {
            setPageData(JSON.parse(localData));
          }
        }
        
        // Загружаем профиль пользователя
        const profileResponse = await fetch('https://functions.poehali.dev/bf27da5d-a5ee-4dc7-b5bb-fcc474598d37', {
          headers: { 'X-Authorization': `Bearer ${token}` }
        });
        
        if (profileResponse.ok) {
          const profile = await profileResponse.json();
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Failed to load data', error);
        const localData = localStorage.getItem('pageBuilderData');
        if (localData) {
          try {
            setPageData(JSON.parse(localData));
          } catch (e) {
            console.error('Failed to parse local data', e);
          }
        }
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (pageData && userProfile) {
      const fullName = `${userProfile.lastName || ''} ${userProfile.firstName || ''}`.trim();
      const serviceNames = pageData.services.map(s => s.name).join(', ');
      
      const title = fullName 
        ? `Страница массажиста ${fullName}` 
        : 'Страница массажиста';
      
      const description = serviceNames 
        ? `Профессиональный массаж: ${serviceNames}. ${pageData.heroSubtitle || ''}`.slice(0, 160)
        : pageData.heroSubtitle || 'Профессиональные массажные услуги';
      
      const keywords = [
        'массаж',
        fullName,
        ...pageData.services.map(s => s.name.toLowerCase()),
        'массажист',
        'оздоровительный массаж',
        'релаксация'
      ].filter(Boolean).join(', ');

      document.title = title;
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
      
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }
  }, [pageData, userProfile]);

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
    <div className="bg-white">
      <LandingHero
        heroTitle={pageData.heroTitle}
        heroSubtitle={pageData.heroSubtitle}
        heroImage={pageData.heroImage}
        profilePhoto={pageData.profilePhoto}
        gradientClass={gradientClass}
        userProfile={userProfile}
      />

      <LandingContentSections
        aboutTitle={pageData.aboutTitle}
        aboutText={pageData.aboutText}
        services={pageData.services}
        processTitle={pageData.processTitle}
        processSteps={pageData.processSteps}
        gallery={pageData.gallery}
        certificates={pageData.certificates}
        offers={pageData.offers}
        template={pageData.template}
        gradientClass={gradientClass}
        blog={pageData.blog}
        onPostClick={handlePostClick}
      />

      <LandingFooterSections
        reviews={pageData.reviews}
        showPhone={pageData.showPhone}
        showTelegram={pageData.showTelegram}
        showMaxMessenger={pageData.showMaxMessenger}
        userProfile={userProfile}
        gradientClass={gradientClass}
        selectedPost={selectedPost}
        isPostDialogOpen={isPostDialogOpen}
        onClosePostDialog={handleClosePostDialog}
      />
    </div>
  );
}