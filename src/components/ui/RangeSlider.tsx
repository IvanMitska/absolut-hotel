import React, { useState, useRef, useCallback, useEffect } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label: string;
  unit?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  label,
  unit = ''
}) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const [tempValue, setTempValue] = useState<[number, number]>(value);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [minValue, maxValue] = isDragging ? tempValue : value;

  // Округляем значение до ближайшего step только при финальном обновлении
  const roundToStep = (val: number): number => {
    return Math.round(val / step) * step;
  };

  // Преобразуем значение в процент
  const valueToPercent = (val: number): number => {
    return ((val - min) / (max - min)) * 100;
  };

  // Преобразуем процент в значение
  const percentToValue = (percent: number): number => {
    return min + (percent / 100) * (max - min);
  };

  // Получаем позицию мыши/касания относительно слайдера
  const getPointerPosition = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent): number => {
    if (!sliderRef.current) return 0;
    
    const rect = sliderRef.current.getBoundingClientRect();
    let clientX: number;
    
    if ('touches' in e) {
      clientX = e.touches[0]?.clientX || e.changedTouches[0]?.clientX || 0;
    } else {
      clientX = e.clientX;
    }
    
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    
    return Math.max(0, Math.min(100, percent));
  };

  // Обновляем временные значения во время перетаскивания
  const updateTempValue = useCallback((percent: number, thumb: 'min' | 'max') => {
    const newValue = percentToValue(percent);
    
    if (thumb === 'min') {
      const clampedMin = Math.max(min, Math.min(newValue, tempValue[1] - step));
      setTempValue([clampedMin, tempValue[1]]);
    } else {
      const clampedMax = Math.min(max, Math.max(newValue, tempValue[0] + step));
      setTempValue([tempValue[0], clampedMax]);
    }
  }, [min, max, step, tempValue]);

  // Финальное обновление значений с округлением
  const finalizeValue = useCallback((thumb: 'min' | 'max') => {
    const [tempMin, tempMax] = tempValue;
    const finalMin = roundToStep(tempMin);
    const finalMax = roundToStep(tempMax);
    
    // Убеждаемся, что значения не пересекаются
    const safeMin = Math.max(min, Math.min(finalMin, finalMax - step));
    const safeMax = Math.min(max, Math.max(finalMax, finalMin + step));
    
    onChange([safeMin, safeMax]);
  }, [min, max, step, tempValue, onChange]);

  // Обработчики мыши
  const handleMouseDown = (thumb: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(thumb);
    setTempValue(value);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const percent = getPointerPosition(e);
    updateTempValue(percent, isDragging);
  }, [isDragging, updateTempValue]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      finalizeValue(isDragging);
      setIsDragging(null);
    }
  }, [isDragging, finalizeValue]);

  // Обработчики касания для мобильных устройств
  const handleTouchStart = (thumb: 'min' | 'max') => (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(thumb);
    setTempValue(value);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const percent = getPointerPosition(e);
    updateTempValue(percent, isDragging);
  }, [isDragging, updateTempValue]);

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      finalizeValue(isDragging);
      setIsDragging(null);
    }
  }, [isDragging, finalizeValue]);

  // Обработчик клика по треку
  const handleTrackClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    
    const percent = getPointerPosition(e);
    const clickValue = percentToValue(percent);
    
    // Определяем, к какому ползунку ближе клик
    const distanceToMin = Math.abs(clickValue - minValue);
    const distanceToMax = Math.abs(clickValue - maxValue);
    
    const closestThumb = distanceToMin <= distanceToMax ? 'min' : 'max';
    
    // Непосредственно обновляем значение при клике
    const newValue = roundToStep(clickValue);
    if (closestThumb === 'min') {
      const clampedMin = Math.max(min, Math.min(newValue, maxValue - step));
      onChange([clampedMin, maxValue]);
    } else {
      const clampedMax = Math.min(max, Math.max(newValue, minValue + step));
      onChange([minValue, clampedMax]);
    }
  };

  // Подписываемся на глобальные события мыши и касания
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Обновляем tempValue при изменении внешних значений
  useEffect(() => {
    if (!isDragging) {
      setTempValue(value);
    }
  }, [value, isDragging]);

  const minPercent = valueToPercent(minValue);
  const maxPercent = valueToPercent(maxValue);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        <span className="text-sm text-slate-500 font-medium">
          {Math.round(minValue).toLocaleString()}{unit} - {Math.round(maxValue).toLocaleString()}{unit}
        </span>
      </div>
      
      <div className="relative px-3 py-2">
        {/* Основной трек */}
        <div 
          ref={sliderRef}
          className="relative h-2 bg-slate-200 rounded-full cursor-pointer"
          onClick={handleTrackClick}
        >
          {/* Активная область */}
          <div
            className={`absolute h-2 bg-gradient-to-r from-teal-500 to-ocean-600 rounded-full ${
              isDragging ? 'transition-none' : 'transition-all duration-150'
            }`}
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`
            }}
          />
          
          {/* Минимальный ползунок */}
          <div
            className={`absolute w-5 h-5 bg-white border-2 border-teal-500 rounded-full cursor-grab shadow-lg transform -translate-x-1/2 -translate-y-1/2 ${
              isDragging === 'min' ? 'scale-110 cursor-grabbing shadow-xl border-teal-600 transition-none' : 'hover:scale-105 transition-all duration-150'
            }`}
            style={{
              left: `${minPercent}%`,
              top: '50%',
              zIndex: isDragging === 'min' ? 10 : 2,
              touchAction: 'none'
            }}
            onMouseDown={handleMouseDown('min')}
            onTouchStart={handleTouchStart('min')}
          />
          
          {/* Максимальный ползунок */}
          <div
            className={`absolute w-5 h-5 bg-white border-2 border-teal-500 rounded-full cursor-grab shadow-lg transform -translate-x-1/2 -translate-y-1/2 ${
              isDragging === 'max' ? 'scale-110 cursor-grabbing shadow-xl border-teal-600 transition-none' : 'hover:scale-105 transition-all duration-150'
            }`}
            style={{
              left: `${maxPercent}%`,
              top: '50%',
              zIndex: isDragging === 'max' ? 10 : 3,
              touchAction: 'none'
            }}
            onMouseDown={handleMouseDown('max')}
            onTouchStart={handleTouchStart('max')}
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;