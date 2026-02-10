import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface BlogPost {
  title: string;
  content: string;
  image: string;
  date: string;
}

interface Offer {
  title: string;
  description: string;
  discount: string;
  image: string;
}

interface LandingPremiumSectionsProps {
  blog: BlogPost[];
  offers: Offer[];
  template: string;
  gradientClass: string;
  onPostClick: (post: BlogPost) => void;
}

export default function LandingPremiumSections({
  blog,
  offers,
  template,
  gradientClass,
  onPostClick,
}: LandingPremiumSectionsProps) {
  const [orderForm, setOrderForm] = useState<{ [key: number]: { name: string; email: string; phone: string; agreed: boolean } }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollButtons();
    container.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [blog.length]);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Blog Section - Premium/Luxury only */}
      {blog && blog.length > 0 && (template === 'premium' || template === 'luxury') && (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Блог и новости</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Полезные материалы и советы от специалиста
            </p>
            <div className="relative max-w-7xl mx-auto">
              {canScrollLeft && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all"
                  aria-label="Прокрутить влево"
                >
                  <Icon name="ChevronLeft" size={24} className="text-gray-700" />
                </button>
              )}
              {canScrollRight && (
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all"
                  aria-label="Прокрутить вправо"
                >
                  <Icon name="ChevronRight" size={24} className="text-gray-700" />
                </button>
              )}
              <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto scroll-smooth px-4 pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {blog.map((post: BlogPost, index: number) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex-shrink-0 w-[350px]"
                >
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{post.date}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-blue-600 hover:text-blue-700"
                        onClick={() => onPostClick(post)}
                      >
                        Читать далее
                        <Icon name="ArrowRight" size={14} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </section>
      )}


    </>
  );
}