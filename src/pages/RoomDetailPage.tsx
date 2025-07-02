import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROOM_CATEGORIES, HOTEL_INFO } from '../constants';
import { ArrowLeft, CheckCircle, MapPin, Users, Home } from 'lucide-react';

const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const room = ROOM_CATEGORIES.find(r => r.id === id);

  if (!room) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Номер не найден</h2>
        <p className="mb-8">К сожалению, мы не смогли найти информацию по данному номеру.</p>
        <Link to="/rooms" className="btn-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Вернуться ко всем номерам
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero-секция с главной фотографией */}
      <section className="relative h-[60vh] bg-gray-800">
        <img src={room.images[0] || '/images/hero/hotel-exterior.jpg'} alt={room.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container-custom">
            <Link to="/rooms" className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition mb-4">
              <ArrowLeft className="w-4 h-4" />
              Все номера
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold">{room.name}</h1>
            <p className="text-xl mt-2 max-w-2xl">{room.description}</p>
          </div>
        </div>
      </section>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Левая колонка - основная информация */}
          <div className="lg:col-span-2">
            {/* Галерея */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Фотогалерея</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.images.map((img, index) => (
                  <div key={index} className="aspect-w-1 aspect-h-1 rounded-xl overflow-hidden shadow-lg">
                    <img src={img} alt={`${room.name} - фото ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </section>

            {/* Удобства */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Удобства в номере</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
                {room.amenities.map(amenity => (
                  <li key={amenity} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Правая колонка - бронирование и краткая информация */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-8 rounded-2xl shadow-lg border">
              <div className="text-center mb-6">
                <p className="text-lg text-gray-500">Цена за ночь от</p>
                <p className="text-5xl font-bold text-primary-600 my-2">
                  {room.price.basePrice.toLocaleString('ru-RU')} ₽
                </p>
              </div>

              <div className="space-y-4 text-gray-800 mb-8">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary-500" />
                  <span>Вместимость: <strong>{room.capacity.total} гостей</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-primary-500" />
                  <span>Площадь: <strong>{room.size}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-500" />
                  <span>{HOTEL_INFO.address}</span>
                </div>
              </div>

              <Link to="/booking" className="btn-primary w-full">
                Забронировать
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage; 