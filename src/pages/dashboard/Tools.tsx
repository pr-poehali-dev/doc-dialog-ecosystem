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
    handleImageUpload,
    handleAnalyze,
    handleToolClick,
    handleCloseDialog,
    handleBuyExtraRequests,
    handleAnamnesisAnalyze,
    handleSaveAnamnesis,
    navigate
  } = useToolsLogic();

  const activeTool = tools.find(t => t.id === activeToolId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <ToolsHeader
            onBackClick={() => navigate(getDashboardRoute())}
            onHistoryClick={() => navigate('/dashboard/anamnesis-history')}
          />

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
              {tools.map((tool) => (
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

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-primary/10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <Icon name="Lightbulb" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Как использовать инструменты?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Выберите нужный инструмент из списка выше</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Опишите ситуацию или вставьте медицинское заключение</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Получите профессиональные рекомендации от AI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Используйте полученные знания в работе с клиентами</span>
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
      />

      <AnamnesisTool
        open={showAnamnesisTool}
        onOpenChange={setShowAnamnesisTool}
        onAnalyze={handleAnamnesisAnalyze}
        onSave={handleSaveAnamnesis}
        loading={loading}
        response={response}
      />
    </div>
  );
}
