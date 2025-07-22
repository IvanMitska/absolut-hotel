import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary-900 mb-8 text-center">
          Политика конфиденциальности
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              1. Общие положения
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Настоящая Политика конфиденциальности определяет порядок обработки персональных данных 
              пользователей сайта отеля «Абсолют» Индивидуальным предпринимателем 
              Амиршиной Ольгой Владимировной (ИНН: 235212542810, ОГРНИП: 324237500429202).
            </p>
            <p className="text-neutral-700 leading-relaxed">
              Мы уважаем конфиденциальность наших гостей и обязуемся защищать их персональные данные 
              в соответствии с требованиями Федерального закона «О персональных данных» № 152-ФЗ.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              2. Какие данные мы собираем
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              При бронировании номеров и использовании наших услуг мы можем собирать следующую информацию:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2">
              <li>Фамилия, имя, отчество</li>
              <li>Номер телефона</li>
              <li>Адрес электронной почты</li>
              <li>Данные документа, удостоверяющего личность</li>
              <li>Информация о предпочтениях в размещении</li>
              <li>Данные о посещении сайта (cookies, IP-адрес, информация о браузере)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              3. Цели обработки персональных данных
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Мы обрабатываем ваши персональные данные в следующих целях:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2">
              <li>Обработка бронирований и предоставление гостиничных услуг</li>
              <li>Связь с гостями по вопросам бронирования и размещения</li>
              <li>Выполнение требований законодательства РФ</li>
              <li>Улучшение качества наших услуг</li>
              <li>Информирование о специальных предложениях (с вашего согласия)</li>
              <li>Обеспечение безопасности и защиты интересов отеля</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              4. Правовые основания обработки
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p><strong>4.1.</strong> Исполнение договора на предоставление гостиничных услуг</p>
              <p><strong>4.2.</strong> Согласие субъекта персональных данных</p>
              <p><strong>4.3.</strong> Выполнение требований законодательства РФ</p>
              <p><strong>4.4.</strong> Защита жизненно важных интересов субъекта или третьих лиц</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              5. Срок хранения персональных данных
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p>Персональные данные хранятся в течение следующих сроков:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Данные о бронированиях — 3 года после окончания размещения</li>
                <li>Документы, связанные с размещением иностранных граждан — в соответствии с требованиями миграционного законодательства</li>
                <li>Маркетинговые данные — до отзыва согласия</li>
                <li>Данные cookie — до 2 лет</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              6. Передача персональных данных третьим лицам
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p>Мы можем передавать ваши персональные данные третьим лицам в следующих случаях:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Государственным органам в рамках их полномочий</li>
                <li>Платежным системам для обработки платежей</li>
                <li>IT-провайдерам для технической поддержки сайта</li>
                <li>При получении вашего явного согласия</li>
              </ul>
              <p className="mt-4">
                <strong>Мы не продаем и не передаем ваши персональные данные для рекламных целей третьих лиц.</strong>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              7. Защита персональных данных
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p>Для защиты ваших персональных данных мы применяем следующие меры:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Шифрование данных при передаче (SSL-сертификаты)</li>
                <li>Ограничение доступа к персональным данным</li>
                <li>Регулярное обновление систем безопасности</li>
                <li>Обучение персонала правилам обработки персональных данных</li>
                <li>Резервное копирование и восстановление данных</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              8. Ваши права
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p>В отношении ваших персональных данных вы имеете право на:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Получение информации о обработке персональных данных</li>
                <li>Доступ к своим персональным данным</li>
                <li>Уточнение, исправление или дополнение персональных данных</li>
                <li>Удаление персональных данных</li>
                <li>Отзыв согласия на обработку персональных данных</li>
                <li>Обращение в Роскомнадзор с жалобой</li>
              </ul>
              <p className="mt-4">
                Для реализации своих прав обратитесь к нам по электронной почте: 
                <a 
                  href="mailto:absolute-hotel-vityazevo@mail.ru" 
                  className="text-primary-600 hover:text-primary-700"
                >
                  absolute-hotel-vityazevo@mail.ru
                </a>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              9. Использование cookies
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                Наш сайт использует cookies для улучшения пользовательского опыта, 
                анализа посещаемости и персонализации контента.
              </p>
              <p>
                Вы можете управлять настройками cookies в своем браузере. Однако отключение 
                cookies может ограничить функциональность сайта.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              10. Изменения в Политике конфиденциальности
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. 
              Актуальная версия всегда доступна на данной странице. Существенные изменения будут 
              дополнительно доведены до сведения пользователей.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary-800 mb-4">
              11. Контактная информация
            </h2>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <p className="text-neutral-700 mb-2">
                <strong>Оператор персональных данных:</strong>
              </p>
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
              <p className="text-neutral-700">
                Телефон: +7 (918) 276-68-26
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

export default PrivacyPage;