import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import algoritmaLogo from '../assets/algoritma_logo.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Scroll olayını dinle
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Sayfa değiştiğinde menüyü kapat
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo - Boyutları büyüttük */}
          <Link to="/" className="flex items-center">
            <img 
              src={algoritmaLogo} 
              alt="Algoritma Araştırma Logo" 
              className={`transition-all duration-300 ${isScrolled ? 'h-18' : 'h-28'}`} 
            />
          </Link>
          
          {/* Masaüstü Menü */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={`font-medium ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-600 transition-colors`}>
              Ana Sayfa
            </Link>
            <Link to="/about" className={`font-medium ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-600 transition-colors`}>
              Hakkımızda
            </Link>
            <Link to="/services" className={`font-medium ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-600 transition-colors`}>
              Hizmetlerimiz
            </Link>
            <Link to="/forms" className={`font-medium ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-600 transition-colors`}>
              Kariyer
            </Link>
            <Link to="/get-quote" className={`font-medium ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-600 transition-colors`}>
              Teklif Alın
            </Link>
            <Link to="/contact" className={`font-medium ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-600 transition-colors`}>
              İletişim
            </Link>
          </nav>
          
          {/* Mobil Menü Butonu */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menüyü Aç/Kapat"
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>
        
        {/* Mobil Menü */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="font-medium text-gray-800 hover:text-blue-600 transition-colors py-2">
                Ana Sayfa
              </Link>
              <Link to="/about" className="font-medium text-gray-800 hover:text-blue-600 transition-colors py-2">
                Hakkımızda
              </Link>
              <Link to="/services" className="font-medium text-gray-800 hover:text-blue-600 transition-colors py-2">
                Hizmetlerimiz
              </Link>
              <Link to="/forms" className="font-medium text-gray-800 hover:text-blue-600 transition-colors py-2">
                Kariyer
              </Link>
              <Link to="/get-quote" className="font-medium text-gray-800 hover:text-blue-600 transition-colors py-2">
                Teklif Alın
              </Link>
              <Link to="/contact" className="font-medium text-gray-800 hover:text-blue-600 transition-colors py-2">
                İletişim
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}; 