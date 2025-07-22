import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary-900 mb-8 text-center">
          Пользовательское соглашение
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              1. Общие положения
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между 
              Индивидуальным предпринимателем Амиршиной Ольгой Владимировной (ИНН: 235212542810, 
              ОГРНИП: 324237500429202) и пользователем веб-сайта отеля «Абсолют» в отношении 
              использования сайта и предоставляемых услуг размещения.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              Используя данный сайт, вы соглашаетесь с условиями настоящего Соглашения.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              2. Услуги отеля
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Отель «Абсолют» предоставляет услуги временного размещения гостей в гостиничных номерах 
              по адресу: ул. Черноморская, 171А, п. Витязево, Анапа, Краснодарский край.
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2">
              <li>Размещение в номерах различных категорий</li>
              <li>Дополнительные услуги (при наличии)</li>
              <li>Консультации по размещению и отдыху</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              3. Правила бронирования и размещения
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p><strong>3.1.</strong> Бронирование номеров осуществляется через сайт или по телефону.</p>
              <p><strong>3.2.</strong> Для бронирования необходимо указать достоверную информацию.</p>
              <p><strong>3.3.</strong> Заезд осуществляется с 14:00, выезд до 12:00.</p>
              <p><strong>3.4.</strong> При заезде необходимо предъявить документ, удостоверяющий личность.</p>
              <p><strong>3.5.</strong> Размещение детей до 5 лет без предоставления отдельного места — бесплатно.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              4. Оплата услуг
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p><strong>4.1.</strong> Оплата может производиться наличными или безналичным способом.</p>
              <p><strong>4.2.</strong> При онлайн-бронировании возможна предоплата через платежные системы.</p>
              <p><strong>4.3.</strong> Цены на услуги размещения устанавливаются в рублях РФ.</p>
              <p><strong>4.4.</strong> В случае отказа от бронирования менее чем за 24 часа до заезда, предоплата не возвращается.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              5. Права и обязанности сторон
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p><strong>Отель обязуется:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Предоставить номер в соответствии с бронированием</li>
                <li>Обеспечить безопасность проживания</li>
                <li>Соблюдать конфиденциальность персональных данных гостей</li>
              </ul>
              
              <p><strong>Гость обязуется:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Соблюдать правила проживания в отеле</li>
                <li>Бережно относиться к имуществу отеля</li>
                <li>Своевременно производить оплату услуг</li>
                <li>Не нарушать покой других гостей</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              6. Ответственность
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p><strong>6.1.</strong> За утрату или повреждение имущества гостей отель несет ответственность в соответствии с законодательством РФ.</p>
              <p><strong>6.2.</strong> Гость несет материальную ответственность за ущерб, причиненный имуществу отеля.</p>
              <p><strong>6.3.</strong> Отель не несет ответственности за несчастные случаи, произошедшие по вине гостя.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              7. Защита персональных данных
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              Отель обязуется обрабатывать персональные данные гостей в соответствии с требованиями 
              Федерального закона «О персональных данных» № 152-ФЗ. Подробнее в 
              <a href="/privacy" className="text-primary-600 hover:text-primary-700 underline">
                Политике конфиденциальности
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              8. Разрешение споров
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              Все споры разрешаются путем переговоров. В случае недостижения соглашения, 
              споры подлежат разрешению в судебном порядке по месту нахождения отеля 
              в соответствии с законодательством РФ.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              9. Контактная информация
            </h2>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <p className="text-neutral-700 mb-2">
                <strong>ИП Амиршина Ольга Владимировна</strong>
              </p>
              <p className="text-neutral-700 mb-1">ИНН: 235212542810</p>
              <p className="text-neutral-700 mb-1">ОГРНИП: 324237500429202</p>
              <p className="text-neutral-700 mb-1">
                Адрес: ул. Черноморская, 171А, п. Витязево, Анапа, Краснодарский край
              </p>
              <p className="text-neutral-700 mb-1">
                E-mail: 
                <a 
                  href="mailto:absolute-hotel-vityazevo@mail.ru" 
                  className="text-primary-600 hover:text-primary-700"
                >
                  absolute-hotel-vityazevo@mail.ru
                </a>
              </p>
            </div>
          </div>

          <div className="text-sm text-neutral-500 pt-4 border-t">
            <p>Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;