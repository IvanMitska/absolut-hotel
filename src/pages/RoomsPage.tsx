import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ROOM_CATEGORIES } from '../constants';
import { 
  Users, 
  MapPin, 
  ArrowRight,
  Gift,
  Calendar
} from 'lucide-react';
import PageHeader from '../components/sections/PageHeader';
import Button from '../components/ui/Button';

const RoomsPage: React.FC = () => {
  // For now, we'll just display all rooms.
  // We can add filtering/sorting later if needed, but in the new style.
  const allRooms = useMemo(() => [...ROOM_CATEGORIES], []);

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Выберите идеальный номер"
        subtitle="От уютного стандарта до просторных апартаментов — каждый номер создан для вашего комфорта"
      />

      {/* Секция с номерами в стиле главной страницы */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Здесь можно будет добавить фильтры и сортировку в будущем */}
          
          {/* Сетка номеров в стиле главной страницы */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allRooms.map((room, index) => (
              <div
                key={room.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-colored hover:shadow-colored-lg transition-all duration-500 overflow-hidden animate-slide-in-up group border border-slate-100/50 hover:scale-105 hover:-translate-y-2 flex flex-col"
                style={{ animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: 'both' }}
              >
                {/* Изображение */}
                <div className="h-64 bg-gradient-to-br from-slate-100 via-teal-50 to-ocean-50 relative overflow-hidden">
                   {/* В реальном проекте здесь будет <img src={room.imageUrl} /> */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-slate-500 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-colored">
                        <Users className="w-10 h-10 text-teal-500" />
                      </div>
                      <p className="text-base font-semibold">{room.name}</p>
                    </div>
                  </div>
                  
                  {/* Бейдж "Акция", если применимо */}
                  {room.specialOffer && (
                    <div className="absolute top-6 right-6 bg-gold-gradient text-slate-800 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-gold">
                      <Gift className="w-4 h-4" />
                      {room.specialOffer}
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold text-slate-800">{room.name}</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-ocean-600 bg-clip-text text-transparent">
                        {room.price.basePrice.toLocaleString()}₽
                      </div>
                      <div className="text-sm text-slate-500 font-medium">за ночь</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-teal-500" />
                      <span className="font-medium">{room.capacity.total} гостей</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gold-500" />
                      <span className="font-medium">{room.size} м²</span>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-8 leading-relaxed flex-grow">
                    {room.description}
                  </p>

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
                          >
                            Забронировать
                          </Button>
                        </Link>
                      </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoomsPage; 