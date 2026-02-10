import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

interface UserProfile {
  full_name?: string;
  phone?: string;
  telegram?: string;
  max_messenger?: string;
  inn?: string;
}

interface BlogPost {
  title: string;
  content: string;
  image: string;
  date: string;
}

interface LandingFooterSectionsProps {
  reviews: Review[];
  showPhone: boolean;
  showTelegram: boolean;
  showMaxMessenger?: boolean;
  userProfile: UserProfile | null;
  gradientClass: string;
  selectedPost: BlogPost | null;
  isPostDialogOpen: boolean;
  onClosePostDialog: () => void;
}

export default function LandingFooterSections({
  reviews,
  showPhone,
  showTelegram,
  showMaxMessenger = false,
  userProfile,
  gradientClass,
  selectedPost,
  isPostDialogOpen,
  onClosePostDialog,
}: LandingFooterSectionsProps) {
  return (
    <>
      {/* Reviews Section */}
      {reviews && reviews.length > 0 && (
        <section className="py-20 sm:py-24 md:py-28 bg-gradient-to-b from-amber-50/30 via-orange-50/20 to-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Отзывы клиентов</h2>
            <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto font-light">
              Реальные истории людей, которым я помог
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {reviews.map((review: Review, index: number) => (
                <div 
                  key={index} 
                  className="group p-6 rounded-3xl bg-white border border-amber-200/50 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {review.name.charAt(0)}
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={18}
                          className={i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900 mb-3 text-lg">{review.name}</p>
                  <p className="text-gray-700 leading-relaxed mb-4">{review.text}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {(showPhone || showTelegram || showMaxMessenger) && (
        <section className="py-20 sm:py-24 md:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Свяжитесь со мной</h2>
                <p className="text-lg sm:text-xl text-gray-600 font-light">
                  Выберите удобный способ связи и запишитесь на сеанс
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
                {showPhone && (
                  <div className="group p-8 rounded-3xl bg-white border border-gray-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                    <div className="relative inline-block mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                      <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                        <Icon name="Phone" size={32} className="text-white" />
                      </div>
                    </div>
                    <p className="font-bold text-xl mb-6 text-gray-900">Телефон</p>
                    <Button 
                      asChild
                      size="lg"
                      className={`w-full bg-gradient-to-r ${gradientClass} hover:opacity-90 shadow-lg text-base font-semibold rounded-full`}
                      disabled={!userProfile?.phone}
                    >
                      <a href={userProfile?.phone ? `tel:${userProfile.phone}` : '#'}>
                        <Icon name="Phone" size={20} className="mr-2" />
                        Позвонить
                      </a>
                    </Button>
                  </div>
                )}
                {showTelegram && userProfile?.telegram && (
                  <div className="group p-8 rounded-3xl bg-white border border-gray-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                    <div className="relative inline-block mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                      <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                        <Icon name="Send" size={32} className="text-white" />
                      </div>
                    </div>
                    <p className="font-bold text-xl mb-6 text-gray-900">Telegram</p>
                    <Button 
                      asChild
                      size="lg"
                      className={`w-full bg-gradient-to-r ${gradientClass} hover:opacity-90 shadow-lg text-base font-semibold rounded-full`}
                    >
                      <a 
                        href={`https://t.me/${userProfile.telegram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="Send" size={20} className="mr-2" />
                        Написать
                      </a>
                    </Button>
                  </div>
                )}
                {showMaxMessenger && (
                  <div className="group p-8 rounded-3xl bg-white border border-gray-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Icon name="MessageSquare" size={32} className="text-white" />
                      </div>
                    </div>
                    <p className="font-bold text-xl mb-6 text-gray-900">MAX</p>
                    <Button 
                      asChild
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 shadow-lg text-base font-semibold rounded-full"
                      disabled={!userProfile?.max_messenger}
                    >
                      <a 
                        href={userProfile?.max_messenger ? `https://max.im/${userProfile.max_messenger.replace(/[^0-9]/g, '')}` : '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="MessageSquare" size={20} className="mr-2" />
                        Написать
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-700 pt-6 space-y-6">
            {/* Specialist Info */}
            <div className="text-center text-sm text-gray-400">
              {userProfile?.full_name && (
                <p className="font-medium text-gray-300 mb-1">
                  {userProfile.full_name}
                </p>
              )}
              {userProfile?.inn && (
                <p className="mb-2">
                  ИНН {userProfile.inn}
                </p>
              )}
            </div>

            {/* Medical Disclaimer */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs text-gray-400 leading-relaxed">
                Не оказывает медицинских услуг, не ставит диагнозы и не назначает лечение. Вся информация носит ознакомительный характер.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-400">
              <a 
                href="https://docdialog.su/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition-colors underline"
              >
                Политика конфиденциальности
              </a>
              <span className="hidden sm:inline text-gray-600">•</span>
              <a 
                href="https://docdialog.su/terms" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition-colors underline"
              >
                Договор оферты
              </a>
            </div>

            {/* Platform Credit */}
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm pt-2">
              <Icon name="Heart" size={14} className="text-red-400" />
              <a 
                href="https://docdialog.su" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Создано на платформе Док диалог
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Blog Post Dialog */}
      <Dialog open={isPostDialogOpen} onOpenChange={onClosePostDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold pr-8">
              {selectedPost?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedPost && (
            <div className="space-y-6">
              {selectedPost.image && (
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Icon name="Calendar" size={16} />
                <span>{selectedPost.date}</span>
              </div>

              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedPost.content}
                </p>
              </div>

              <div className="pt-6 border-t">
                <Button 
                  className={`w-full bg-gradient-to-r ${gradientClass}`}
                  onClick={onClosePostDialog}
                >
                  Закрыть
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}