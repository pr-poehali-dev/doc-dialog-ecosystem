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
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Zap" size={20} className="text-primary" />
          Использование AI-инструментов
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
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
            <div className="text-sm">
              <span className="text-muted-foreground">Диалоги:</span>
              <span className="ml-2 font-medium">{usageData.dialogs_used}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Инструменты:</span>
              <span className="ml-2 font-medium">{usageData.tools_used}</span>
            </div>
          </div>
        </div>

        {extraRequests > 0 && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Plus" size={18} className="text-green-600" />
                <div className="text-sm">
                  <p className="font-medium text-green-900">Дополнительные запросы</p>
                  <p className="text-green-700">Доступно: {extraRequests}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {remaining <= 2 && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Icon name="AlertTriangle" size={18} className="text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
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
              className="w-full mt-3"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Докупить запросы
            </Button>
          </div>
        )}

        {remaining > 2 && (
          <Button 
            onClick={onBuyExtraClick}
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            Докупить запросы (скидки до 40%)
          </Button>
        )}

        <div className="pt-3 border-t text-xs text-muted-foreground">
          <p className="flex items-center gap-2">
            <Icon name="Info" size={14} />
            {usageData.limit} бесплатных запросов. Далее только пополнение.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}