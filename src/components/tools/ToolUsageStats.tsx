import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface UsageData {
  limit: number;
  dialogs_used: number;
  tools_used: number;
  total_used: number;
  extra_requests?: number;
}

interface ToolUsageStatsProps {
  usageData: UsageData | null;
  onBuyExtraClick: () => void;
}

export default function ToolUsageStats({ usageData, onBuyExtraClick }: ToolUsageStatsProps) {
  if (!usageData) return null;

  const extraRequests = usageData.extra_requests || 0;
  const totalAvailable = usageData.limit + extraRequests;
  const percentage = (usageData.total_used / totalAvailable) * 100;
  const remaining = Math.max(0, totalAvailable - usageData.total_used);

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Icon name="Zap" size={18} className="text-primary sm:w-5 sm:h-5" />
          <span className="truncate">Использование AI-инструментов</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">Использовано</span>
            <span className="font-medium">{usageData.total_used} из {totalAvailable}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary to-purple-600 h-2.5 rounded-full transition-all"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="text-xs sm:text-sm">
              <span className="text-muted-foreground">Диалоги:</span>
              <span className="ml-1 sm:ml-2 font-medium">{usageData.dialogs_used}</span>
            </div>
            <div className="text-xs sm:text-sm">
              <span className="text-muted-foreground">Инструменты:</span>
              <span className="ml-1 sm:ml-2 font-medium">{usageData.tools_used}</span>
            </div>
          </div>
        </div>

        {extraRequests > 0 && (
          <div className="p-2.5 sm:p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Plus" size={16} className="text-green-600 sm:w-[18px] sm:h-[18px]" />
                <div className="text-xs sm:text-sm">
                  <p className="font-medium text-green-900">Дополнительные запросы</p>
                  <p className="text-green-700">Доступно: {extraRequests}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {remaining <= 2 && (
          <div className="p-2.5 sm:p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Icon name="AlertTriangle" size={16} className="text-orange-600 mt-0.5 flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
              <div className="text-xs sm:text-sm">
                <p className="font-medium text-orange-900">Осталось использований: {remaining}</p>
                <p className="text-orange-700 mt-1">
                  {remaining === 0 
                    ? 'Лимит исчерпан. Вы можете докупить дополнительные запросы.'
                    : 'Скоро закончатся бесплатные использования. Вы можете докупить дополнительные запросы.'}
                </p>
              </div>
            </div>
            <Button 
              onClick={onBuyExtraClick}
              variant="default" 
              size="sm"
              className="w-full mt-3 text-xs sm:text-sm"
            >
              <Icon name="Plus" size={14} className="mr-1.5 sm:mr-2 sm:w-4 sm:h-4" />
              Докупить запросы
            </Button>
          </div>
        )}

        {remaining > 2 && (
          <Button 
            onClick={onBuyExtraClick}
            variant="outline" 
            size="sm" 
            className="w-full text-xs sm:text-sm"
          >
            <Icon name="ShoppingCart" size={14} className="mr-1.5 sm:mr-2 sm:w-4 sm:h-4" />
            <span className="truncate">Докупить запросы (скидки до 40%)</span>
          </Button>
        )}

        <div className="pt-3 border-t text-xs text-muted-foreground">
          <p className="flex items-center gap-2">
            <Icon name="Info" size={14} />
            10 бесплатных запросов для ознакомления. Далее только пополнение.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}