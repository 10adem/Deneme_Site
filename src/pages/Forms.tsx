import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, UserCheck, FileText, Users } from 'lucide-react';

export const Forms = () => {
  const navigate = useNavigate();
  
  // Form kartları için veri
  const formCards = [
    {
      id: 'anketor',
      title: 'Anketör Başvuru Formu',
      description: 'Saha araştırmalarında görev almak için anketör başvuru formunu doldurun.',
      icon: <ClipboardList className="w-12 h-12 text-blue-600" />,
      path: '/forms/anketor'
    },
    {
      id: 'gizli-musteri',
      title: 'Gizli Müşteri Başvuru Formu',
      description: 'Gizli müşteri programımıza katılmak için başvuru formunu doldurun.',
      icon: <UserCheck className="w-12 h-12 text-green-600" />,
      path: '/forms/gizli-musteri'
    },
    {
      id: 'online-anket',
      title: 'Online Anket Başvuru Formu',
      description: 'Online anketlerimize katılmak için başvuru formunu doldurun.',
      icon: <FileText className="w-12 h-12 text-purple-600" />,
      path: '/forms/online-anket'
    },
    {
      id: 'kalitatif',
      title: 'Kalitatif Başvuru Formu',
      description: 'Odak grup çalışmaları ve derinlemesine görüşmeler için başvuru formunu doldurun.',
      icon: <Users className="w-12 h-12 text-orange-600" />,
      path: '/forms/kalitatif'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Başvuru Formlarımız | Algoritma Araştırma</title>
        <meta name="description" content="Algoritma Araştırma başvuru formları - Anketör, gizli müşteri, online anket ve kalitatif araştırma başvuruları" />
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Başvuru Formlarımız</h1>
          <p className="text-xl max-w-2xl">
            Araştırma projelerimizde yer almak için aşağıdaki başvuru formlarından size uygun olanı doldurabilirsiniz.
          </p>
        </div>
      </div>
      
      {/* Form Cards Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {formCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
                onClick={() => navigate(card.path)}
              >
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">{card.title}</h3>
                  <p className="text-gray-600 text-center">{card.description}</p>
                </div>
                <div className="bg-gray-50 px-6 py-3">
                  <button 
                    className="w-full text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    onClick={() => navigate(card.path)}
                  >
                    Başvur
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Info Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Neden Bize Katılmalısınız?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Algoritma Araştırma A.Ş. olarak, sektörde lider konumumuzla birlikte çalışan ekip arkadaşlarımıza 
              esnek çalışma saatleri, rekabetçi ücretler ve profesyonel gelişim fırsatları sunuyoruz. 
              Araştırma projelerimizde görev alarak değerli deneyimler kazanabilirsiniz.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Esnek Çalışma</h3>
                <p className="text-gray-600">Kendi programınıza göre çalışma imkanı</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Rekabetçi Ücretler</h3>
                <p className="text-gray-600">Sektörün üzerinde ödeme politikası</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold mb-2">Profesyonel Gelişim</h3>
                <p className="text-gray-600">Eğitim ve kariyer fırsatları</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 