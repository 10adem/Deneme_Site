import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import backgroundImage from '../assets/background_foto.jpg';
import { referenceImages, qualityCertificates, homeHelpers } from '../utils/homeUtils';

// Sadece kullanılan ikonları import edelim
import { FiArrowRight } from 'react-icons/fi';

export const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Otomatik slider için useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      homeHelpers.autoSlide(currentSlide, referenceImages.length, setCurrentSlide);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  return (
    <>
      <Helmet>
        <title>Ana Sayfa | Algoritma Araştırma</title>
        <meta name="description" content="Algoritma Araştırma - Pazar araştırması ve veri analizi alanında uzmanlaşmış araştırma şirketi" />
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-6">
                Veriyi Güce, Bilgiyi Stratejiye Dönüştürün
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Algoritma Araştırma A.Ş. olarak, yalnızca veri toplamak ve analiz etmekle kalmıyor, 
                bu verilerden yeni fikirler ve stratejiler geliştiriyoruz. Hem kamu hem de özel sektörde, 
                bilgiye dayalı doğru kararlar almak için güvenilir bir temel sunuyoruz.
              </p>
              <button 
                onClick={() => navigate('/contact')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Bizimle İletişime Geçin
                <FiArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Referanslarımız Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Hizmet Verdiğimiz Kurum ve Kuruluşlar
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Birlikte çalıştığımız değerli müşterilerimiz ve başarıyla tamamladığımız projeler.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="overflow-hidden rounded-xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {referenceImages.map((image, index) => (
                  <div key={index} className="min-w-full flex items-center justify-center bg-white p-4">
                    <img 
                      src={image} 
                      alt={`Referans ${index + 1}`} 
                      className="max-h-[250px] max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Slider Göstergeleri */}
            <div className="flex justify-center mt-4 gap-2">
              {referenceImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Kalite Belgelerimiz Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Kalite Belgelerimiz
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Uluslararası standartlara uygun kalite belgelerimiz ile hizmet kalitemizi belgelendiriyoruz.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {qualityCertificates.map((belge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center mb-4">
                  <img 
                    src={belge.image} 
                    alt={belge.title} 
                    className="h-40 object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900">{belge.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};