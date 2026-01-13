import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ProfileVerificationCardProps {
  deleting: boolean;
  handleDeleteAccount: () => void;
}

export default function ProfileVerificationCard({ deleting, handleDeleteAccount }: ProfileVerificationCardProps) {
  return (
    <>
      <Card className="border-primary/20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
              <Icon name="ShieldCheck" className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">Верификация профиля</CardTitle>
              <CardDescription className="text-base">
                Получите до 4 бейджей доверия и станьте Premium-специалистом
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3">
            <div className="flex items-start gap-3">
              <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Больше заявок от клиентов</p>
                <p className="text-xs text-muted-foreground">Проверенные массажисты получают на 70% больше обращений</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Приоритет в поиске</p>
                <p className="text-xs text-muted-foreground">Ваш профиль показывается первым в каталоге</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Золотая рамка профиля</p>
                <p className="text-xs text-muted-foreground">Premium статус при получении всех 4 бейджей</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Знак доверия</p>
                <p className="text-xs text-muted-foreground">Бейджи подтверждают вашу квалификацию перед клиентами</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              Подтвердите образование, опыт работы, личность и пройдите сертификацию Док диалог
            </p>
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => window.location.href = '/dashboard/verification'}
            >
              <Icon name="BadgeCheck" size={18} className="mr-2" />
              Перейти к верификации
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/50 bg-destructive/5 mt-8">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <Icon name="AlertTriangle" size={20} />
            Опасная зона
          </CardTitle>
          <CardDescription>
            Удаление аккаунта необратимо. Все ваши данные будут потеряны.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={deleting}>
                <Icon name="Trash2" size={18} className="mr-2" />
                Удалить аккаунт
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                <AlertDialogDescription>
                  Это действие нельзя отменить. Ваш аккаунт и все связанные данные будут безвозвратно удалены.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                  Удалить навсегда
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </>
  );
}
