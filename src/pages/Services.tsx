import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BarChart2, Users, TrendingUp, Search, Target, 
  PieChart, LineChart, UserCheck, ShoppingBag, Award,
  Vote
} from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: <BarChart2 className="w-8 h-8" />,
      title: "Pazar ve Tüketici Araştırmaları",
      description: "Hedef kitlenizi, pazar trendlerini ve rekabet ortamını analiz ederek stratejik kararlar almanıza yardımcı oluyoruz.",
      features: ["Pazar Araştırması", "Müşteri Memnuniyeti ve Deneyimi", "Alışveriş Davranışları ve Perakende Araştırmaları", "Ürün ve Hizmet Testi Araştırmaları", "Reklam ve Marka Araştırmaları", "Marka Bilinirliği ve Algı Araştırmaları", "Marka ve İletişim Stratejileri Araştırmaları"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Kurumsal ve Çalışan Araştırmaları",
      description: "Müşterilerinizin deneyimlerini ve beklentilerini ölçerek, hizmet kalitenizi artırmanıza yardımcı oluyoruz.",
      features: ["Çalışan Memnuniyeti Araştırmaları", "Hizmet Kalitesi ve Operasyonel Verimlilik Araştırmaları", "Kurum İmajı ve İtibar Araştırmaları", "Kriz Yönetimi ve Risk Değerlendirmesi", "Kurumsal Sosyal Sorumluluk (KSS) Araştırmaları"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Teknoloji, İnovasyon ve Eğitim Araştırmaları",
      description: "Markanızın algısını, bilinirliğini ve konumlandırmasını ölçerek, marka stratejinizi güçlendirmenize yardımcı oluyoruz.",
      features: ["Eğitim Araştırmaları", "Teknoloji ve Dijital Dönüşüm Araştırmaları", "Sosyal Medya ve Dijital Analiz", "İnovasyon ve Ürün Geliştirme Araştırmaları", "İnovasyon Yönetimi ve Girişimcilik Araştırmaları", "Periyodik Trend ve Gelecek Projeksiyon Araştırmaları", "Sanat, Kültür ve Medya Araştırmaları"]
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Sosyal, Kamu ve Demografik Araştırmalar",
      description: "Yeni ürünlerinizin veya mevcut ürünlerinizin performansını test ederek, geliştirme süreçlerinize katkıda bulunuyoruz.",
      features: ["Yerel Yönetimler ve Kamu Hizmetleri", "Demografik ve Toplum Yapısı Araştırmaları", "Demografik Araştırmalar", "Çevre ve Sürdürülebilirlik Araştırmaları", "İklim Değişikliği ve Adaptasyon Araştırmaları"]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Ekonomi, Finans ve Sektörel Araştırmalar",
      description: "Hedef kitlenizin demografik, psikografik ve davranışsal özelliklerini analiz ederek, pazarlama stratejilerinizi optimize ediyoruz.",
      features: ["Finansal ve Ekonomik İçgörü Araştırmaları", "Sigorta ve Finansal Güvenlik Araştırmaları", "Gayrimenkul ve Konut Araştırmaları", "Lojistik ve Tedarik Zinciri Araştırmaları", "Telekomünikasyon ve Teknoloji Hizmetleri Araştırmaları", "Taşımacılık ve Ulaşım Araştırmaları", "Trafik ve Ulaşım Araştırmaları", "Sağlık Araştırmaları"]
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Akademik Araştırmalar",
      description: "Akademisyenlerimize akademik çalışmalarında veri toplama hizmeti vermekteyiz.",
      features: ["Lisans Tezi", "Yüksek lisans Tezi", "Doktora Tezi", "Akademik Makaleler", "Tübitak AB Projeleri"]
    },
    {
      icon: <Vote className="w-8 h-8" />,
      title: "Siyasi Araştırmalar",
      description: "Seçmen davranışlarını ve siyasi eğilimleri analiz ederek, veri odaklı stratejiler geliştirmenize ve kamuoyu beklentilerini anlamanıza yardımcı oluyoruz.",
      features: ["Siyasi Eğilim Araştırmaları", "Belediye Memnuniyet Araştırmaları", "Strateji Geliştirme Araştırmaları", "Aday Belirleme", "Belediye Performans Ölçümü"]
    }
  ];
  
  const methodologies = [
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "Nicel Araştırma",
      description: "Sayısal veriler toplayarak istatistiksel analizler yapıyoruz."
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Nitel Araştırma",
      description: "Derinlemesine görüşmeler ve odak gruplarla detaylı içgörüler elde ediyoruz."
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Gizli Müşteri",
      description: "Müşteri deneyimini objektif olarak değerlendiriyoruz."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Benchmark Analizi",
      description: "Sektördeki en iyi uygulamaları inceleyerek karşılaştırmalı analizler sunuyoruz."
    }
  ];
  
  // const politicalResearch = [
  //   {
  //     icon: <Vote className="w-10 h-10 text-blue-600" />,
  //     title: 'Siyasi Eğilim Araştırmaları',
  //     description: 'Seçmen davranışlarını ve siyasi eğilimleri analiz ederek stratejik kararlar almanıza yardımcı oluyoruz.'
  //   },
  //   {
  //     icon: <Building2 className="w-10 h-10 text-blue-600" />,
  //     title: 'Belediye Memnuniyet Araştırmaları',
  //     description: 'Vatandaşların belediye hizmetlerinden memnuniyet düzeyini ölçerek yerel yönetimlere yol gösteriyoruz.'
  //   },
  //   {
  //     icon: <TrendingUp className="w-10 h-10 text-blue-600" />,
  //     title: 'Strateji Geliştirme Araştırmaları',
  //     description: 'Veri odaklı analizlerle etkili siyasi stratejiler geliştirmenize destek oluyoruz.'
  //   },
  //   {
  //     icon: <UserCheck className="w-10 h-10 text-blue-600" />,
  //     title: 'Aday Belirleme',
  //     description: 'Potansiyel adayların seçmen nezdindeki algısını ve başarı potansiyelini ölçüyoruz.'
  //   },
  //   {
  //     icon: <Activity className="w-10 h-10 text-blue-600" />,
  //     title: 'Belediye Performans Ölçümü',
  //     description: 'Belediye hizmetlerinin etkinliğini ve performansını değerlendirerek iyileştirme alanlarını belirliyoruz.'
  //   }
  // ];
  
  return (
    <>
      <Helmet>
        <title>Hizmetlerimiz | Algoritma Araştırma</title>
        <meta name="description" content="Algoritma Araştırma'nın sunduğu pazar araştırması, müşteri memnuniyeti, marka araştırması ve diğer hizmetler." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Hizmetlerimiz
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              Algoritma Araştırma A.Ş. olarak, işletmenizin büyümesine ve gelişmesine yardımcı olacak 
              kapsamlı araştırma ve analiz hizmetleri sunuyoruz.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full max-w-md ${
                  index === services.length - 1 && services.length % 2 === 1 
                    ? "lg:col-span-3 lg:max-w-md" 
                    : ""
                }`}
              >
                <div className="p-6">
                  <div className="bg-blue-100 p-4 rounded-lg text-blue-600 inline-block mb-6">
                    {service.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Özellikler</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Siyasi Araştırmalar Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
          >
            Siyasi Araştırmalar
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-8">
            {politicalResearch.slice(0, 3).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full md:w-[calc(33%-1.5rem)]"
              >
                <div className="mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {politicalResearch.slice(3).map((item, index) => (
              <motion.div
                key={index + 3}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full md:w-[calc(50%-1rem)] max-w-md"
              >
                <div className="mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      
      {/* Methodology Section */}
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
              Araştırma Metodolojilerimiz
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Her projeye özel, bilimsel ve güvenilir araştırma yöntemleri kullanıyoruz.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {methodologies.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="bg-blue-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
                  {method.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-6"
            >
              Projeleriniz İçin Bize Ulaşın
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl mb-8 opacity-90"
            >
              Araştırma ihtiyaçlarınız için özel çözümler sunuyoruz. Hemen bizimle iletişime geçin.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                to="/get-quote" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Teklif Alın
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}; 