import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  Home, 
  Eye, 
  Coffee,
  Car,
  ChevronDown,
  ChevronUp,
  Filter,
  X,
  RotateCcw
} from 'lucide-react';
import RangeSlider from '../ui/RangeSlider';

export interface FilterState {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomType: string[];
  priceRange: [number, number];
  sizeRange: [number, number];
  view: string[];
  amenities: string[];
  services: string[];
}

interface RoomFilterProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  matchingRoomsCount: number;
  isOpen: boolean;
  onToggle: () => void;
  onApplyFilters: () => void;
  onResetFilters?: () => void;
}

const ROOM_TYPES = [
  { id: 'standard', label: 'Стандарт', icon: Home },
  { id: 'family', label: 'Семейный', icon: Users },
  { id: 'suite', label: 'Люкс', icon: Home },
];

const VIEW_OPTIONS = [
  { id: 'sea', label: 'Вид на море' },
  { id: 'pool', label: 'Вид на бассейн' },
  { id: 'city', label: 'Вид на город' },
  { id: 'courtyard', label: 'Во двор' },
];

const AMENITIES = [
  { id: 'air-conditioning', label: 'Кондиционер', icon: '❄️' },
  { id: 'balcony', label: 'Балкон', icon: '🏠' },
  { id: 'minibar', label: 'Мини-бар', icon: '🍾' },
  { id: 'jacuzzi', label: 'Джакузи', icon: '🛁' },
  { id: 'kitchen', label: 'Кухня', icon: '🍳' },
  { id: 'wifi', label: 'Wi-Fi', icon: '📶' },
  { id: 'safe', label: 'Сейф', icon: '🔒' },
  { id: 'tv', label: 'Телевизор', icon: '📺' },
  { id: 'fridge', label: 'Холодильник', icon: '❄️' },
];

const SERVICES = [
  { id: 'breakfast', label: 'Завтрак включен', icon: Coffee },
  { id: 'parking', label: 'Парковка', icon: Car },
  { id: 'transfer', label: 'Трансфер', icon: '🚗' },
];

const RoomFilter: React.FC<RoomFilterProps> = ({
  filters,
  onFiltersChange,
  matchingRoomsCount,
  isOpen,
  onToggle,
  onApplyFilters,
  onResetFilters
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    dates: true,
    guests: true,
    roomType: true,
    price: true,
    size: false,
    view: false,
    amenities: false,
    services: false,
  });

  const [dateError, setDateError] = useState<string>('');

  // Автоматическое скрытие ошибки через 3 секунды
  useEffect(() => {
    if (dateError) {
      const timer = setTimeout(() => {
        setDateError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dateError]);

  // Предотвращаем скролл body когда фильтр открыт на мобильных
  useEffect(() => {
    if (isOpen) {
      // Сохраняем текущую позицию скролла
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Восстанавливаем позицию скролла
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleReset = () => {
    if (onResetFilters) {
      onResetFilters();
    } else {
      const initialFilters: FilterState = {
        checkIn: '',
        checkOut: '',
        adults: 2,
        children: 0,
        roomType: [],
        priceRange: [3000, 10000],
        sizeRange: [15, 50],
        view: [],
        amenities: [],
        services: [],
      };
      onFiltersChange(initialFilters);
    }
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    let updatedFilters = {
      ...filters,
      [key]: value
    };

    // Очищаем ошибку при любом изменении
    setDateError('');
    
    // Валидация дат: дата выезда должна быть позже даты заезда
    if (key === 'checkIn' && value && filters.checkOut) {
      const checkInDate = new Date(value);
      const checkOutDate = new Date(filters.checkOut);
      
      if (checkOutDate <= checkInDate) {
        // Устанавливаем дату выезда на следующий день после заезда
        const nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        updatedFilters.checkOut = nextDay.toISOString().split('T')[0];
        setDateError('Дата выезда автоматически скорректирована');
      }
    }
    
    if (key === 'checkOut' && value && filters.checkIn) {
      const checkInDate = new Date(filters.checkIn);
      const checkOutDate = new Date(value);
      
      if (checkOutDate <= checkInDate) {
        // Не позволяем выбрать дату выезда раньше или равную дате заезда
        setDateError('Дата выезда должна быть позже даты заезда');
        return;
      }
    }

    onFiltersChange(updatedFilters);
  };

  const toggleArrayFilter = (key: 'roomType' | 'view' | 'amenities' | 'services', value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  // Определяем, является ли это мобильной версией
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const FilterSection: React.FC<{
    title: string;
    sectionKey: string;
    children: React.ReactNode;
  }> = ({ title, sectionKey, children }) => (
    <div className="border-b border-slate-200/50 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50/50 transition-colors"
      >
        <span className="font-semibold text-slate-700">{title}</span>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-5 h-5 text-slate-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );

  // RangeSlider теперь импортируется как отдельный компонент

  return (
    <>
      {/* Оверлей для мобильной версии */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Панель фильтра */}
      <div 
        className={`
          ${isMobile ? `
            fixed top-0 left-0 h-full w-80
            bg-white/95 backdrop-blur-sm
            border-r border-slate-200/50
            shadow-xl
            z-50
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ` : ''}
          overflow-y-auto
        `}
        aria-hidden={isMobile && !isOpen}
      >
        {/* Заголовок */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200/50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-ocean-600 rounded-full flex items-center justify-center">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Фильтры</h2>
              <p className="text-sm text-slate-500">
                Найдено: {matchingRoomsCount} номеров
              </p>
            </div>
          </div>
          {isMobile && (
            <button
              onClick={onToggle}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Закрыть фильтр"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          )}
        </div>

        {/* Содержимое фильтра */}
        <div className="p-4">
          {/* Даты */}
          <FilterSection title="Даты заезда и выезда" sectionKey="dates">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Дата заезда
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={filters.checkIn}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => updateFilter('checkIn', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Дата выезда
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={filters.checkOut}
                    min={filters.checkIn ? (() => {
                      const checkInDate = new Date(filters.checkIn);
                      checkInDate.setDate(checkInDate.getDate() + 1);
                      return checkInDate.toISOString().split('T')[0];
                    })() : new Date().toISOString().split('T')[0]}
                    onChange={(e) => updateFilter('checkOut', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              {dateError && (
                <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-700 flex items-center gap-2">
                    <span className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">!</span>
                    {dateError}
                  </p>
                </div>
              )}
            </div>
          </FilterSection>

          {/* Гости */}
          <FilterSection title="Количество гостей" sectionKey="guests">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Взрослые
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateFilter('adults', Math.max(1, filters.adults - 1))}
                    className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{filters.adults}</span>
                  <button
                    onClick={() => updateFilter('adults', Math.min(10, filters.adults + 1))}
                    className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Дети
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateFilter('children', Math.max(0, filters.children - 1))}
                    className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{filters.children}</span>
                  <button
                    onClick={() => updateFilter('children', Math.min(10, filters.children + 1))}
                    className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </FilterSection>

          {/* Тип номера */}
          <FilterSection title="Тип номера" sectionKey="roomType">
            <div className="space-y-2">
              {ROOM_TYPES.map(type => (
                <label key={type.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.roomType.includes(type.id)}
                    onChange={() => toggleArrayFilter('roomType', type.id)}
                    className="w-4 h-4 text-teal-500 border-slate-300 rounded focus:ring-teal-500"
                  />
                  <type.icon className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">{type.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Цена */}
          <FilterSection title="Ценовой диапазон" sectionKey="price">
            <RangeSlider
              min={3000}
              max={10000}
              step={500}
              value={filters.priceRange}
              onChange={(value) => updateFilter('priceRange', value)}
              label="Цена за ночь"
              unit="₽"
            />
          </FilterSection>

          {/* Площадь */}
          <FilterSection title="Площадь номера" sectionKey="size">
            <RangeSlider
              min={15}
              max={50}
              step={5}
              value={filters.sizeRange}
              onChange={(value) => updateFilter('sizeRange', value)}
              label="Площадь"
              unit=" м²"
            />
          </FilterSection>

          {/* Вид из окна */}
          <FilterSection title="Вид из окна" sectionKey="view">
            <div className="space-y-2">
              {VIEW_OPTIONS.map(view => (
                <label key={view.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.view.includes(view.id)}
                    onChange={() => toggleArrayFilter('view', view.id)}
                    className="w-4 h-4 text-teal-500 border-slate-300 rounded focus:ring-teal-500"
                  />
                  <Eye className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">{view.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Удобства */}
          <FilterSection title="Удобства в номере" sectionKey="amenities">
            <div className="grid grid-cols-1 gap-2">
              {AMENITIES.map(amenity => (
                <label key={amenity.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity.id)}
                    onChange={() => toggleArrayFilter('amenities', amenity.id)}
                    className="w-4 h-4 text-teal-500 border-slate-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-lg">{amenity.icon}</span>
                  <span className="text-sm font-medium text-slate-700">{amenity.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Дополнительные услуги */}
          <FilterSection title="Дополнительные услуги" sectionKey="services">
            <div className="space-y-2">
              {SERVICES.map(service => (
                <label key={service.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.services.includes(service.id)}
                    onChange={() => toggleArrayFilter('services', service.id)}
                    className="w-4 h-4 text-teal-500 border-slate-300 rounded focus:ring-teal-500"
                  />
                  {typeof service.icon === 'string' ? (
                    <span className="text-lg">{service.icon}</span>
                  ) : (
                    <service.icon className="w-4 h-4 text-slate-500" />
                  )}
                  <span className="text-sm font-medium text-slate-700">{service.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>
        </div>

        {/* Кнопки действий для мобильной версии */}
        {isMobile && (
          <div className="sticky bottom-0 bg-white border-t border-slate-200/50 p-4 flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 py-2 px-4 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              Сбросить
            </button>
            <button
              onClick={() => {
                onApplyFilters();
                onToggle();
              }}
              className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-teal-500 to-ocean-600 text-white font-medium hover:from-teal-600 hover:to-ocean-700 transition-colors"
            >
              Применить
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default RoomFilter; 