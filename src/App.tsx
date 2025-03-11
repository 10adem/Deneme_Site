import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Home } from './pages/Home';
import { Research } from './pages/Research';
import { Contact } from './pages/Contact';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Admin } from './pages/Admin';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { BlogDetail } from './pages/BlogDetail';
import { SurveyDetail } from './pages/SurveyDetail';
import { HelmetProvider } from 'react-helmet-async';
import algoritmaLogo from './assets/algoritmaLogo.png';
import { GetQuote } from './pages/GetQuote';
import { Footer } from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { Forms } from './pages/Forms';
import { AnketorForm } from './pages/AnketorForm';
import { GizliMusteriForm } from './pages/GizliMusteriForm';
import { OnlineAnketForm } from './pages/OnlineAnketForm';
import { KalitatifForm } from './pages/KalitatifForm';
// Gelecekte kullanılacak
// import { ProtectedRoute } from './components/ProtectedRoute';

// Aktif link için özel bir bileşen oluşturalım
const NavLink = ({ to, children, onClick }: { to: string, children: React.ReactNode, onClick?: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`transition-colors ${
        isActive 
          ? "text-blue-600 font-bold text-lg" 
          : "text-gray-700 hover:text-blue-600"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

// Sayfa değiştiğinde en üste kaydırma bileşeni
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Admin sayfalarında navbar ve footer'ı gösterme
  const isAdminPage = location.pathname === '/admin' || location.pathname === '/login';

  // Menüyü kapatmak için yeni fonksiyon
  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-base md:text-lg flex flex-col">
      {/* Navbar - Admin sayfalarında gösterme */}
      {!isAdminPage && (
        <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img 
                  src={algoritmaLogo} 
                  alt="Algoritma Logo" 
                  className="h-48 w-auto object-contain" 
                />
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                <NavLink to="/">
                  Ana Sayfa
                </NavLink>
                <NavLink to="/about">
                  Hakkımızda
                </NavLink>
                <NavLink to="/services">
                  Hizmetlerimiz
                </NavLink>
                <NavLink to="/research">
                  Araştırmalar
                </NavLink>
                <NavLink to="/forms">
                  Kariyer
                </NavLink>
                <NavLink to="/contact">
                  İletişim
                </NavLink>
                <Link 
                  to="/get-quote" 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Teklif Alın
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t">
                <div className="flex flex-col gap-4">
                  <NavLink to="/" onClick={handleMenuClick}>
                    Ana Sayfa
                  </NavLink>
                  <NavLink to="/about" onClick={handleMenuClick}>
                    Hakkımızda
                  </NavLink>
                  <NavLink to="/services" onClick={handleMenuClick}>
                    Hizmetlerimiz
                  </NavLink>
                  <NavLink to="/research" onClick={handleMenuClick}>
                    Araştırmalar
                  </NavLink>
                  <NavLink to="/forms" onClick={handleMenuClick}>
                    Kariyer
                  </NavLink>
                  <NavLink to="/contact" onClick={handleMenuClick}>
                    İletişim
                  </NavLink>
                  <Link 
                    to="/get-quote"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full text-center"
                    onClick={handleMenuClick}
                  >
                    Teklif Alın
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      )}

      {/* Main Content - Admin sayfalarında padding-top kaldır */}
      <main className={`${!isAdminPage ? 'pt-20' : ''} flex-grow`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/:id" element={<SurveyDetail />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route path="/forms" element={<Forms />} />
          <Route path="/forms/anketor" element={<AnketorForm />} />
          <Route path="/forms/gizli-musteri" element={<GizliMusteriForm />} />
          <Route path="/forms/online-anket" element={<OnlineAnketForm />} />
          <Route path="/forms/kalitatif" element={<KalitatifForm />} />
          <Route path="*" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                <div className="mb-6">
                  <span className="text-9xl font-bold text-blue-600">404</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Sayfa Bulunamadı</h1>
                <p className="text-gray-600 mb-8">
                  Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                </p>
                <Link 
                  to="/" 
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Ana Sayfaya Dön
                </Link>
              </div>
            </div>
          } />
        </Routes>
      </main>

      {/* Footer - Admin sayfalarında gösterme */}
      {!isAdminPage && <Footer />}

      {/* WhatsApp Button - Admin sayfalarında gösterme */}
      {!isAdminPage && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#FFFFFF',
                color: '#333333',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '12px 16px',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#FFFFFF',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#FFFFFF',
                },
              },
              loading: {
                iconTheme: {
                  primary: '#3B82F6',
                  secondary: '#FFFFFF',
                },
              },
            }}
          />
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;