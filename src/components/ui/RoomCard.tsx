import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Star, 
  Users, 
  Bed, 
  Bath, 
  Wifi, 
  Car, 
  Coffee, 
  Tv, 
  Phone,
  Calendar,
  CheckCircle,
  Gift,
  Sparkles
} from 'lucide-react';
import type { Room } from '../../types';
import { cn } from '../../utils';
import Button from './Button';

interface RoomCardProps {
  room: Room;
  className?: string;
  featured?: boolean;
  showDiscount?: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({ 
  room, 
  className,
  featured = false,
  showDiscount = false
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Иконки для удобств
  const amenityIcons: Record<string, React.ReactNode> = {
    'wi-fi': <Wifi className="w-4 h-4" />,
    'кондиционер': <div className="w-4 h-4">❄️</div>,
    'телевизор': <Tv className="w-4 h-4" />,
    'холодильник': <Coffee className="w-4 h-4" />,
    'парковка': <Car className="w-4 h-4" />,
    'ванная': <Bath className="w-4 h-4" />,
    'балкон': <div className="w-4 h-4">🏠</div>,
    'сейф': <div className="w-4 h-4">🔒</div>,
    'мини-бар': <Coffee className="w-4 h-4" />,
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev === 0 ? room.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev === room.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const renderAmenities = () => {
    const mainAmenities = room.amenities.slice(0, 6);
    const hasMore = room.amenities.length > 6;

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {mainAmenities.map((amenity, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-xs text-gray-600"
          >
            {amenityIcons[amenity.toLowerCase()] || <CheckCircle className="w-3 h-3" />}
            <span className="font-medium">{amenity}</span>
          </div>
        ))}
        {hasMore && (
          <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            +{room.amenities.length - 6}
          </div>
        )}
      </div>
    );
  };

  const hasSpecialOffer = showDiscount && room.price.basePrice > 5000;

  return (
    <div className={cn(
      "group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105",
      featured && "ring-2 ring-blue-500 ring-offset-2",
      className
    )}>
      
      {/* Специальное предложение */}
      {hasSpecialOffer && (
        <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          <Gift className="w-4 h-4 inline mr-1" />
          -15% при бронировании на 7+ дней
        </div>
      )}

      {/* Кнопка лайка */}
      <button
        className={cn(
          "absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
          isLiked ? "bg-red-500 text-white" : "bg-white/80 backdrop-blur-md text-gray-600 hover:bg-white"
        )}
        onClick={handleLikeToggle}
      >
        <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
      </button>

      {/* Галерея изображений */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {room.images.length > 0 ? (
          <>
            <img
              src={room.images[currentImageIndex]}
              alt={`${room.name} - ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Навигация по изображениям */}
            {room.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleImageNavigation('prev');
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleImageNavigation('next');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                >
                  ›
                </button>
                
                {/* Индикаторы изображений */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {room.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentImageIndex(index);
                      }}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Bed className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>

      {/* Контент карточки */}
      <div className="p-6">
        
        {/* Заголовок и рейтинг */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {room.name}
            </h3>
            <p className="text-sm text-gray-600 capitalize">
              {room.type} • до {room.capacity.total} гостей
            </p>
          </div>
          
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-yellow-700">4.8</span>
          </div>
        </div>

        {/* Описание */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {room.description}
        </p>

        {/* Удобства */}
        {renderAmenities()}

        {/* Характеристики номера */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4">📏</div>
            <span>{room.size} м²</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{room.capacity.adults}+{room.capacity.children}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>2 кровати</span>
          </div>
        </div>

        {/* Цена и действия */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              {hasSpecialOffer && (
                <span className="text-lg text-gray-400 line-through">
                  {Math.round(room.price.basePrice * 1.15).toLocaleString()}₽
                </span>
              )}
              <span className="text-2xl font-bold text-gray-900">
                {room.price.basePrice.toLocaleString()}₽
              </span>
            </div>
            <span className="text-sm text-gray-500">за сутки</span>
          </div>
          
          <div className="flex gap-2">
            <Link to={`/rooms/${room.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="text-sm"
              >
                Подробнее
              </Button>
            </Link>
            <Link to={`/booking?room=${room.id}`}>
              <Button
                variant="primary"
                size="sm"
                icon={<Calendar className="w-4 h-4" />}
                iconPosition="left"
                className="text-sm"
              >
                Забронировать
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard; 