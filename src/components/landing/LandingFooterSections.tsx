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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Отзывы клиентов</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Реальные истории людей, которым я помог
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {reviews.map((review: any, index: number) => (
                <div 
                  key={index} 
                  className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Свяжитесь со мной</h2>
              <p className="text-xl text-gray-600">
                Выберите удобный способ связи и запишитесь на сеанс
              </p>
            </div>
            <div className={`grid ${showPhone && showTelegram ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-4 max-w-2xl mx-auto`}>
              {showPhone && userProfile?.phone && (
                <a 
                  href={`tel:${userProfile.phone}`}
                  className="group p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all text-center block no-underline"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon name="Phone" size={28} className="text-white" />
                  </div>
                  <p className="font-semibold text-lg mb-2 text-gray-900">Телефон</p>
                  <p className="text-gray-600 text-sm mb-4">{userProfile.phone}</p>
                  <div className={`w-full py-2 px-4 rounded-lg bg-gradient-to-r ${gradientClass} text-white font-medium`}>
                    Позвонить
                  </div>
                </a>
              )}
              {showTelegram && userProfile?.telegram && (
                <a 
                  href={`https://t.me/${userProfile.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all text-center block no-underline"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon name="Send" size={28} className="text-white" />
                  </div>
                  <p className="font-semibold text-lg mb-2 text-gray-900">Telegram</p>
                  <p className="text-gray-600 text-sm mb-4">{userProfile.telegram}</p>
                  <div className={`w-full py-2 px-4 rounded-lg bg-gradient-to-r ${gradientClass} text-white font-medium`}>
                    Написать
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Heart" size={16} className="text-red-400" />
            <p className="text-gray-400">Создано на платформе Док диалог</p>
          </div>
          <p className="text-gray-500 text-sm">© 2024 Все права защищены</p>
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
