import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  MapPin, 
  Grid,
  List
} from 'lucide-react';
import PageHeader from '../components/sections/PageHeader';
import Button from '../components/ui/Button';
import RoomFilter from '../components/features/RoomFilter';
import useRoomFilters from '../hooks/useRoomFilters';

const RoomsPage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'price' | 'size' | 'capacity'>('price');
  
  const {
    filters,
    filteredRooms,
    updateFilters,
    resetFilters,
    filterStats,
    getDaysCount,
    getTotalPrice,
    sortRooms,
    getRecommendations
  } = useRoomFilters();

  const sortedRooms = useMemo(() => {
    return sortRooms(filteredRooms, sortBy);
  }, [filteredRooms, sortBy, sortRooms]);

  const recommendations = useMemo(() => {
    return getRecommendations();
  }, [getRecommendations]);

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Выберите идеальный номер"
        subtitle="От уютного стандарта до просторных апартаментов — каждый номер создан для вашего комфорта"
      />

      {/* Секция с номерами и фильтрами */}
      <section className="py-8 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex lg:gap-8">
            {/* Боковая панель с фильтрами */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-8">
                <RoomFilter
                  filters={filters}
                  onFiltersChange={updateFilters}
                  matchingRoomsCount={filterStats.matching}
                  isOpen={isFilterOpen}
                  onToggle={() => setIsFilterOpen(!isFilterOpen)}
                  onApplyFilters={handleApplyFilters}
                />
              </div>
            </div>

            {/* Основной контент */}
            <div className="flex-1">
              {/* Панель управления */}
              <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold text-slate-800">
                    Найдено номеров: {filterStats.matching}
                  </h2>
                  {filterStats.filtered > 0 && (
                    <span className="text-sm text-slate-500">
                      (скрыто: {filterStats.filtered})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {/* Сортировка */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">Сортировка:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'price' | 'size' | 'capacity')}
                      className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="price">По цене</option>
                      <option value="size">По площади</option>
                      <option value="capacity">По вместимости</option>
                    </select>
                  </div>

                  {/* Переключатель вида */}
                  <div className="flex items-center border border-slate-200 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-l-lg transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-teal-500 text-white' 
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-r-lg transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-teal-500 text-white' 
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Результаты поиска */}
              {sortedRooms.length > 0 ? (
                <div className={`
                  ${viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                    : 'space-y-6'
                  }
                `}>
                  {sortedRooms.map((room, index) => (
                                   <div
                       key={room.id}
                       className={`
                         bg-white/90 backdrop-blur-sm rounded-3xl shadow-colored hover:shadow-colored-lg 
                         transition-all duration-500 overflow-hidden animate-slide-in-up group 
                         border border-slate-100/50 hover:scale-105 hover:-translate-y-2 
                         ${viewMode === 'grid' ? 'flex flex-col' : 'flex flex-col lg:flex-row'}
                       `}
                       style={{ animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: 'both' }}
                     >
                       {/* Изображение номера */}
                       <div className={`
                         relative overflow-hidden
                         ${viewMode === 'grid' ? 'h-64' : 'h-64 lg:h-auto lg:w-80'}
                       `}>
                         <img 
                           src={room.images[0]} 
                           alt={`${room.name} - фото номера`}
                           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                         
                         {/* Индикатор доступности */}
                         <div className="absolute top-4 right-4">
                           <div className={`
                             px-3 py-1 rounded-full text-xs font-medium
                             ${room.availability 
                               ? 'bg-green-500/90 text-white' 
                               : 'bg-red-500/90 text-white'
                             }
                           `}>
                             {room.availability ? 'Доступен' : 'Занят'}
                           </div>
                         </div>
                       </div>

                       <div className="p-6 lg:p-8 flex flex-col flex-grow">
                         <div className="flex justify-between items-start mb-4">
                           <h3 className="text-xl font-bold text-slate-800">{room.name}</h3>
                           <div className="text-right">
                             <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-ocean-600 bg-clip-text text-transparent">
                               {room.price.basePrice.toLocaleString()}₽
                             </div>
                             <div className="text-sm text-slate-500 font-medium">за ночь</div>
                             {getDaysCount() > 1 && (
                               <div className="text-lg font-semibold text-slate-700 mt-1">
                                 {getTotalPrice(room).toLocaleString()}₽ всего
                               </div>
                             )}
                           </div>
                         </div>

                         <div className="flex items-center gap-6 mb-4 text-sm text-slate-600">
                           <div className="flex items-center gap-2">
                             <Users className="w-4 h-4 text-teal-500" />
                             <span className="font-medium">{room.capacity.total} гостей</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <MapPin className="w-4 h-4 text-gold-500" />
                             <span className="font-medium">{room.size} м²</span>
                           </div>
                         </div>

                         <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                           {room.description}
                         </p>

                         {/* Удобства */}
                         <div className="mb-6">
                           <div className="flex flex-wrap gap-2">
                             {room.amenities.slice(0, 4).map((amenity, idx) => (
                               <span
                                 key={idx}
                                 className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                               >
                                 {amenity}
                               </span>
                             ))}
                             {room.amenities.length > 4 && (
                               <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                                 +{room.amenities.length - 4} еще
                               </span>
                             )}
                           </div>
                         </div>

                         <div className="mt-auto">
                           <div className="flex flex-col lg:flex-row gap-3">
                             <Link to={`/rooms/${room.id}`} className="block flex-1">
                               <Button
                                 variant="outline"
                                 size="sm"
                                 className="w-full"
                               >
                                 Подробнее
                               </Button>
                             </Link>
         
                             <Link to="/booking" className="block flex-1">
                               <Button
                                 variant="teal-gold"
                                 size="sm"
                                 className="w-full"
                                 disabled={!room.availability}
                               >
                                 {room.availability ? 'Забронировать' : 'Недоступен'}
                               </Button>
                             </Link>
                           </div>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="text-center py-12">
                   <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Users className="w-12 h-12 text-slate-400" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-800 mb-2">
                     Номера не найдены
                   </h3>
                   <p className="text-slate-600 mb-6">
                     Попробуйте изменить параметры поиска или сбросить фильтры
                   </p>
                   <Button
                     onClick={() => {
                       resetFilters();
                       setIsFilterOpen(false);
                     }}
                     variant="teal-gold"
                   >
                     Сбросить фильтры
                   </Button>
                 </div>
               )}

               {/* Рекомендации */}
               {recommendations.length > 0 && (
                 <div className="mt-16 pt-8 border-t border-slate-200">
                   <h3 className="text-xl font-bold text-slate-800 mb-6">
                     Возможно, вас заинтересует
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                     {recommendations.map((room) => (
                       <div
                         key={room.id}
                         className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-colored hover:shadow-colored-lg transition-all duration-500 overflow-hidden group border border-slate-100/50 hover:scale-105 hover:-translate-y-2 flex flex-col"
                       >
                         <div className="h-48 relative overflow-hidden">
                           <img 
                             src={room.images[0]} 
                             alt={`${room.name} - фото номера`}
                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                           <div className="absolute top-4 left-4">
                             <div className="px-3 py-1 bg-orange-500/90 text-white text-xs font-medium rounded-full">
                               Рекомендация
                             </div>
                           </div>
                         </div>
                         <div className="p-6 flex flex-col flex-grow">
                           <div className="flex justify-between items-start mb-4">
                             <h4 className="text-lg font-bold text-slate-800">{room.name}</h4>
                             <div className="text-right">
                               <div className="text-xl font-bold bg-gradient-to-r from-teal-600 to-ocean-600 bg-clip-text text-transparent">
                                 {room.price.basePrice.toLocaleString()}₽
                               </div>
                               <div className="text-xs text-slate-500 font-medium">за ночь</div>
                             </div>
                           </div>
                           <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                             <div className="flex items-center gap-2">
                               <Users className="w-4 h-4 text-teal-500" />
                               <span className="font-medium">{room.capacity.total} гостей</span>
                             </div>
                             <div className="flex items-center gap-2">
                               <MapPin className="w-4 h-4 text-gold-500" />
                               <span className="font-medium">{room.size} м²</span>
                             </div>
                           </div>
                           <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow">
                             {room.description}
                           </p>
                           <div className="mt-auto">
                             <Link to={`/rooms/${room.id}`} className="block">
                               <Button
                                 variant="outline"
                                 size="sm"
                                 className="w-full"
                               >
                                 Подробнее
                               </Button>
                             </Link>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           </div>
         </div>
       </section>

       {/* Мобильный фильтр */}
       <RoomFilter
         filters={filters}
         onFiltersChange={updateFilters}
         matchingRoomsCount={filterStats.matching}
         isOpen={isFilterOpen}
         onToggle={() => setIsFilterOpen(!isFilterOpen)}
         onApplyFilters={handleApplyFilters}
       />
     </div>
   );
 };
 
 export default RoomsPage; 