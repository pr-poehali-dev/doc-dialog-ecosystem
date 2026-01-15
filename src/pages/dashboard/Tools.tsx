import { Navigation } from '@/components/Navigation';
import Icon from '@/components/ui/icon';
import ToolCard from '@/components/tools/ToolCard';
import ToolDialog from '@/components/tools/ToolDialog';
import ToolUsageStats from '@/components/tools/ToolUsageStats';
import ToolLimitModal from '@/components/tools/ToolLimitModal';
import BuyExtraRequestsDialog from '@/components/tools/BuyExtraRequestsDialog';
import AnamnesisTool from '@/components/tools/AnamnesisTool';
import { tools } from './tools/toolsConfig';
import { useToolsLogic } from './tools/useToolsLogic';
import ToolsHeader from './tools/ToolsHeader';

export default function Tools() {
  const {
    activeToolId,
    inputText,
    setInputText,
    uploadedImage,
    setUploadedImage,
    response,
    loading,
    usageData,
    showLimitModal,
    setShowLimitModal,
    showBuyDialog,
    setShowBuyDialog,
    showAnamnesisTool,
    setShowAnamnesisTool,
    getDashboardRoute,
    getUserRole,
    handleImageUpload,
    handleAnalyze,
    handleToolClick,
    handleCloseDialog,
    handleBuyExtraRequests,
    handleAnamnesisAnalyze,
    navigate
  } = useToolsLogic();

  const userRole = getUserRole();
  const isClient = userRole === 'client';
  
  const availableTools = tools.filter(tool => {
    if (tool.id === 'anamnesis' && isClient) {
      return false;
    }
    return true;
  });

  const activeTool = tools.find(t => t.id === activeToolId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <ToolsHeader
            onBackClick={() => navigate(getDashboardRoute())}
          />

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
              {availableTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  id={tool.id}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  color={tool.color}
                  isLink={tool.isLink}
                  onClick={handleToolClick}
                />
              ))}
            </div>

            <div>
              <ToolUsageStats 
                usageData={usageData}
                onBuyExtraClick={() => setShowBuyDialog(true)}
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 border border-primary/10">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <Icon name="Lightbulb" size={20} className="text-primary sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Как использовать инструменты?</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={14} className="text-primary mt-0.5 flex-shrink-0 sm:w-4 sm:h-4" />
                    <span className="break-words">Выберите нужный инструмент из списка выше</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={14} className="text-primary mt-0.5 flex-shrink-0 sm:w-4 sm:h-4" />
                    <span className="break-words">Опишите ситуацию или вставьте медицинское заключение</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={14} className="text-primary mt-0.5 flex-shrink-0 sm:w-4 sm:h-4" />
                    <span className="break-words">Получите профессиональные рекомендации от AI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={14} className="text-primary mt-0.5 flex-shrink-0 sm:w-4 sm:h-4" />
                    <span className="break-words">Используйте полученные знания в работе с клиентами</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeTool && !activeTool.isLink && (
        <ToolDialog
          open={activeToolId !== null}
          onOpenChange={(open) => !open && handleCloseDialog()}
          toolTitle={activeTool.title}
          toolDescription={activeTool.description}
          placeholder={activeTool.placeholder || ''}
          inputText={inputText}
          setInputText={setInputText}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          response={response}
          loading={loading}
          onAnalyze={() => handleAnalyze(activeToolId!)}
          onImageUpload={handleImageUpload}
          isMedicalTool={activeTool.isMedicalTool || false}
        />
      )}

      <ToolLimitModal
        open={showLimitModal}
        onOpenChange={setShowLimitModal}
      />

      <BuyExtraRequestsDialog
        open={showBuyDialog}
        onOpenChange={setShowBuyDialog}
        onBuyRequests={handleBuyExtraRequests}
        firstPurchaseBonusAvailable={usageData?.first_purchase_bonus_available}
      />

      <AnamnesisTool
        open={showAnamnesisTool}
        onOpenChange={setShowAnamnesisTool}
        onAnalyze={handleAnamnesisAnalyze}
        loading={loading}
        response={response}
      />
    </div>
  );
}