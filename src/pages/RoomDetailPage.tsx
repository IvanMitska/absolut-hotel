import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ROOM_CATEGORIES } from '../constants';
import { 
  ArrowLeft, 
  Users, 
  Home, 
  Star, 
  Wifi, 
  Tv, 
  Wind, 
  Refrigerator, 
  Sun,
  CheckCircle,
  MapPin,
  Shield,
  Coffee,
  Car,
  Baby,
  ChevronRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import ImageSlider from '../components/ui/ImageSlider';
import BookingCalendar from '../components/ui/BookingCalendar';

const amenityIcons: { [key: string]: React.ElementType } = {
  'Wi-Fi': Wifi,
  'Телевизор': Tv,
  'Кондиционер': Wind,
  'Холодильник': Refrigerator,
  'Балкон': Sun,
  'Балкон с хорошим обзором': Sun,
  'Балкон с панорамным видом': Sun,
  'Санузел с душем': Home,
  'Фен': Wind,
  'Завтрак включен': Coffee,
  'Гарантированная парковка': Car,
  'Улучшенная мебель': Home,
  'Премиум мебель': Home,
  'Премиум интерьер': Home,
  'Две комнаты': Home,
  'Больше пространства': Home,
};

const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const room = ROOM_CATEGORIES.find(r => r.id === id);

  if (!room) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">Номер не найден</h2>
          <p className="mb-8 text-slate-600">К сожалению, мы не смогли найти информацию по данному номеру.</p>
          <Button variant="outline" onClick={() => navigate('/rooms')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться к номерам
          </Button>
        </div>
      </div>
    );
  }

  const handleBooking = (checkIn: Date, checkOut: Date, guests: number, totalPrice: number) => {
    navigate('/booking', {
      state: {
        roomId: room.id,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests,
        totalPrice
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Современный хедер с breadcrumbs */}
      <div className="bg-white border-b border-slate-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-4">
            <Link to="/" className="hover:text-teal-600 transition-colors">
              Главная
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/rooms" className="hover:text-teal-600 transition-colors">
              Номера
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-800 font-medium">{room.name}</span>
          </nav>

          {/* Заголовок номера */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
                {room.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-600">
                <div className="flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  <span>{room.size} м²</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>До {room.capacity.total} гостей</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>4.8 (156 отзывов)</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-teal-600">
                {room.price.basePrice.toLocaleString('ru-RU')}₽
              </div>
              <div className="text-slate-500">за ночь</div>
            </div>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Левая колонка - Слайдер и информация */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Слайдер изображений */}
            <section>
              <ImageSlider 
                images={room.images} 
                alt={room.name}
                className="h-80 lg:h-[500px] rounded-2xl"
              />
            </section>

            {/* Описание номера */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">О номере</h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                {room.description}
              </p>
              
              {/* Основные характеристики */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-ocean-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Вместимость</p>
                    <p className="text-slate-600">{room.capacity.total} гостей</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Площадь</p>
                    <p className="text-slate-600">{room.size} м²</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Рейтинг</p>
                    <p className="text-slate-600">4.8 / 5</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Удобства - адаптивный дизайн */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Удобства в номере</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {room.amenities.map((amenity, index) => {
                  const Icon = amenityIcons[amenity] || CheckCircle;
                  return (
                    <div key={index} className="flex items-center gap-3 py-2">
                      <Icon className="w-5 h-5 text-teal-600 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Важная информация */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Важная информация</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-800">Заезд</p>
                      <p className="text-slate-600">с 14:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-800">Выезд</p>
                      <p className="text-slate-600">до 12:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Baby className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-800">Дети</p>
                      <p className="text-slate-600">До 3 лет включительно - бесплатно</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-800">Отмена</p>
                      <p className="text-slate-600">Бесплатная отмена за 24 часа</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-800">Адрес</p>
                      <p className="text-slate-600">ул. Черноморская, 171А, п. Витязево</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Coffee className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-800">Завтрак</p>
                      <p className="text-slate-600">Шведский стол 08:00-10:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Правая колонка - Календарь бронирования */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <BookingCalendar
                basePrice={room.price.basePrice}
                roomName={room.name}
                maxGuests={room.capacity.total}
                onBooking={handleBooking}
              />
              
              {/* Дополнительные кнопки */}
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => navigate('/rooms')}
                >
                  Сравнить с другими номерами
                </Button>
                
                <div className="text-center">
                  <a
                    href="tel:+79184636863"
                    className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    Есть вопросы? +7 (918) 463-68-63
                  </a>
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