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

interface LandingFooterSectionsProps {
  reviews: Review[];
  showPhone: boolean;
  showTelegram: boolean;
  showMaxMessenger?: boolean;
  userProfile: any;
  gradientClass: string;
  selectedPost: any;
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
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">Отзывы клиентов</h2>
            <p className="text-center text-sm sm:text-base text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              Реальные истории людей, которым я помог
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {reviews.map((review: any, index: number) => (
                <div 
                  key={index} 
                  className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                      {review.name.charAt(0)}
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={16}
                          className={i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900 mb-2">{review.name}</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{review.text}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {(showPhone || showTelegram || showMaxMessenger) && (
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Свяжитесь со мной</h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
                  Выберите удобный способ связи и запишитесь на сеанс
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {showPhone && (
                  <div className="p-4 sm:p-6 rounded-2xl bg-white border-2 border-gray-100 shadow-sm text-center">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                      <Icon name="Phone" size={24} className="text-white sm:w-7 sm:h-7" />
                    </div>
                    <p className="font-semibold text-base sm:text-lg mb-4 sm:mb-6 text-gray-900">Телефон</p>
                    <Button 
                      asChild
                      className={`w-full bg-gradient-to-r ${gradientClass} hover:opacity-90`}
                      disabled={!userProfile?.phone}
                    >
                      <a href={userProfile?.phone ? `tel:${userProfile.phone}` : '#'}>
                        <Icon name="Phone" size={18} className="mr-2" />
                        Позвонить
                      </a>
                    </Button>
                  </div>
                )}
                {showTelegram && userProfile?.telegram && (
                  <div className="p-4 sm:p-6 rounded-2xl bg-white border-2 border-gray-100 shadow-sm text-center">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                      <Icon name="Send" size={24} className="text-white sm:w-7 sm:h-7" />
                    </div>
                    <p className="font-semibold text-base sm:text-lg mb-4 sm:mb-6 text-gray-900">Telegram</p>
                    <Button 
                      asChild
                      className={`w-full bg-gradient-to-r ${gradientClass} hover:opacity-90`}
                    >
                      <a 
                        href={`https://t.me/${userProfile.telegram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="Send" size={18} className="mr-2" />
                        Написать
                      </a>
                    </Button>
                  </div>
                )}
                {showMaxMessenger && (
                  <div className="p-4 sm:p-6 rounded-2xl bg-white border-2 border-gray-100 shadow-sm text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Icon name="MessageSquare" size={24} className="text-white sm:w-7 sm:h-7" />
                    </div>
                    <p className="font-semibold text-base sm:text-lg mb-4 sm:mb-6 text-gray-900">MAX</p>
                    <Button 
                      asChild
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
                      disabled={!userProfile?.max_messenger}
                    >
                      <a 
                        href={userProfile?.max_messenger ? `https://max.im/${userProfile.max_messenger.replace(/[^0-9]/g, '')}` : '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="MessageSquare" size={18} className="mr-2" />
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
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8 sm:py-12">
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