import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
    image?: string;
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
  showMaxMessenger: boolean;
  colorTheme: string;
}

interface UserProfile {
  full_name: string;
  phone: string;
  telegram: string;
  max_messenger: string;
  inn: string;
  user_id: number;
}

export default function SpecialistLandingPublic() {
  const { userId } = useParams<{ userId: string }>();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPost, setSelectedPost] = useState<{ title: string; content: string; image: string; date: string } | null>(null);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);

  useEffect(() => {
    const loadLandingData = async () => {
      try {
        if (!userId) {
          setError('ID специалиста не указан');
          setLoading(false);
          return;
        }

        // Load landing data from backend
        const response = await fetch(`https://functions.poehali.dev/ea735e68-a4b3-4d19-bb7a-4f720bd82568?userId=${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          setPageData(data);

          // Load user profile
          const profileResponse = await fetch(`https://functions.poehali.dev/bf27da5d-a5ee-4dc7-b5bb-fcc474598d37?userId=${userId}`);
          if (profileResponse.ok) {
            const profile = await profileResponse.json();
            setUserProfile(profile);
          }
        } else {
          setError('Лендинг не найден');
        }
      } catch (err) {
        console.error('Failed to load landing:', err);
        setError('Ошибка загрузки лендинга');
      } finally {
        setLoading(false);
      }
    };

    loadLandingData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Загрузка лендинга...</p>
        </div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Лендинг не найден</h1>
          <p className="text-gray-600 mb-6">{error || 'Страница специалиста не существует или была удалена'}</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            На главную
          </a>
        </div>
      </div>
    );
  }

  const gradientClass = 
    pageData.colorTheme === 'gradient' ? 'from-blue-500 to-indigo-600' :
    pageData.colorTheme === 'blue' ? 'from-blue-400 to-blue-600' :
    pageData.colorTheme === 'purple' ? 'from-purple-500 to-pink-600' :
    'from-blue-500 to-indigo-600';

  const handleOpenPost = (post: { title: string; content: string; image: string; date: string }) => {
    setSelectedPost(post);
    setIsPostDialogOpen(true);
  };

  const generateKeywords = () => {
    if (!pageData || !userProfile) return '';
    
    const keywords = new Set<string>();
    
    if (userProfile.full_name) {
      keywords.add(userProfile.full_name);
    }
    
    const text = `${pageData.heroTitle} ${pageData.heroSubtitle} ${pageData.aboutText}`;
    const words = text.toLowerCase().split(/\s+/);
    
    const relevantWords = words.filter(word => 
      word.length > 4 && 
      !['этого', 'этому', 'более', 'также', 'через', 'очень', 'такие', 'может'].includes(word)
    );
    
    relevantWords.slice(0, 8).forEach(word => keywords.add(word));
    
    pageData.services.forEach(service => {
      if (service.name) keywords.add(service.name.toLowerCase());
    });
    
    return Array.from(keywords).join(', ');
  };

  const getPageTitle = () => {
    if (!userProfile?.full_name || !pageData?.heroTitle) return 'Специалист';
    return `${userProfile.full_name} - ${pageData.heroTitle}`;
  };

  const getPageDescription = () => {
    if (!pageData) return '';
    return `${pageData.heroTitle}. ${pageData.heroSubtitle}`.slice(0, 160);
  };

  return (
    <div className="min-h-screen m-0 p-0">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content={generateKeywords()} />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`https://docdialog.su/specialist-landing/${userId}`} />
        {pageData?.heroImage && (
          <meta property="og:image" content={pageData.heroImage} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />
        {pageData?.heroImage && (
          <meta name="twitter:image" content={pageData.heroImage} />
        )}
      </Helmet>
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
            
            {/* Горизонтальная прокрутка */}
            <div className="relative">
              <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {[...pageData.blog]
                  .reverse()
                  .map((post: { title: string; content: string; image: string; date: string }, index: number) => (
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
                        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3">{post.content}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs text-gray-500">{post.date}</span>
                          <button 
                            className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                            onClick={() => handleOpenPost(post)}
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
        onOpenPost={handleOpenPost}
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
        onClosePostDialog={() => setIsPostDialogOpen(false)}
      />
    </div>
  );
}