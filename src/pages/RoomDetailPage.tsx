import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROOM_CATEGORIES, HOTEL_INFO } from '../constants';
import { ArrowLeft, CheckCircle, MapPin, Users, Home, Calendar, Star, Wifi, Tv, Wind, Refrigerator, Sun } from 'lucide-react';
import PageHeader from '../components/sections/PageHeader';
import Button from '../components/ui/Button';

const amenityIcons: { [key: string]: React.ElementType } = {
  'Wi-Fi': Wifi,
  'Телевизор': Tv,
  'Кондиционер': Wind,
  'Холодильник': Refrigerator,
  'Собственная ванная комната': Home,
  'Балкон': Sun,
};

const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const room = ROOM_CATEGORIES.find(r => r.id === id);

  if (!room) {
    return (
      <div className="text-center py-20 bg-slate-50">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">Номер не найден</h2>
        <p className="mb-8 text-slate-600">К сожалению, мы не смогли найти информацию по данному номеру.</p>
        <Link to="/rooms">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться ко всем номерам
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <PageHeader
        title={room.name}
        subtitle={room.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Левая колонка - Галерея и удобства */}
          <div className="lg:col-span-2">
            {/* Галерея */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-800">Фотогалерея</h2>
              <div className="grid grid-cols-2 gap-4">
                {room.images.map((img, index) => (
                  <div key={index} className="rounded-2xl overflow-hidden shadow-lg group">
                    <img 
                      src={img} 
                      alt={`${room.name} - фото ${index + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Удобства */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-slate-800">Что в номере</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {room.amenities.map(amenity => {
                  const Icon = amenityIcons[amenity] || CheckCircle;
                  return (
                    <div key={amenity} className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-100/50">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-ocean-500 rounded-lg flex items-center justify-center text-white">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-medium text-slate-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Правая колонка - бронирование */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-colored border border-slate-100/50">
                <div className="text-center mb-6">
                  <p className="text-lg text-slate-500">Цена за ночь от</p>
                  <p className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-ocean-600 bg-clip-text text-transparent my-2">
                    {room.price.basePrice.toLocaleString('ru-RU')}₽
                  </p>
                </div>

                <div className="space-y-4 text-slate-800 mb-8">
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-teal-500 mt-1" />
                    <div>
                      <h4 className="font-semibold">Вместимость</h4>
                      <p className="text-slate-600">{room.capacity.total} гостей ({room.capacity.main} осн. + {room.capacity.additional} доп.)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Home className="w-6 h-6 text-teal-500 mt-1" />
                    <div>
                      <h4 className="font-semibold">Площадь</h4>
                      <p className="text-slate-600">{room.size} м²</p>
                    </div>
                  </div>
                   <div className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-gold-500 mt-1" />
                    <div>
                      <h4 className="font-semibold">Оценка гостей</h4>
                      <p className="text-slate-600">4.8 / 5</p>
                    </div>
                  </div>
                </div>

                <Link to="/booking" className="w-full">
                  <Button variant="teal-gold" size="lg" className="w-full">
                    <Calendar className="w-5 h-5 mr-2" />
                    Забронировать
                  </Button>
                </Link>
                
                <div className="text-center mt-4">
                  <Link to="/rooms" className="text-sm text-slate-500 hover:text-ocean-600 transition">
                    Выбрать другой номер
                  </Link>
                </div>

              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage; 