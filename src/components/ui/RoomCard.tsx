import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Home, ArrowRight, Gift } from 'lucide-react';
import type { Room } from '../../types';

interface RoomCardProps {
  room: Room;
  index: number;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/rooms/${room.id}`} className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-700 hover:-translate-y-2 block">
        <div className="h-64 bg-gradient-to-br from-primary-400 to-primary-600 relative overflow-hidden">
          <img src={room.images[0] || '/images/hero/hotel-exterior.jpg'} alt={room.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-ocean-gradient opacity-80"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-60" />
              <p className="text-lg font-semibold">{room.name}</p>
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Gift className="w-3 h-3" />
            Акция
          </div>
        </div>

        <div className="p-8">
          <p className="text-neutral-600 mb-6">{room.description}</p>
          
          <div className="flex justify-between items-center text-sm mb-6">
            <div className="flex items-center gap-2 text-neutral-700">
              <Users className="w-5 h-5 text-primary-600" />
              <span>до {room.capacity.total} гостей</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <Home className="w-5 h-5 text-primary-600" />
              <span>{room.size} м²</span>
            </div>
          </div>
          
          <div className="border-t border-neutral-200 pt-6 flex justify-between items-center">
            <div>
              <span className="text-sm text-neutral-500">от</span>
              <p className="text-3xl font-bold text-primary-700">{room.price.basePrice.toLocaleString('ru-RU')} ₽</p>
            </div>
            <div className="btn-primary text-sm inline-flex items-center">
              <span>Подробнее</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RoomCard; 