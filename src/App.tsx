import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import BookingPage from './pages/BookingPage';
import ContactsPage from './pages/ContactsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import PaymentResultPage from './pages/PaymentResultPage';
import RekvizityPage from './pages/RekvizityPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ScrollToTop from './utils/ScrollToTop';
import { MobileMenuProvider } from './contexts/MobileMenuContext';

// Создаем экземпляр QueryClient для React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Временные компоненты для страниц (будут созданы позже)

const ServicesPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-primary-900 mb-4">Услуги</h1>
      <p className="text-neutral-600">Страница находится в разработке</p>
    </div>
  </div>
);







const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-primary-900 mb-4">404</h1>
      <p className="text-xl text-neutral-600 mb-8">Страница не найдена</p>
      <a
        href="/"
        className="btn-primary inline-flex items-center justify-center"
      >
        Вернуться на главную
      </a>
    </div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <MobileMenuProvider>
          <ScrollToTop />
          <div className="App">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="rooms" element={<RoomsPage />} />
                <Route path="rooms/:id" element={<RoomDetailPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="booking" element={<BookingPage />} />
                <Route path="payment-result" element={<PaymentResultPage />} />
                <Route path="rekvizity" element={<RekvizityPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </div>
        </MobileMenuProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
