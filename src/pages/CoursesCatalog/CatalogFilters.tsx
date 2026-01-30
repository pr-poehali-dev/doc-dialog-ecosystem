import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { debounce } from '@/utils/debounce';
import { CATEGORIES } from './types';

interface CatalogFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

export default function CatalogFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType
}: CatalogFiltersProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Дебаунс поиска на 300мс
  const debouncedSearch = useCallback(
    debounce((value: string) => setSearchQuery(value), 300),
    [setSearchQuery]
  );

  const handleSearchChange = (value: string) => {
    setLocalQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Поиск курсов..."
            value={localQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-md border bg-background min-w-[200px]"
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedType === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedType('all')}
          size="sm"
        >
          Все курсы
        </Button>
        <Button
          variant={selectedType === 'online' ? 'default' : 'outline'}
          onClick={() => setSelectedType('online')}
          size="sm"
        >
          <Icon name="Monitor" size={16} className="mr-2" />
          Онлайн
        </Button>
        <Button
          variant={selectedType === 'offline' ? 'default' : 'outline'}
          onClick={() => setSelectedType('offline')}
          size="sm"
        >
          <Icon name="MapPin" size={16} className="mr-2" />
          Офлайн
        </Button>
        <Button
          variant={selectedType === 'free' ? 'default' : 'outline'}
          onClick={() => setSelectedType('free')}
          size="sm"
        >
          <Icon name="Gift" size={16} className="mr-2" />
          Бесплатные
        </Button>
      </div>
    </div>
  );
}