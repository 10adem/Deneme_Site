import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Contact = () => {
  return (
    <>
      <Helmet>
        <title>İletişim | Algoritma Araştırma</title>
        <meta name="description" content="Algoritma Araştırma A.Ş. ile iletişime geçin. Adres, telefon ve e-posta bilgilerimiz." />
      </Helmet>
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              İletişime Geçin
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Sorularınız, önerileriniz veya işbirliği talepleriniz için bizimle iletişime geçebilirsiniz.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">İletişim Bilgilerimiz</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Telefon</h3>
                      <div className="space-y-1">
                        <a href="tel:+902122889096" className="text-gray-600 hover:text-blue-600 transition-colors block">
                          +90 (212) 288 9096
                        </a>
                        <a href="tel:+905326894406" className="text-gray-600 hover:text-blue-600 transition-colors block">
                          +90 532 689 4406
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">E-posta</h3>
                      <a href="mailto:info@algoritmaarastirma.com.tr" className="text-gray-600 hover:text-blue-600 transition-colors">
                        info@algoritmaarastirma.com.tr
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Adres</h3>
                      <p className="text-gray-600">
                        Mecidiyeköy Mah. Eski Osmanlı Sok.No:4 /A Blok Dilan<br />
                        Sitesi Kat:7 D:13 Şişli/İSTANBUL
                      </p>
                      <a 
                        href="https://maps.google.com/?q=Mecidiyeköy+Mah.+Eski+Osmanlı+Sok.No:4+/A+Blok+Dilan+Sitesi+Kat:7+D:13+Şişli/İSTANBUL" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 mt-2 font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Google Maps'te Aç
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Çalışma Saatleri</h3>
                      <p className="text-gray-600">
                        Pazartesi - Cuma: 09:00 - 18:00<br />
                        Hafta sonu: Kapalı
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <Link 
                    to="/get-quote" 
                    className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Teklif Almak İçin Tıklayın
                  </Link>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Bizi Ziyaret Edin</h2>
                  <p className="text-gray-600 mb-4">
                    Ofisimiz Mecidiyeköy'de, İstanbul'un merkezi bir konumunda yer almaktadır.
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 mb-6">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">Mecidiyeköy Mah. Eski Osmanlı Sok. No:4</span>
                  </div>
                </div>
                
                <div className="flex-grow relative">
                  <div className="absolute inset-0 shadow-inner">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.0989247000135!2d28.990843!3d41.067938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab703f3f37b63%3A0x7c76f68ceaa95096!2zTWVjaWRpeWVrw7Z5LCBFc2tpIE9zbWFubMSxIFNrLiBObzo0LCAzNDM4NyDFn2nFn2xpL8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1709641844045!5m2!1str!2str" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="filter contrast-[1.05] brightness-[1.02]"
                    ></iframe>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 border-t border-blue-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">Yol Tarifi Mi Lazım?</h3>
                      <p className="text-gray-600 text-sm mt-1">Google Maps üzerinden kolayca yol tarifi alabilirsiniz</p>
                    </div>
                    <a 
                      href="https://maps.google.com/?q=Mecidiyeköy+Mah.+Eski+Osmanlı+Sok.No:4+/A+Blok+Dilan+Sitesi+Kat:7+D:13+Şişli/İSTANBUL" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Yol Tarifi Al
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};