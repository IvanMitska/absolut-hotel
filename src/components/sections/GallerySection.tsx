import React from 'react';
import { Images } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
}

const GallerySection: React.FC = () => {
  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      src: '/images/rooms/lux/1.webp',
      alt: 'Люкс номер',
      title: 'Люкс номер',
      category: 'Люкс'
    },
    {
      id: '2',
      src: '/images/rooms/standard-deluxe/1.webp',
      alt: 'Стандарт делюкс',
      title: 'Стандарт делюкс',
      category: 'Стандарт'
    },
    {
      id: '3',
      src: '/images/rooms/family/1.webp',
      alt: 'Семейный номер',
      title: 'Семейный номер',
      category: 'Семейный'
    },
    {
      id: '4',
      src: '/images/rooms/lux-perfect/1.webp',
      alt: 'Люкс перфект',
      title: 'Люкс перфект',
      category: 'Люкс'
    }
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
            Галерея отеля
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Исследуйте наши номера и территорию
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="relative group overflow-hidden rounded-xl">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center text-white p-4">
                  <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                  <p className="text-sm">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300 text-sm sm:text-base font-medium"
          >
            <Images className="w-4 h-4 sm:w-5 sm:h-5" />
            Все фото
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection; 