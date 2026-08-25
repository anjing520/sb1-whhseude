import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Advantages from '@/components/Advantages';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import BottomCTA from '@/components/BottomCTA';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import AuthPage from '@/components/AuthPage';
import AdminLayout from '@/components/AdminLayout';
import RequireAdmin from '@/components/RequireAdmin';
import AdminQuoteList from '@/components/AdminQuoteList';
import AdminQuoteDetail from '@/components/AdminQuoteDetail';

function HomePage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuote = () => setQuoteOpen(true);

  return (
    <div className="min-h-screen bg-white">
      <Header onQuote={openQuote} />
      <main>
        <Hero onQuote={openQuote} />
        <Services />
        <Advantages />
        <Process />
        <Testimonials />
        <BottomCTA onQuote={openQuote} />
      </main>
      <Footer />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/signin" element={<AuthPage mode="signin" />} />
          <Route path="/admin/signup" element={<AuthPage mode="signup" />} />
          <Route
            path="/admin/quote-requests"
            element={
              <RequireAdmin>
                <AdminLayout>
                  <AdminQuoteList />
                </AdminLayout>
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/quote-requests/:id"
            element={
              <RequireAdmin>
                <AdminLayout>
                  <AdminQuoteDetail />
                </AdminLayout>
              </RequireAdmin>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
