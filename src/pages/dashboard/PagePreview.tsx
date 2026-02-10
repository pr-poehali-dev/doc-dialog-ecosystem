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
  const [selectedPost, setSelectedPost] = useState<{ title: string; content: string; image: string; date: string } | null>(null);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{ firstName?: string; lastName?: string; phone?: string; telegram?: string; max_messenger?: string } | null>(null);

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

  const handlePostClick = (post: { title: string; content: string; image: string; date: string }) => {
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
        gradientClass={gradientClass}
        template={pageData.template}
      />

      {/* Блог перед футером - горизонтальная прокрутка */}
      {pageData.blog && pageData.blog.length > 0 && (pageData.template === 'premium' || pageData.template === 'luxury') && (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Блог и новости</h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Полезные материалы и советы от специалиста
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Icon name="ArrowLeft" size={18} className="opacity-50" />
                <span className="hidden sm:inline">Листайте</span>
                <Icon name="ArrowRight" size={18} className="opacity-50" />
              </div>
            </div>
            
            <div className="relative">
              <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {[...pageData.blog]
                  .sort((a, b) => {
                    const dateA = new Date(a.date.split('.').reverse().join('-'));
                    const dateB = new Date(b.date.split('.').reverse().join('-'));
                    return dateB.getTime() - dateA.getTime();
                  })
                  .map((post, index) => (
                  <div 
                    key={index} 
                    className="flex-none w-[280px] sm:w-[320px] md:w-[360px] snap-start"
                  >
                    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] border border-gray-100 h-full">
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                      )}
                      <div className="p-4 sm:p-6">
                        {index === 0 && (
                          <span className="inline-block px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold rounded-full mb-2">
                            Новое
                          </span>
                        )}
                        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3">{post.content}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs text-gray-500">{post.date}</span>
                          <button 
                            className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                            onClick={() => handlePostClick(post)}
                          >
                            Читать
                            <Icon name="ArrowRight" size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
              {pageData.blog.length} {pageData.blog.length === 1 ? 'статья' : pageData.blog.length < 5 ? 'статьи' : 'статей'}
            </p>
          </div>
        </section>
      )}

      <LandingPremiumSections
        blog={[]}
        offers={pageData.offers}
        gradientClass={gradientClass}
        template={pageData.template}
        onOpenPost={handlePostClick}
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