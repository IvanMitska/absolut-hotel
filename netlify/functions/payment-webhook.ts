import { Handler } from '@netlify/functions';
import crypto from 'crypto';

const YOOKASSA_SECRET_KEY = process.env.YOOKASSA_SECRET_KEY!;
const WHATSAPP_NUMBER = '79182766826'; // Номер из вашего проекта

interface YookassaNotification {
  type: string;
  event: string;
  object: {
    id: string;
    status: string;
    paid: boolean;
    amount: {
      value: string;
      currency: string;
    };
    description: string;
    metadata?: {
      bookingData?: string;
    };
  };
}

// Функция для проверки подписи от ЮКассы
function verifySignature(body: string, signature: string | null): boolean {
  if (!signature) return false;
  
  const hash = crypto
    .createHmac('sha256', YOOKASSA_SECRET_KEY)
    .update(body)
    .digest('hex');
  
  return hash === signature;
}

// Функция для отправки уведомления в WhatsApp
async function sendWhatsAppNotification(bookingData: any, paymentStatus: string) {
  const message = `💳 Оплата бронирования!

Статус: ${paymentStatus === 'succeeded' ? '✅ Успешно оплачено' : '❌ Оплата не прошла'}

Номер: ${bookingData.roomName}
Заезд: ${bookingData.checkIn}
Выезд: ${bookingData.checkOut}
Гости: ${bookingData.guests.adults} взр. ${bookingData.guests.children > 0 ? `+ ${bookingData.guests.children} реб.` : ''}

Контактные данные:
Имя: ${bookingData.customer.firstName} ${bookingData.customer.lastName}
Телефон: ${bookingData.customer.phone}
Email: ${bookingData.customer.email}
${bookingData.specialRequests ? `\nОсобые пожелания: ${bookingData.specialRequests}` : ''}`;

  // В реальном проекте здесь должна быть отправка через WhatsApp Business API
  // Для демонстрации просто логируем
  console.log('WhatsApp notification:', message);
}

export const handler: Handler = async (event) => {
  // Проверяем метод запроса
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Проверяем подпись (в production это обязательно!)
    const signature = event.headers['x-yookassa-signature'] || null;
    if (!verifySignature(event.body || '', signature)) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid signature' }),
      };
    }

    const notification: YookassaNotification = JSON.parse(event.body || '{}');
    
    // Обрабатываем только события об изменении статуса платежа
    if (notification.type === 'notification' && notification.event === 'payment.succeeded') {
      // Извлекаем данные о бронировании
      if (notification.object.metadata?.bookingData) {
        const bookingData = JSON.parse(notification.object.metadata.bookingData);
        
        // Отправляем уведомление в WhatsApp
        await sendWhatsAppNotification(bookingData, notification.object.status);
        
        // Здесь можно добавить сохранение в базу данных, отправку email и т.д.
      }
    }

    // Всегда возвращаем 200 OK для webhook
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'ok' }),
    };
  } catch (error) {
    console.error('Webhook processing error:', error);
    
    // Даже при ошибке возвращаем 200, чтобы ЮКасса не повторяла запрос
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'error processed' }),
    };
  }
};