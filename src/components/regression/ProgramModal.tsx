import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ProgramLevel1Content from './ProgramLevel1Content';
import ProgramLevel2Content from './ProgramLevel2Content';
import ProgramLevel3Content from './ProgramLevel3Content';

interface ProgramModalProps {
  selectedLevel: 1 | 2 | 3;
  onClose: () => void;
  onBooking: () => void;
}

export default function ProgramModal({ selectedLevel, onClose, onBooking }: ProgramModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-background rounded-lg shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-2xl sm:text-3xl font-bold">
            Программа курса — Уровень {selectedLevel}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {selectedLevel === 1 && <ProgramLevel1Content />}
          {selectedLevel === 2 && <ProgramLevel2Content />}
          {selectedLevel === 3 && <ProgramLevel3Content />}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t px-6 py-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Закрыть
          </Button>
          <Button onClick={() => { onClose(); onBooking(); }}>
            Записаться на консультацию
          </Button>
        </div>
      </div>
    </div>
  );
}
