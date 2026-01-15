import { useRef, useCallback, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ToolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  toolTitle: string;
  toolDescription: string;
  placeholder: string;
  inputText: string;
  setInputText: (text: string) => void;
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  response: string;
  loading: boolean;
  onAnalyze: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMedicalTool: boolean;
}

export default function ToolDialog({
  open,
  onOpenChange,
  toolTitle,
  toolDescription,
  placeholder,
  inputText,
  setInputText,
  uploadedImage,
  setUploadedImage,
  response,
  loading,
  onAnalyze,
  onImageUpload,
  isMedicalTool
}: ToolDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const copyTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const dialogText = useMemo(() => `Запрос:\n${inputText}\n\nОтвет:\n${response}`, [inputText, response]);

  const copyDialogToClipboard = useCallback(() => {
    if (copyTextAreaRef.current) {
      copyTextAreaRef.current.select();
      document.execCommand('copy');
      toast({
        title: 'Скопировано',
        description: 'Диалог скопирован в буфер обмена'
      });
    }
  }, [toast]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{toolTitle}</DialogTitle>
          <DialogDescription>{toolDescription}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {isMedicalTool && (
            <>
              <div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Icon name="Upload" size={18} className="mr-2" />
                  Загрузить изображение снимка
                </Button>
              </div>

              {uploadedImage && (
                <div className="relative">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded" 
                    className="w-full max-h-64 object-contain rounded-lg border"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setUploadedImage(null)}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              )}
            </>
          )}

          <Textarea
            placeholder={placeholder}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={8}
            className="resize-none"
          />
          
          <Button 
            onClick={onAnalyze} 
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                Анализирую...
              </>
            ) : (
              <>
                <Icon name="Sparkles" size={18} className="mr-2" />
                Анализировать
              </>
            )}
          </Button>

          {response && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2 text-sm text-blue-800">
                  <Icon name="Info" size={16} className="flex-shrink-0 mt-0.5" />
                  <p>
                    Сервис не хранит данные запросов и диалогов. Нажмите кнопку "Выделить весь текст" и скопируйте через Ctrl+C (или Cmd+C на Mac).
                  </p>
                </div>
              </div>
              
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Icon name="FileText" size={18} className="text-blue-600" />
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      Результат
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyDialogToClipboard}
                  >
                    <Icon name="Copy" size={16} className="mr-2" />
                    Выделить весь текст
                  </Button>
                </div>
                <textarea
                  ref={copyTextAreaRef}
                  value={dialogText}
                  readOnly
                  className="w-full h-96 p-4 border rounded-lg font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}