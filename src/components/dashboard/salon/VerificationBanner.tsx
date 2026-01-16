import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface VerificationBannerProps {
  isVerified: boolean | null;
  salonExists: boolean;
  loading: boolean;
  onEditProfile: () => void;
}

export default function VerificationBanner({
  isVerified,
  salonExists,
  loading,
  onEditProfile
}: VerificationBannerProps) {
  if (loading) return null;

  if (isVerified === false) {
    return (
      <Card className="mb-4 md:mb-6 bg-blue-50 border-blue-200">
        <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="AlertCircle" className="text-blue-600" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-blue-900 mb-2 text-sm md:text-base">Профиль не заполнен</h3>
              <p className="text-xs md:text-sm text-blue-800 mb-3">
                {salonExists 
                  ? 'Ваш профиль салона находится на модерации. После успешной верификации вы появитесь в каталоге салонов и сможете получить значок "Verified". Обычно проверка занимает 1-2 рабочих дня.'
                  : 'Заполните информацию о вашем салоне, чтобы отправить профиль на модерацию. После одобрения администратором вы появитесь в каталоге салонов и получите значок "Verified".'
                }
              </p>
              <p className="text-xs text-blue-700 mb-4">
                <Icon name="Info" size={14} className="inline mr-1" />
                {salonExists 
                  ? 'До верификации ваш профиль не виден другим пользователям в каталоге'
                  : 'Вам нужно указать: название, описание, адрес, контакты и фотографии салона'
                }
              </p>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" onClick={onEditProfile}>
                <Icon name="Edit" size={16} className="mr-2" />
                {salonExists ? 'Редактировать профиль' : 'Заполнить профиль салона'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isVerified === true) {
    return (
      <Card className="mb-4 md:mb-6 bg-green-50 border-green-200">
        <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="CheckCircle" className="text-green-600" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-green-900 mb-2 text-sm md:text-base">Профиль верифицирован</h3>
              <p className="text-xs md:text-sm text-green-800 mb-3">
                Ваш салон прошел модерацию и доступен в каталоге. Вы можете редактировать информацию о салоне в любое время.
              </p>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto" onClick={onEditProfile}>
                <Icon name="Edit" size={16} className="mr-2" />
                Редактировать профиль салона
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
