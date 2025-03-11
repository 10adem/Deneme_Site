import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Award, TrendingUp, Target, Clock, CheckCircle } from 'lucide-react';
import kurucuFotografi from '../assets/front.jpg'; // Kurucu fotoğrafı import edildi

export const About = () => {
  return (
    <div className="about-page">
      <Helmet>
        <title>Hakkımızda | Algoritma Araştırma</title>
        <meta name="description" content="Algoritma Araştırma A.Ş. hakkında bilgi edinin. Vizyonumuz, misyonumuz ve değerlerimiz." />
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
              Hakkımızda
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              Algoritma Araştırma A.Ş., 2010 yılından bu yana pazar araştırması ve veri analizi alanında uzmanlaşmış, 
              müşterilerine değer katan çözümler sunan bir araştırma şirketidir.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Ekip Hakkında Daha Fazla Bilgi */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Deneyimli Ekibimiz</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Algoritma Araştırma'nın başarısının arkasında, alanında uzman ve deneyimli bir ekip bulunmaktadır. 
                Ekibimiz, pazar araştırması, veri analizi, istatistik ve stratejik danışmanlık konularında 
                geniş bilgi ve tecrübeye sahiptir.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Her bir ekip üyemiz, müşterilerimizin ihtiyaçlarını anlamak ve onlara en uygun çözümleri 
                sunmak için çalışmaktadır. Sürekli eğitim ve gelişim programlarımız sayesinde, 
                ekibimiz her zaman sektördeki en son trendleri ve teknolojileri takip etmektedir.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  Pazar araştırması uzmanları
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  Veri analisti ve istatistikçiler
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  Stratejik danışmanlar
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                  Saha araştırma ekibi
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gray-100 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Neden Biz?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-blue-600 p-1 rounded-full text-white mt-1 mr-3">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Deneyim</h4>
                      <p className="text-gray-600">10+ yıllık sektör deneyimi</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-600 p-1 rounded-full text-white mt-1 mr-3">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Uzman Kadro</h4>
                      <p className="text-gray-600">Alanında uzman profesyonel ekip</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-600 p-1 rounded-full text-white mt-1 mr-3">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Müşteri Memnuniyeti</h4>
                      <p className="text-gray-600">%95+ müşteri memnuniyet oranı</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-600 p-1 rounded-full text-white mt-1 mr-3">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Özel Çözümler</h4>
                      <p className="text-gray-600">Her müşteriye özel araştırma tasarımı</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Ekip Fotoğrafı Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-xl overflow-hidden shadow-xl"
          >
            {/* 
            <img 
              src={ekipFotografi} 
              alt="Algoritma Araştırma Ekibi" 
              className="w-full h-auto object-cover"
            />
            */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Profesyonel Ekibimiz</h2>
                <p className="text-lg opacity-90">
                  Deneyimli ve uzman kadromuzla müşterilerimize en iyi hizmeti sunmak için çalışıyoruz.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Misyon & Vizyon */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-blue-50 rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-600 p-3 rounded-lg text-white">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Misyonumuz</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Müşterilerimize, bilimsel yöntemlerle elde edilmiş veriler ve analizler sunarak, 
                onların daha doğru kararlar almasına yardımcı olmak ve iş süreçlerini iyileştirmelerine 
                katkıda bulunmaktır.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-blue-50 rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-600 p-3 rounded-lg text-white">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Vizyonumuz</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Türkiye'nin en güvenilir ve yenilikçi araştırma şirketi olmak, 
                global standartlarda hizmet sunarak müşterilerimizin başarısına katkıda bulunmak ve 
                sektörde öncü uygulamalara imza atmaktır.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Değerlerimiz */}
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
              Değerlerimiz
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Algoritma Araştırma A.Ş. olarak, tüm çalışmalarımızda bizi yönlendiren temel değerlerimiz vardır.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-6 h-6" />,
                title: "Kalite",
                description: "Her projede en yüksek kalite standartlarını sağlamak için çalışıyoruz."
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Güvenilirlik",
                description: "Müşterilerimize her zaman güvenilir ve doğru veriler sunmayı taahhüt ediyoruz."
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Zamanında Teslimat",
                description: "Projelerimizi her zaman zamanında ve eksiksiz olarak teslim ediyoruz."
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Müşteri Odaklılık",
                description: "Müşterilerimizin ihtiyaçlarını anlamak ve onlara özel çözümler sunmak önceliğimizdir."
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Yenilikçilik",
                description: "Sürekli olarak yeni metodolojiler ve teknolojiler geliştirerek sektörde öncü olmayı hedefliyoruz."
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: "Tarafsızlık",
                description: "Tüm araştırmalarımızda objektif ve tarafsız bir yaklaşım benimsiyoruz."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="bg-blue-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Kurucumuz Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 mb-10 text-center"
          >
            KURUCUMUZ
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-xl border-4 border-white">
                <img 
                  src={kurucuFotografi} 
                  alt="Mahmut Kalkan" 
                  className="w-full h-[490px] object-cover object-top"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">MAHMUT KALKAN</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
              Mahmut Kalkan, araştırma sektöründe 20 yıla yakın deneyimiyle veri odaklı analiz ve stratejik danışmanlık hizmetleri sunmaktadır. Pazar araştırmaları, kamuoyu analizleri, müşteri ve çalışan memnuniyeti ölçümleri gibi geniş bir alanda uzmanlaşarak araştırma projelerinin tasarım, uygulama, analiz ve raporlama süreçlerini titizlikle yönetmektedir.<br/>
              <br/>
              Özellikle siyasi danışmanlık alanında, kamuoyu araştırmaları, seçmen eğilim analizleri ve veri temelli strateji geliştirme konularında etkin rol oynayarak seçim süreçleri için bilimsel ve uygulanabilir çözümler sunmaktadır. Aynı zamanda kurumsal araştırmalarla işletmelere veriye dayalı içgörüler sağlayarak stratejik karar alma süreçlerini desteklemektedir.<br/>
              <br/>
              Güçlü analitik yaklaşımı ve stratejik vizyonuyla, araştırma ve danışmanlık alanında güvenilir ve etkili çözümler üretmeye devam etmektedir.
              </p>
              <div className="flex space-x-4">
                <div className="bg-blue-100 px-4 py-2 rounded-lg">
                  <span className="font-semibold text-blue-800">Analiz</span>
                </div>
                <div className="bg-blue-100 px-4 py-2 rounded-lg">
                  <span className="font-semibold text-blue-800">Raporlama</span>
                </div>
                <div className="bg-blue-100 px-4 py-2 rounded-lg">
                  <span className="font-semibold text-blue-800">Siyasi Danışmanlık</span>
                </div>
              </div>
            </motion.div>
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
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg shadow-lg"
              >
                Teklif Alın
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}; 