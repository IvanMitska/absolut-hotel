import { Handler } from '@netlify/functions';
import axios from 'axios';
import crypto from 'crypto';

const YOOKASSA_SHOP_ID = process.env.YOOKASSA_SHOP_ID!;
const YOOKASSA_SECRET_KEY = process.env.YOOKASSA_SECRET_KEY!;

interface PaymentRequestBody {
  amount: number;
  description: string;
  bookingData: {
    roomId: string;
    roomName: string;
    checkIn: string;
    checkOut: string;
    guests: {
      adults: number;
      children: number;
    };
    customer: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    specialRequests?: string;
  };
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
    const body: PaymentRequestBody = JSON.parse(event.body || '{}');
    
    // Генерируем уникальный идентификатор для платежа
    const idempotenceKey = crypto.randomUUID();
    
    // Формируем данные для создания платежа
    const paymentData = {
      amount: {
        value: body.amount.toFixed(2),
        currency: 'RUB'
      },
      description: body.description,
      confirmation: {
        type: 'redirect',
        return_url: `${process.env.URL || 'https://absolute-hotel-vityazevo.ru'}/payment-result`
      },
      capture: true,
      metadata: {
        bookingData: JSON.stringify(body.bookingData)
      }
    };

    // Создаем платеж в ЮКассе
    const response = await axios.post(
      'https://api.yookassa.ru/v3/payments',
      paymentData,
      {
        headers: {
          'Idempotence-Key': idempotenceKey,
          'Content-Type': 'application/json'
        },
        auth: {
          username: YOOKASSA_SHOP_ID,
          password: YOOKASSA_SECRET_KEY
        }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        paymentId: response.data.id,
        confirmationUrl: response.data.confirmation.confirmation_url,
        status: response.data.status
      }),
    };
  } catch (error) {
    console.error('Payment creation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to create payment',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};