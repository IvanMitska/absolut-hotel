import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROOM_CATEGORIES } from '../constants';
import { 
  Users, 
  MapPin, 
  ArrowRight, 
  Search, 
  Filter, 
  Home,
  Heart,
  X,
  ChevronDown,
  Check,
  SlidersHorizontal,
  Star,
  Gift,
  Wifi
} from 'lucide-react';
import RoomCard from '../components/ui/RoomCard';

type SortOption = 'price-asc' | 'price-desc' | 'capacity-asc' | 'capacity-desc' | 'size-asc' | 'size-desc' | 'name-asc' | 'name-desc';

interface FilterOptions {
  priceRange: [number, number];
  capacity: string;
  amenities: string[];
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  icon?: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  icon 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selected = options.find(opt => opt.value === value);
    setSelectedLabel(selected?.label || placeholder);
  }, [value, options, placeholder]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-lg flex items-center justify-between transition-all duration-200 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 ${
          isOpen ? 'border-primary-400 ring-2 ring-primary-500/20' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-neutral-400">{icon}</span>}
          <span className={`text-xs ${value ? 'text-neutral-900' : 'text-neutral-500'} truncate`}>
            {selectedLabel}
          </span>
        </div>
        <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 overflow-hidden"
          >
            <div className="py-1 max-h-48 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs transition-colors hover:bg-primary-50 flex items-center justify-between ${
                    value === option.value ? 'bg-primary-50 text-primary-700' : 'text-neutral-700'
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {value === option.value && (
                    <Check className="w-3 h-3 text-primary-600 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RoomsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000],
    capacity: 'all',
    amenities: []
  });

  // Получаем все уникальные удобства
  const allAmenities = useMemo(() => {
    const amenitiesSet = new Set<string>();
    ROOM_CATEGORIES.forEach(room => {
      room.amenities.forEach(amenity => amenitiesSet.add(amenity));
    });
    return Array.from(amenitiesSet);
  }, []);

  // Опции для сортировки
  const sortOptions = [
    { value: 'price-asc', label: 'Цена: по возрастанию' },
    { value: 'price-desc', label: 'Цена: по убыванию' },
    { value: 'capacity-asc', label: 'Вместимость: меньше' },
    { value: 'capacity-desc', label: 'Вместимость: больше' },
    { value: 'size-asc', label: 'Размер: меньше' },
    { value: 'size-desc', label: 'Размер: больше' },
    { value: 'name-asc', label: 'Название: А-Я' },
    { value: 'name-desc', label: 'Название: Я-А' }
  ];

  // Опции для вместимости
  const capacityOptions = [
    { value: 'all', label: 'Любая' },
    { value: '2', label: 'до 2 гостей' },
    { value: '3', label: 'до 3 гостей' },
    { value: '4', label: 'до 4 гостей' },
    { value: '5', label: '5 и более' }
  ];

  // Фильтрация и сортировка номеров
  const filteredAndSortedRooms = useMemo(() => {
    let filtered = ROOM_CATEGORIES.filter(room => {
      // Поиск по названию и описанию
      const matchesSearch = !searchQuery || 
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Фильтр по цене
      const matchesPrice = room.price.basePrice >= filters.priceRange[0] && 
        room.price.basePrice <= filters.priceRange[1];

      // Фильтр по вместимости
      const capacityFilter = parseInt(filters.capacity);
      const matchesCapacity = filters.capacity === 'all' || 
        (filters.capacity === '5' 
          ? room.capacity.total >= 5 
          : room.capacity.total <= capacityFilter);

      // Фильтр по удобствам
      const matchesAmenities = filters.amenities.length === 0 ||
        filters.amenities.every(amenity => room.amenities.includes(amenity));

      return matchesSearch && matchesPrice && matchesCapacity && matchesAmenities;
    });

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price.basePrice - b.price.basePrice;
        case 'price-desc':
          return b.price.basePrice - a.price.basePrice;
        case 'capacity-asc':
          return a.capacity.total - b.capacity.total;
        case 'capacity-desc':
          return b.capacity.total - a.capacity.total;
        case 'size-asc':
          return a.size - b.size;
        case 'size-desc':
          return b.size - a.size;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, sortBy, filters]);

  const toggleAmenityFilter = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 10000],
      capacity: 'all',
      amenities: []
    });
    setSearchQuery('');
  };

  const activeFiltersCount = filters.amenities.length + (filters.capacity !== 'all' ? 1 : 0) + (filters.priceRange[1] < 10000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Hero секция */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-16 w-24 h-24 bg-accent-400/20 rounded-full blur-2xl animate-pulse"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-sm font-medium mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Home className="w-4 h-4" />
              6 категорий номеров
            </motion.div>

            <h1 className="display-text mb-8">
              Выберите идеальный номер
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              От уютного стандарта до просторных люксов — у нас найдется номер для любого бюджета и предпочтений
            </p>
          </motion.div>
        </div>
      </section>

      {/* Компактная панель поиска и фильтров */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-xl border-b border-neutral-200/50 shadow-lg">
        <div className="container-custom py-4">
          {/* Основная строка с поиском и кнопками */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Поиск */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Поиск по названию или описанию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all text-sm"
              />
            </div>

            {/* Компактные контролы */}
            <div className="flex gap-2 items-center">
              {/* Сортировка */}
              <div className="w-36">
                <CustomSelect
                  value={sortBy}
                  onChange={(value) => setSortBy(value as SortOption)}
                  options={sortOptions}
                  placeholder="Сортировка"
                  icon={<SlidersHorizontal className="w-4 h-4" />}
                />
              </div>

              {/* Кнопка фильтров */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`relative px-3 py-2.5 rounded-lg transition-all flex items-center gap-2 text-sm font-medium whitespace-nowrap ${
                  showFilters || activeFiltersCount > 0
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-primary-300'
                }`}
              >
                <Filter className="w-4 h-4" />
                Фильтры
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Кнопка очистки фильтров */}
              {activeFiltersCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={clearFilters}
                  className="p-2.5 text-neutral-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                  title="Очистить фильтры"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>

          {/* Расширенная панель фильтров */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="mt-3 p-4 bg-gradient-to-br from-neutral-50 to-white rounded-xl border border-neutral-200/50 shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Фильтр по цене */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-neutral-900 text-xs flex items-center gap-1.5">
                      <Star className="w-3 h-3 text-accent-500" />
                      Цена за ночь
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-neutral-600">
                        <span>0₽</span>
                        <span className="font-semibold text-primary-600">
                          {filters.priceRange[1].toLocaleString()}₽
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="10000"
                          step="500"
                          value={filters.priceRange[1]}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            priceRange: [0, parseInt(e.target.value)]
                          }))}
                          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Фильтр по вместимости */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-neutral-900 text-xs flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-primary-500" />
                      Гости
                    </h3>
                    <CustomSelect
                      value={filters.capacity}
                      onChange={(value) => setFilters(prev => ({ ...prev, capacity: value }))}
                      options={capacityOptions}
                      placeholder="Количество"
                    />
                  </div>

                  {/* Результаты */}
                  <div className="flex items-center justify-center sm:justify-start lg:justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary-600">
                        {filteredAndSortedRooms.length}
                      </div>
                      <div className="text-xs text-neutral-500">найдено</div>
                    </div>
                  </div>

                  {/* Кнопка сброса */}
                  <div className="flex items-center justify-center">
                    <button
                      onClick={clearFilters}
                      className="px-3 py-1.5 text-xs text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      Сбросить
                    </button>
                  </div>
                </div>

                {/* Фильтр по удобствам */}
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <h3 className="font-medium text-neutral-900 mb-2 text-xs flex items-center gap-1.5">
                    <Heart className="w-3 h-3 text-accent-500" />
                    Удобства
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {allAmenities.map(amenity => (
                      <motion.button
                        key={amenity}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleAmenityFilter(amenity)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                          filters.amenities.includes(amenity)
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-primary-50 hover:border-primary-300'
                        }`}
                      >
                        {amenity}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Результаты поиска */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Сетка номеров */}
          {filteredAndSortedRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredAndSortedRooms.map((room, index) => (
                  <RoomCard key={room.id} room={room} index={index} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Номера не найдены
              </h3>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                Попробуйте изменить параметры поиска или очистить фильтры, чтобы найти подходящий номер
              </p>
              <button
                onClick={clearFilters}
                className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors"
              >
                Очистить фильтры
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RoomsPage; 