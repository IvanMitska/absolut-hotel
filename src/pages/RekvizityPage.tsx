import React from 'react';

const RekvizityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-primary-900 mb-8 text-center">
          Реквизиты
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            <div className="border-b border-neutral-200 pb-6">
              <h2 className="text-xl font-semibold text-primary-800 mb-4">
                Индивидуальный предприниматель
              </h2>
              <p className="text-lg text-neutral-800 font-medium">
                Амиршина Ольга Владимировна
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wide mb-1">
                    ИНН
                  </h3>
                  <p className="text-lg text-neutral-800 font-mono">
                    235212542810
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wide mb-1">
                    ОГРНИП
                  </h3>
                  <p className="text-lg text-neutral-800 font-mono">
                    324237500429202
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wide mb-1">
                    Адрес
                  </h3>
                  <p className="text-lg text-neutral-800">
                    г. Анапа, п. Витязево, ул. Примерная, 1
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wide mb-1">
                    E-mail
                  </h3>
                  <p className="text-lg text-neutral-800">
                    <a 
                      href="mailto:absolute-hotel-vityazevo@mail.ru"
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      absolute-hotel-vityazevo@mail.ru
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekvizityPage;