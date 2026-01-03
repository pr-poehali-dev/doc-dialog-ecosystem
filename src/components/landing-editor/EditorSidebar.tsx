import Icon from '@/components/ui/icon';

interface Section {
  id: string;
  label: string;
  icon: string;
}

interface EditorSidebarProps {
  sections: Section[];
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function EditorSidebar({ sections, currentSection, onSectionChange }: EditorSidebarProps) {
  return (
    <div className="bg-card rounded-lg p-4 sticky top-4">
      <h3 className="font-semibold mb-3">Разделы</h3>
      <div className="space-y-1">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => onSectionChange(s.id)}
            className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
              currentSection === s.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            <Icon name={s.icon as any} size={16} />
            <span className="text-sm">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
