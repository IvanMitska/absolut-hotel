import { Hotel, Contact, NavigationItem } from '../types';

// Основная информация об отеле
export const HOTEL_INFO: Hotel = {
  id: 'absolut-vityazevo',
  name: 'Отель "Абсолют"',
  description: 'Современный семейный отель в Витязево с подогреваемым бассейном и домашней атмосферой. Идеальное место для семейного отдыха у моря.',
  address: 'ул. Черноморская, 171А, Витязево, Краснодарский край',
  phone: '+7 (861) 234-56-78',
  email: 'info@absolute-vityazevo.ru',
  coordinates: {
    lat: 45.0048,
    lng: 37.2572,
  },
  amenities: [
    'Подогреваемый открытый бассейн',
    'Детская игровая площадка',
    'Бесплатный Wi-Fi',
    'Парковка',
    'Кафе-бар',
    'Столовая',
    'Детская комната',
    'Терраса для загара',
    'Пляжные полотенца',
    'Круглосуточная стойка регистрации'
  ],
  images: [],
  rating: 4.5,
  reviewsCount: 127,
};

// Контактная информация
export const CONTACTS: Contact[] = [
  {
    type: 'phone',
    value: '+7 (861) 234-56-78',
    label: 'Основной телефон',
    primary: true,
  },
  {
    type: 'phone',
    value: '+7 (918) 123-45-67',
    label: 'Мобильный телефон',
  },
  {
    type: 'email',
    value: 'info@absolute-vityazevo.ru',
    label: 'Email для связи',
    primary: true,
  },
  {
    type: 'email',
    value: 'booking@absolute-vityazevo.ru',
    label: 'Email для бронирования',
  },
  {
    type: 'whatsapp',
    value: '+79181234567',
    label: 'WhatsApp',
  },
  {
    type: 'telegram',
    value: '@absolut_vityazevo',
    label: 'Telegram',
  },
  {
    type: 'address',
    value: 'ул. Черноморская, 171А, Витязево, Краснодарский край, 353417',
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
    id: 'services',
    label: 'Услуги',
    path: '/services',
  },
  {
    id: 'gallery',
    label: 'Галерея',
    path: '/gallery',
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
  telegram: 'https://t.me/absolut_vityazevo',
  whatsapp: 'https://wa.me/79181234567',
};

// Рабочие часы
export const WORKING_HOURS = {
  reception: '24/7',
  restaurant: '8:00 - 22:00',
  bar: '10:00 - 23:00',
  pool: '7:00 - 22:00',
  kidsRoom: '9:00 - 21:00',
};

// Удобства номеров
export const ROOM_AMENITIES = [
  'Кондиционер',
  'Телевизор',
  'Холодильник',
  'Wi-Fi',
  'Балкон',
  'Санузел с душем',
  'Фен',
  'Постельное белье',
  'Полотенца',
  'Мебель',
  'Сушка для белья',
];

// Услуги отеля
export const HOTEL_SERVICES = [
  {
    category: 'Питание',
    items: [
      'Завтрак (шведский стол)',
      'Обед (домашняя кухня)',
      'Ужин (по меню)',
      'Детское меню',
      'Диетическое питание',
      'Барное меню',
    ],
  },
  {
    category: 'Для детей',
    items: [
      'Детская игровая площадка',
      'Детская комната с аниматором',
      'Детский бассейн',
      'Прокат детских принадлежностей',
      'Детские стульчики',
      'Детские кроватки',
    ],
  },
  {
    category: 'Пляж и бассейн',
    items: [
      'Подогреваемый открытый бассейн',
      'Шезлонги у бассейна',
      'Пляжные полотенца',
      'Терраса для загара (2 уровня)',
      'Центральный пляж (10 мин пешком)',
      'Пляжный инвентарь',
    ],
  },
  {
    category: 'Дополнительные услуги',
    items: [
      'Трансфер от/до аэропорта',
      'Экскурсионное обслуживание',
      'Прокат велосипедов',
      'Услуги прачечной',
      'Сейф на ресепшене',
      'Медицинская помощь',
    ],
  },
];

// Преимущества отеля
export const HOTEL_ADVANTAGES = [
  {
    title: 'Первая береговая линия',
    description: 'Всего 10 минут пешком до центрального пляжа',
    icon: 'map-pin',
  },
  {
    title: 'Подогреваемый бассейн',
    description: 'Комфортная температура воды 26-28°C круглый сезон',
    icon: 'waves',
  },
  {
    title: 'Семейная атмосфера',
    description: 'Домашний уют и персональный подход к каждому гостю',
    icon: 'heart',
  },
  {
    title: 'Детская зона',
    description: 'Игровая площадка, детская комната с аниматором',
    icon: 'baby',
  },
  {
    title: 'Домашнее питание',
    description: 'Свежие блюда из качественных продуктов',
    icon: 'chef-hat',
  },
  {
    title: 'Центральное расположение',
    description: 'В шаговой доступности магазины, кафе, развлечения',
    icon: 'map',
  },
];

// Часто задаваемые вопросы
export const FAQ = [
  {
    question: 'Какое время заезда и выезда?',
    answer: 'Заезд с 14:00, выезд до 12:00. При наличии свободных номеров возможен ранний заезд или поздний выезд.',
  },
  {
    question: 'Включен ли завтрак в стоимость?',
    answer: 'Завтрак включен в стоимость всех номеров. Подается в формате "шведский стол" с 8:00 до 10:00.',
  },
  {
    question: 'Есть ли парковка?',
    answer: 'Да, у отеля есть бесплатная охраняемая парковка для гостей.',
  },
  {
    question: 'Разрешено ли размещение с животными?',
    answer: 'Размещение с домашними животными возможно по предварительному согласованию за дополнительную плату.',
  },
  {
    question: 'Есть ли трансфер от аэропорта?',
    answer: 'Трансфер предоставляется за дополнительную плату. Стоимость уточняйте при бронировании.',
  },
  {
    question: 'До скольки работает бассейн?',
    answer: 'Бассейн работает с 7:00 до 22:00. Температура воды поддерживается на уровне 26-28°C.',
  },
];

// Мета-данные для SEO
export const DEFAULT_SEO = {
  title: 'Отель "Абсолют" Витязево - Семейный отдых у моря',
  description: 'Современный семейный отель в Витязево с подогреваемым бассейном, детской комнатой и домашним питанием. Первая береговая линия. Бронирование онлайн.',
  keywords: [
    'отель витязево',
    'абсолют витязево',
    'отдых в витязево',
    'семейный отель',
    'подогреваемый бассейн',
    'детская комната',
    'береговая линия',
    'анапа отели',
    'бронирование отель',
  ],
  ogImage: '/og-image.jpg',
};

// Анимации
export const ANIMATIONS = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  slideInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
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