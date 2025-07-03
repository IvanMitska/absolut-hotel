import React, { useState, useMemo } from 'react';
import { Calendar, Users, Calculator, ArrowRight } from 'lucide-react';
import Button from './Button';

interface BookingCalendarProps {
  basePrice: number;
  roomName: string;
  maxGuests: number;
  onBooking?: (checkIn: Date, checkOut: Date, guests: number, totalPrice: number) => void;
}

interface BookingDetails {
  nights: number;
  freeNights: number;
  paidNights: number;
  totalPrice: number;
  pricePerNight: number;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  basePrice,
  roomName,
  maxGuests,
  onBooking
}) => {
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState(2);

  // Расчет стоимости
  const bookingDetails = useMemo<BookingDetails>(() => {
    if (!checkIn || !checkOut) {
      return { 
        nights: 0, 
        totalPrice: 0, 
        pricePerNight: basePrice,
        freeNights: 0,
        paidNights: 0
      };
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (nights <= 0) {
      return { nights: 0, totalPrice: 0, pricePerNight: basePrice, freeNights: 0, paidNights: 0 };
    }

    // Применяем акции (из constants/index.ts)
    let freeNights = 0;
    if (nights >= 20) freeNights = 4;
    else if (nights >= 10) freeNights = 2;
    else if (nights >= 7) freeNights = 1;

    const paidNights = nights - freeNights;
    const totalPrice = paidNights * basePrice;

    return {
      nights,
      freeNights,
      paidNights,
      totalPrice,
      pricePerNight: basePrice
    };
  }, [checkIn, checkOut, basePrice]);

  const handleBooking = () => {
    if (!checkIn || !checkOut || bookingDetails.nights <= 0) return;
    
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    
    onBooking?.(startDate, endDate, guests, bookingDetails.totalPrice);
  };

  // Минимальная дата - сегодня
  const today = new Date().toISOString().split('T')[0];
  
  // Минимальная дата выезда - день после заезда
  const minCheckOut = checkIn ? 
    new Date(new Date(checkIn).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 
    today;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <div className="text-center mb-6">
        <p className="text-slate-500 mb-2">Стоимость за ночь</p>
        <p className="text-4xl font-bold text-teal-600">
          {basePrice.toLocaleString('ru-RU')}₽
        </p>
      </div>

      {/* Календарь */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Заезд
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={today}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Выезд
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={minCheckOut}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Количество гостей
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
          >
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Расчет стоимости */}
      {bookingDetails.nights > 0 && (
        <div className="bg-slate-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-5 h-5 text-teal-600" />
            <h4 className="font-semibold text-slate-800">Расчет стоимости</h4>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">
                {basePrice.toLocaleString('ru-RU')}₽ × {bookingDetails.nights} {bookingDetails.nights === 1 ? 'ночь' : bookingDetails.nights < 5 ? 'ночи' : 'ночей'}
              </span>
              <span className="font-medium">
                {(basePrice * bookingDetails.nights).toLocaleString('ru-RU')}₽
              </span>
            </div>
            
            {bookingDetails.freeNights > 0 && (
              <div className="flex justify-between items-center text-sm text-slate-600 mb-2">
                <span>
                  Скидка ({bookingDetails.freeNights} {bookingDetails.freeNights === 1 ? 'ночь' : bookingDetails.freeNights < 5 ? 'ночи' : 'ночей'} в подарок)
                </span>
                <span className="text-red-500">
                  -{(basePrice * bookingDetails.freeNights).toLocaleString('ru-RU')}₽
                </span>
              </div>
            )}
            
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Итого</span>
              <span className="text-teal-600">
                {bookingDetails.totalPrice.toLocaleString('ru-RU')}₽
              </span>
            </div>
          </div>
        </div>
      )}

      <Button
        variant="teal-gold"
        size="lg"
        className="w-full"
        onClick={handleBooking}
        disabled={!checkIn || !checkOut || bookingDetails.nights <= 0}
        icon={<ArrowRight className="w-5 h-5" />}
        iconPosition="right"
      >
        {bookingDetails.nights > 0 ? 
          `Забронировать за ${bookingDetails.totalPrice.toLocaleString('ru-RU')}₽` : 
          'Выберите даты'
        }
      </Button>

      {bookingDetails.freeNights > 0 && (
        <div className="text-sm text-teal-600 mt-2">
          🎉 Вы экономите {(basePrice * bookingDetails.freeNights).toLocaleString('ru-RU')}₽
        </div>
      )}
    </div>
  );
};

export default BookingCalendar; 