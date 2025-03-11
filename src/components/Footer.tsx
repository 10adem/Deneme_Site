import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import algoritmaLogo from '../assets/algoritma_logo.png';

export const Footer = () => {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = React.useState(false);
  
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <PrivacyPolicyModal 
        isOpen={isPrivacyPolicyOpen} 
        onClose={() => setIsPrivacyPolicyOpen(false)} 
      />
      
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Hakkımızda */}
            <div>
              <div className="mb-6">
                {/* Logo */}
                <img 
                  src={algoritmaLogo} 
                  alt="Algoritma Araştırma Logo" 
                  className="h-48" 
                />
              </div>
              <p className="text-gray-400 mb-4">
                Pazar araştırmaları ve veri analizi konusunda uzmanlaşmış, müşterilerimize değer katan çözümler sunan bir araştırma şirketiyiz.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/share/15NAQH4CeA/?mibextid=qi2Omg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://x.com/algoritmaar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="https://www.instagram.com/algoritmaarastirma_/?igsh=MzNiNTN1OGw2cDhr#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://www.linkedin.com/in/mahmut-kalkan-98b747b0/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            {/* Hızlı Linkler */}
            <div>
              <h3 className="text-xl font-bold mb-4">Hızlı Linkler</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors">Ana Sayfa</Link>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</Link>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <Link to="/services" className="text-gray-400 hover:text-white transition-colors">Hizmetlerimiz</Link>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <Link to="/forms" className="text-gray-400 hover:text-white transition-colors">Başvuru Formları</Link>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <Link to="/get-quote" className="text-gray-400 hover:text-white transition-colors">Teklif Alın</Link>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">İletişim</Link>
                </li>
              </ul>
            </div>
            
            {/* Başvuru Formları */}
            <div>
              <h3 className="text-xl font-bold mb-4">Başvuru Formları</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <Link to="/forms/anketor" className="text-gray-400 hover:text-white transition-colors">Anketör Başvurusu</Link>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <Link to="/forms/gizli-musteri" className="text-gray-400 hover:text-white transition-colors">Gizli Müşteri Başvurusu</Link>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <Link to="/forms/online-anket" className="text-gray-400 hover:text-white transition-colors">Online Anket Başvurusu</Link>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <Link to="/forms/kalitatif" className="text-gray-400 hover:text-white transition-colors">Kalitatif Başvuru</Link>
                </li>
              </ul>
            </div>
            
            {/* İletişim */}
            <div>
              <h3 className="text-xl font-bold mb-4">İletişim</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin size={20} className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-gray-400 block">
                    Mecidiyeköy Mah. Eski Osmanlı Sok.No:4 /A Blok Dilan<br />
                    Sitesi Kat:7 D:13 Şişli/İSTANBUL
                    </span>
                    <a 
                      href="https://maps.google.com/?q=Mecidiyeköy+Mah.+Eski+Osmanlı+Sok.No:4+/A+Blok+Dilan+Sitesi+Kat:7+D:13+Şişli/İSTANBUL" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm flex items-center mt-1"
                    >
                      Google Maps'te göster
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                </li>
                <li className="flex items-center">
                  <Phone size={20} className="text-gray-400 mr-2 flex-shrink-0" />
                  <a href="tel:+02122889096" className="text-gray-400 hover:text-white transition-colors">
                    +90 (212) 288 90 96
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone size={20} className="text-gray-400 mr-2 flex-shrink-0" />
                  <a href="tel:+05326894406" className="text-gray-400 hover:text-white transition-colors">
                    +90 (532) 689 44 06
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail size={20} className="text-gray-400 mr-2 flex-shrink-0" />
                  <a href="mailto:info@algoritmaarastirma.com.tr" className="text-gray-400 hover:text-white transition-colors">
                    info@algoritmaarastirma.com.tr
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <hr className="border-gray-800 my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Algoritma Araştırma A.Ş. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6">
              <button 
                onClick={() => setIsPrivacyPolicyOpen(true)}
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                Gizlilik Politikası
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}; 