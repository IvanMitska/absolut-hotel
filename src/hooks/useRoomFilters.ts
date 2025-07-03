import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Room } from '../types';
import { ROOM_CATEGORIES } from '../constants';
import type { FilterState } from '../components/features/RoomFilter';

const useRoomFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Инициализация фильтров из URL или значений по умолчанию
  const [filters, setFilters] = useState<FilterState>(() => {
    const checkIn = searchParams.get('checkIn') || '';
    const checkOut = searchParams.get('checkOut') || '';
    const adults = parseInt(searchParams.get('adults') || '2');
    const children = parseInt(searchParams.get('children') || '0');
    const roomType = searchParams.get('roomType')?.split(',').filter(Boolean) || [];
    const priceRange = searchParams.get('priceRange')?.split(',').map(Number) as [number, number] || [3000, 10000];
    const sizeRange = searchParams.get('sizeRange')?.split(',').map(Number) as [number, number] || [15, 50];
    const view = searchParams.get('view')?.split(',').filter(Boolean) || [];
    const amenities = searchParams.get('amenities')?.split(',').filter(Boolean) || [];
    const services = searchParams.get('services')?.split(',').filter(Boolean) || [];

    return {
      checkIn,
      checkOut,
      adults,
      children,
      roomType,
      priceRange,
      sizeRange,
      view,
      amenities,
      services,
    };
  });

  // Обновление URL при изменении фильтров
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.checkIn) params.set('checkIn', filters.checkIn);
    if (filters.checkOut) params.set('checkOut', filters.checkOut);
    if (filters.adults !== 2) params.set('adults', filters.adults.toString());
    if (filters.children !== 0) params.set('children', filters.children.toString());
    if (filters.roomType.length > 0) params.set('roomType', filters.roomType.join(','));
    if (filters.priceRange[0] !== 3000 || filters.priceRange[1] !== 10000) {
      params.set('priceRange', filters.priceRange.join(','));
    }
    if (filters.sizeRange[0] !== 15 || filters.sizeRange[1] !== 50) {
      params.set('sizeRange', filters.sizeRange.join(','));
    }
    if (filters.view.length > 0) params.set('view', filters.view.join(','));
    if (filters.amenities.length > 0) params.set('amenities', filters.amenities.join(','));
    if (filters.services.length > 0) params.set('services', filters.services.join(','));

    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Функция для проверки совпадения номера с фильтрами
  const matchesFilters = (room: Room): boolean => {
    // Проверка вместимости
    const totalGuests = filters.adults + filters.children;
    if (totalGuests > room.capacity.total) return false;

    // Проверка типа номера
    if (filters.roomType.length > 0 && !filters.roomType.includes(room.type)) return false;

    // Проверка цены
    if (room.price.basePrice < filters.priceRange[0] || room.price.basePrice > filters.priceRange[1]) {
      return false;
    }

    // Проверка площади
    if (room.size < filters.sizeRange[0] || room.size > filters.sizeRange[1]) {
      return false;
    }

    // Проверка удобств (если выбраны фильтры удобств, номер должен иметь хотя бы некоторые из них)
    if (filters.amenities.length > 0) {
      const roomAmenities = room.amenities.map(amenity => {
        // Маппинг удобств из номера на ID фильтров
        const amenityMap: Record<string, string> = {
          'Кондиционер': 'air-conditioning',
          'Балкон': 'balcony',
          'Мини-бар': 'minibar',
          'Джакузи': 'jacuzzi',
          'Кухня': 'kitchen',
          'Wi-Fi': 'wifi',
          'Сейф': 'safe',
          'Телевизор': 'tv',
          'Холодильник': 'fridge',
        };
        return amenityMap[amenity];
      }).filter(Boolean);

      const hasRequiredAmenities = filters.amenities.some(amenity => roomAmenities.includes(amenity));
      if (!hasRequiredAmenities) return false;
    }

    // Проверка услуг
    if (filters.services.length > 0) {
      const roomServices: string[] = [];
      
      // Проверяем наличие завтрака
      if (room.amenities.includes('Завтрак включен')) {
        roomServices.push('breakfast');
      }
      
      // Проверяем наличие парковки (для люкс номеров)
      if (room.amenities.includes('Гарантированная парковка')) {
        roomServices.push('parking');
      }

      const hasRequiredServices = filters.services.some(service => roomServices.includes(service));
      if (!hasRequiredServices) return false;
    }

    // Проверка доступности
    if (!room.availability) return false;

    return true;
  };

  // Фильтрованные номера
  const filteredRooms = useMemo(() => {
    return ROOM_CATEGORIES.filter(matchesFilters);
  }, [filters]);

  // Функция для обновления фильтров
  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Функция для сброса фильтров
  const resetFilters = () => {
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
    setFilters(initialFilters);
  };

  // Функция для получения количества дней
  const getDaysCount = (): number => {
    if (!filters.checkIn || !filters.checkOut) return 1;
    
    const checkInDate = new Date(filters.checkIn);
    const checkOutDate = new Date(filters.checkOut);
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 1;
  };

  // Функция для получения общей стоимости
  const getTotalPrice = (room: Room): number => {
    const days = getDaysCount();
    return room.price.basePrice * days;
  };

  // Статистика фильтрации
  const filterStats = useMemo(() => {
    const totalRooms = ROOM_CATEGORIES.length;
    const matchingRooms = filteredRooms.length;
    const availableRooms = filteredRooms.filter(room => room.availability).length;
    
    return {
      total: totalRooms,
      matching: matchingRooms,
      available: availableRooms,
      filtered: totalRooms - matchingRooms,
    };
  }, [filteredRooms]);

  // Функция для получения диапазона цен отфильтрованных номеров
  const getPriceRange = (): [number, number] => {
    if (filteredRooms.length === 0) return [0, 0];
    
    const prices = filteredRooms.map(room => room.price.basePrice);
    return [Math.min(...prices), Math.max(...prices)];
  };

  // Функция для сортировки номеров
  const sortRooms = (rooms: Room[], sortBy: 'price' | 'size' | 'capacity' = 'price'): Room[] => {
    return [...rooms].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price.basePrice - b.price.basePrice;
        case 'size':
          return b.size - a.size;
        case 'capacity':
          return b.capacity.total - a.capacity.total;
        default:
          return 0;
      }
    });
  };

  return {
    filters,
    filteredRooms,
    updateFilters,
    resetFilters,
    filterStats,
    getDaysCount,
    getTotalPrice,
    getPriceRange,
    sortRooms,
  };
};

export default useRoomFilters; 