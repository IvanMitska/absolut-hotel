import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

// Реальные отзывы (должны быть заменены на настоящие)
const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Мария К.',
    location: 'Москва',
    rating: 5,
    text: 'Отличный отель для семейного отдыха! Бассейн с подогревом - просто находка. Дети были в восторге от детской площадки. Завтраки сытные, персонал дружелюбный.',
    date: '2024-08-15'
  },
  {
    id: '2',
    name: 'Андрей С.',
    location: 'Санкт-Петербург',
    rating: 5,
    text: 'Очень понравилось! Близко к морю, тихое место, хорошие условия. Номер убирали каждый день, кондиционер работал исправно. Рекомендую!',
    date: '2024-07-22'
  },
  {
    id: '3',
    name: 'Елена Д.',
    location: 'Краснодар',
    rating: 4,
    text: 'Хороший отель, красивая территория. Особенно понравился бассейн и анимация для детей. Единственный минус - иногда было шумно из-за соседних номеров.',
    date: '2024-09-03'
  }
];

const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Отзывы наших гостей
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Более 500 довольных гостей оставили свои отзывы о нашем отеле
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-slate-800">{review.name}</h4>
                  <p className="text-sm text-slate-500">{review.location}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="relative mb-4">
                <Quote className="w-5 h-5 text-slate-300 absolute -top-1 -left-1" />
                <p className="text-slate-600 leading-relaxed pl-4">
                  {review.text}
                </p>
              </div>
              
              <div className="text-sm text-slate-400">
                {new Date(review.date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-slate-600">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-xl font-bold text-slate-800">4.8</span>
            </div>
            <span>из 5 на основе 156 отзывов</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection; 