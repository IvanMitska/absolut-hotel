import type { Hotel, Contact, NavigationItem, GuestReview, Room } from '../types';

// Логотип отеля
export const LOGO = {
  main: '/images/logo/logo-original.png',
  // Используем один логотип для всех случаев
  white: '/images/logo/logo-original.png',
  icon: '/images/logo/logo-original.png',
};

// Основная информация об отеле
export const HOTEL_INFO: Hotel = {
  id: 'absolut-vityazevo',
  name: 'Отель "Абсолют"',
  description: 'Современный семейный отель в самом центре курортного поселка Витязево с подогреваемым бассейном (26-28°C) и домашней атмосферой. Открытие отеля состоялось в 2018 году, год от года отель вносил изменения в инфраструктуру. На сегодняшний день это отличный выбор для семейного отдыха и веселой компании друзей!',
  address: 'ул. Черноморская, 171А, п. Витязево, Анапа, Краснодарский край',
  phone: '+7(988)318-48-25',
  email: 'absolute-vityazevo@mail.ru',
  coordinates: {
    lat: 45.0048,
    lng: 37.2572,
  },
  amenities: [
    'Подогреваемый открытый бассейн (26-28°C)',
    'Детская игровая площадка с безопасным покрытием',
    'Бесплатный Wi-Fi на всей территории',
    'Гарантированное парковочное место (Люкс категории)',
    'Завтрак "Шведский стол" (08:00-10:00)',
    'Столовая с домашней кухней',
    'Детская анимация с опытными аниматорами',
    'Лаундж зона и аэросолярий возле бассейна (2 уровня)',
    'Пляжные полотенца в номерах',
    'Круглосуточная стойка регистрации',
    'Ежедневная уборка номеров',
    'Кулер с горячей и холодной водой',
    'Гладильная доска и утюг на этаже',
    'Детская кроватка с бельем (под запрос)'
  ],
  images: [],
  rating: 4.8,
  reviewsCount: 156,
};

// Контактная информация
export const CONTACTS: Contact[] = [
  {
    type: 'phone',
    value: '+7(988)318-48-25',
    label: 'Основной телефон',
    primary: true,
  },
  {
    type: 'phone',
    value: '8(918)276-68-26',
    label: 'Дополнительный телефон',
  },
  {
    type: 'email',
    value: 'absolute-vityazevo@mail.ru',
    label: 'Email для связи',
    primary: true,
  },
  {
    type: 'whatsapp',
    value: '+79883184825',
    label: 'WhatsApp',
  },
  {
    type: 'address',
    value: 'ул. Черноморская, 171А, п. Витязево, Анапа, Краснодарский край, 353417',
    label: 'Адрес отеля',
  },
];

// Навигация сайта
export const NAVIGATION: NavigationItem[] = [
  {
    id: 'home',
    label: 'Главная',
    path: '/',
  },
  {
    id: 'rooms',
    label: 'Номера',
    path: '/rooms',
  },
  {
    id: 'contacts',
    label: 'Контакты',
    path: '/contacts',
  },
  {
    id: 'booking',
    label: 'Бронирование',
    path: '/booking',
  },
];

// Социальные сети
export const SOCIAL_LINKS = {
  vk: 'https://vk.com/absolut_vityazevo',
  instagram: 'https://instagram.com/absolut_vityazevo',
  whatsapp: 'https://wa.me/79883184825',
};

// Рабочие часы
export const WORKING_HOURS = {
  reception: '24/7',
  breakfast: '8:00 - 10:00',
  pool: '8:00 - 21:00',
  animation: '9:00 - 20:00',
};

// Акции отеля - новая система с подарочными днями
export const HOTEL_PROMOTIONS = {
  // Акция "Больше дней - больше подарков"
  freeNights: [
    {
      minNights: 7,
      freeNights: 1,
      description: 'При бронировании на 7 дней - 1 день в подарок!'
    },
    {
      minNights: 10,
      freeNights: 2,
      description: 'При бронировании на 10 дней - 2 дня в подарок!'
    },
    {
      minNights: 20,
      freeNights: 4,
      description: 'При бронировании на 20 дней - 4 дня в подарок!'
    }
  ],
  // Функция для получения количества подарочных дней
  getFreeNights: (totalNights: number): number => {
    if (totalNights >= 20) return 4;
    if (totalNights >= 10) return 2;
    if (totalNights >= 7) return 1;
    return 0;
  },
  // Функция для получения описания акции
  getPromotionDescription: (totalNights: number): string | null => {
    const freeNights = HOTEL_PROMOTIONS.getFreeNights(totalNights);
    if (freeNights > 0) {
      return `При бронировании на ${totalNights} ${totalNights === 1 ? 'день' : totalNights < 5 ? 'дня' : 'дней'} - ${freeNights} ${freeNights === 1 ? 'день' : freeNights < 5 ? 'дня' : 'дней'} в подарок!`;
    }
    return null;
  }
};

// Категории номеров с реальными данными (убрал все скидки)
export const ROOM_CATEGORIES: Room[] = [
  {
    id: 'standard',
    name: 'Стандарт',
    type: 'standard',
    description: 'Две раздельные кровати или большая двуспальная кровать и дополнительное место в виде раскладного кресла. Идеально для пар или небольших семей.',
    size: 20,
    capacity: {
      adults: 2,
      children: 1,
      total: 3,
    },
    amenities: [
      'Кондиционер', 'Телевизор', 'Холодильник', 'Wi-Fi', 'Балкон', 'Санузел с душем', 'Фен', 'Завтрак включен'
    ],
    images: [
      '/images/rooms/standard/1.jpeg',
      '/images/rooms/standard/2.jpeg',
      '/images/rooms/standard/3.webp',
      '/images/rooms/standard/4.jpeg',
      '/images/rooms/standard/5.jpeg',
      '/images/rooms/standard/6.webp',
      '/images/rooms/standard/7.webp'
    ],
    price: {
      basePrice: 3500,
      currency: 'RUB',
      pricePerNight: true,
    },
    availability: true,
    features: [],
  },
  {
    id: 'standard-deluxe',
    name: 'Стандарт Делюкс',
    type: 'standard',
    description: 'Улучшенный номер с большой двуспальной кроватью и дополнительным местом в виде раскладного кресла. Отличается новой мебелью и стильным дизайном.',
    size: 20,
    capacity: {
      adults: 2,
      children: 1,
      total: 3,
    },
    amenities: [
      'Кондиционер', 'Телевизор', 'Холодильник', 'Wi-Fi', 'Балкон', 'Санузел с душем', 'Фен', 'Завтрак включен', 'Улучшенная мебель'
    ],
    images: [
       '/images/rooms/standard-deluxe/1.webp',
       '/images/rooms/standard-deluxe/2.jpeg',
       '/images/rooms/standard-deluxe/3.jpeg',
       '/images/rooms/standard-deluxe/4.jpeg',
       '/images/rooms/standard-deluxe/5.webp',
       '/images/rooms/standard-deluxe/6.jpeg',
       '/images/rooms/standard-deluxe/7.jpeg',
       '/images/rooms/standard-deluxe/8.jpeg'
    ],
    price: {
      basePrice: 4000,
      currency: 'RUB',
      pricePerNight: true,
    },
    availability: true,
    features: [],
  },
  {
    id: 'family',
    name: 'Семейный',
    type: 'family',
    description: 'Просторный номер с большой двуспальной кроватью, одной полуторной кроватью и раскладным креслом. Отлично подходит для семей с детьми.',
    size: 25,
    capacity: {
      adults: 3,
      children: 1,
      total: 4,
    },
    amenities: [
      'Кондиционер', 'Телевизор', 'Холодильник', 'Wi-Fi', 'Балкон', 'Санузел с душем', 'Фен', 'Завтрак включен', 'Больше пространства'
    ],
    images: [
       '/images/rooms/family/1.webp',
       '/images/rooms/family/2.jpeg',
       '/images/rooms/family/3.webp',
       '/images/rooms/family/4.jpeg',
       '/images/rooms/family/5.jpeg',
       '/images/rooms/family/6.jpeg'
    ],
    price: {
      basePrice: 5000,
      currency: 'RUB',
      pricePerNight: true,
    },
    availability: true,
    features: [],
  },
  {
    id: 'family-deluxe',
    name: 'Семейный Делюкс',
    type: 'family',
    description: 'Премиальный семейный номер с большой двуспальной кроватью, полуторной кроватью и раскладным креслом. Наслаждайтесь прекрасным видом с балкона.',
    size: 25,
    capacity: {
      adults: 3,
      children: 1,
      total: 4
    },
    amenities: [
      'Кондиционер', 'Телевизор', 'Холодильник', 'Wi-Fi', 'Балкон с хорошим обзором', 'Санузел с душем', 'Фен', 'Завтрак включен', 'Премиум мебель'
    ],
    images: [
      '/images/rooms/family-deluxe/1.webp',
      '/images/rooms/family-deluxe/2.jpeg',
      '/images/rooms/family-deluxe/3.jpeg',
      '/images/rooms/family-deluxe/4.webp',
      '/images/rooms/family-deluxe/5.jpeg',
      '/images/rooms/family-deluxe/6.webp',
      '/images/rooms/family-deluxe/7.jpeg'
    ],
    price: {
      basePrice: 5500,
      currency: 'RUB',
      pricePerNight: true,
    },
    availability: true,
    features: [],
  },
  {
    id: 'lux',
    name: 'Люкс',
    type: 'suite',
    description: 'Роскошные двухкомнатные апартаменты с большой двуспальной кроватью и диваном. Идеальный выбор для тех, кто ценит комфорт и пространство.',
    size: 40,
    capacity: {
      adults: 2,
      children: 3,
      total: 5,
    },
    amenities: [
  'Кондиционер', 'Телевизор', 'Холодильник', 'Wi-Fi', 'Балкон', 'Санузел с душем', 'Фен', 'Завтрак включен', 'Гарантированная парковка', 'Две комнаты'
    ],
    images: [
      '/images/rooms/lux/1.webp',
      '/images/rooms/lux/2.webp',
      '/images/rooms/lux/3.jpeg',
      '/images/rooms/lux/4.webp',
      '/images/rooms/lux/5.jpeg',
      '/images/rooms/lux/6.jpeg',
      '/images/rooms/lux/7.jpeg',
      '/images/rooms/lux/8.jpeg'
    ],
    price: {
      basePrice: 7000,
      currency: 'RUB',
      pricePerNight: true,
    },
    availability: true,
    features: [],
  },
  {
    id: 'lux-perfect',
    name: 'Люкс Перфект',
    type: 'suite',
    description: 'Двухкомнатные апартаменты премиум класса. Большая двуспальная кровать, диван и дополнительное место в виде раскладного кресла',
    size: 40,
    capacity: {
      adults: 3,
      children: 2,
      total: 5
    },
    amenities: [
      'Кондиционер',
      'Телевизор',
      'Холодильник',
      'Wi-Fi',
      'Балкон с панорамным видом',
      'Санузел с душем',
      'Фен',
      'Завтрак включен',
      'Гарантированная парковка',
      'Две комнаты',
      'Премиум интерьер'
    ],
    images: [
      '/images/rooms/lux-perfect/1.webp',
      '/images/rooms/lux-perfect/2.jpeg',
      '/images/rooms/lux-perfect/3.jpeg',
      '/images/rooms/lux-perfect/4.jpeg',
      '/images/rooms/lux-perfect/5.jpeg',
      '/images/rooms/lux-perfect/6.jpeg'
    ],
    price: {
        basePrice: 8000,
        currency: 'RUB',
        pricePerNight: true,
    },
    availability: true,
    features: [],
  }
];

// Услуги отеля
export const HOTEL_SERVICES = [
  {
    category: 'Питание',
    items: [
      'Завтрак "Шведский стол" (08:00-10:00)',
      'Столовая с домашней кухней',
      'Приемлемые цены и вкусная еда',
      'Детское питание',
      'Мини-бар (за доп. плату)'
    ],
  },
  {
    category: 'Для детей',
    items: [
      'Детская игровая площадка с безопасным покрытием',
      'Детская анимация с опытными аниматорами', 
      'Детский бассейн (лягушатник)',
      'Детская кроватка с бельем (под запрос)',
      'Дети до 3 лет включительно - бесплатно'
    ],
  },
  {
    category: 'Пляж и бассейн',
    items: [
      'Подогреваемый открытый бассейн (26-28°C)',
      'Лаундж зона с шезлонгами (2 уровня)',
      'Аэросолярий возле бассейна',
      'Пляжные полотенца в номерах',
      'Центральный пляж (10 минут пешком)',
      'Работа бассейна: 8:00-21:00'
    ],
  },
  {
    category: 'Дополнительные услуги',
    items: [
      'Трансфер (встреча и проводы за доп. плату)',
      'Услуги прачечной (за доп. плату)',
      'Круглосуточная стойка регистрации',
      'Ежедневная уборка номеров',
      'Гладильная доска и утюг на этаже',
      'Кулер с горячей и холодной водой'
    ],
  },
];

// Преимущества отеля
export const HOTEL_ADVANTAGES = [
  {
    title: 'Центр Витязево',
    description: '10 минут пешком до центрального пляжа. Все развлечения, магазины, кафе в шаговой доступности',
    icon: 'map-pin',
  },
  {
    title: 'Подогреваемый бассейн',
    description: 'Комфортная температура воды 26-28°C с циркуляцией и фильтрацией. Работает с 8:00 до 21:00',
    icon: 'waves',
  },
  {
    title: 'Семейная атмосфера',
    description: 'Домашний уют и приветливый персонал. Детская анимация и безопасная игровая площадка',
    icon: 'heart',
  },
  {
    title: 'Для самых маленьких',
    description: 'Дети до 3 лет размещаются бесплатно. Детские кроватки, стульчики, лягушатник в бассейне',
    icon: 'baby',
  },
  {
    title: 'Вкусные завтраки',
    description: 'Шведский стол с 8:00 до 10:00. Свежая и вкусная еда в столовой с приемлемыми ценами',
    icon: 'chef-hat',
  },
  {
    title: 'Удобное расположение',
    description: 'В самом центре оживленной территории курорта. Магазины, бутики, кафе, аптеки на каждом углу',
    icon: 'map',
  },
];

// Включено в стоимость
export const INCLUDED_SERVICES = [
  'Проживание в номере выбранной категории',
  'Завтрак "Шведский стол"',
  'Посещение центрального песчаного пляжа (10 мин ходьбы)',
  'Открытый подогреваемый бассейн (26-28°C)',
  'Детская игровая площадка с безопасным покрытием',
  'Лаундж зона и аэросолярий возле бассейна',
  'Круглосуточная стойка регистрации',
  'Ежедневная уборка',
  'Пляжные полотенца в номерах',
  'Кулер с горячей и холодной водой',
  'Wi-Fi на всей территории отеля',
  'Гладильная доска и утюг на этаже',
  'Гарантированная парковка (для категории Люкс)',
  'Детская кроватка с бельем (под запрос)'
];

// Отзывы гостей
export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: 1,
    author: 'Людмила Давыдова',
    text: 'Очень хороший отель, обслуживание на высоте. Мы снимали двухкомнатный номер, на 4 этаже. Чистый, уютный, с балконом. Персонал душевный, все стараются сделать твоё пребывание в отеле приятным. Сам отель находится в центре, рядом все развлечения, до моря метров 200. Рекомендую Абсолют для проживания, Ребята, вы лучшие!!!!',
    rating: 5,
    date: '2024-08-15'
  },
  {
    id: 2,
    author: 'KESSEL',
    text: 'Отличный отель, добродушный хозяин и персонал, отличный бар и отличная столовая! Расположение супер! В номере убирают на совесть, смена белья, полотенца. Бассейн с циркуляцией теплой воды и фильтрацией. В номере двуспальная кровать, односпальная кровать, кресло кровать, кондиционер, телек, санузел и душевая полноценная. СПАСИБО ВСЕМ СОТРУДНИКАМ ОТЕЛЯ!',
    rating: 5,
    date: '2024-07-22'
  },
  {
    id: 3,
    author: 'Мария Московская',
    text: 'Отдыхали в отеле этим летом. С первых минут пребывания стало находиться комфортно. Приятная атмосфера. Очень приветливый администратор. В номере много места и мебель как новая. Плюсы: столовая, бассейн, детская площадка. Отель расположен очень удобно. Всё в шаговой доступности. Нам с детьми очень понравилось. Будем рекомендовать всем знакомым!',
    rating: 5,
    date: '2024-06-10'
  },
  {
    id: 4,
    author: 'Кутузов ДВ',
    text: 'Спасибо администраторам за гостеприимство! Мы поздно приехали, но персонал оперативно нас разместил! Чистые шкафы, большие удобные кровати, телевизор, фен в душе. Качественная мебель! До моря идти 5 минут. На территории бассейн, детская площадка и аниматоры! Хорошая столовая с вкусной едой. Вернёмся!!!',
    rating: 5,
    date: '2024-09-03'
  }
];

// Анимации
export const ANIMATIONS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  }
};

// Breakpoints для адаптивности
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1400,
  '3xl': 1920,
};

// Валюта и форматирование
export const CURRENCY = {
  symbol: '₽',
  code: 'RUB',
  locale: 'ru-RU',
};

// Лимиты и ограничения
export const LIMITS = {
  maxGuestsPerRoom: 6,
  maxBookingDays: 30,
  minBookingDays: 1,
  maxAdvanceBookingDays: 365,
  maxFileUploadSize: 5 * 1024 * 1024, // 5MB
  maxImagesPerUpload: 10,
}; 