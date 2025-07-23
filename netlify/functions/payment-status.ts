import { Handler } from '@netlify/functions';
import axios from 'axios';

const YOOKASSA_SHOP_ID = process.env.YOOKASSA_SHOP_ID!;
const YOOKASSA_SECRET_KEY = process.env.YOOKASSA_SECRET_KEY!;

export const handler: Handler = async (event) => {
  // Проверяем метод запроса
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const paymentId = event.queryStringParameters?.paymentId;
  
  if (!paymentId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Payment ID is required' }),
    };
  }

  try {
    // Получаем информацию о платеже из ЮКассы
    const response = await axios.get(
      `https://api.yookassa.ru/v3/payments/${paymentId}`,
      {
        auth: {
          username: YOOKASSA_SHOP_ID,
          password: YOOKASSA_SECRET_KEY
        }
      }
    );

    const payment = response.data;
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        id: payment.id,
        status: payment.status,
        paid: payment.paid,
        amount: payment.amount,
        description: payment.description,
        metadata: payment.metadata
      }),
    };
  } catch (error) {
    console.error('Payment status error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to get payment status',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};