import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Gizlilik Politikası</h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 text-gray-700">
                <h3 className="text-lg font-semibold mb-3">1. Giriş</h3>
                <p className="mb-4">
                  Algoritma Araştırma A.Ş. (web sitesi adresi: https://algoritmaarastirma.com.tr) işinizi ve güveninizi takdir eder. Türkiye merkezli bir şirket olarak, pazar araştırma ve veri analizi hizmetleri sunmaktayız. Hizmetlerimizi kullanabilmeniz için lütfen bu Gizlilik Politikasını okuyun.
                </p>
                
                <h3 className="text-lg font-semibold mb-3">2. Toplanan Veriler</h3>
                <h4 className="font-medium mb-2">Veri Depolama Konumu</h4>
                <p className="mb-3">
                  Türkiye merkezli bir şirket olarak, Türkiye'de barındırılan web sunucularını işletiyoruz. Hosting sağlayıcımız, verilerinizin güvenli bir şekilde saklanmasını ve KVKK'ya uygun olmasını sağlar.
                </p>
                
                <h4 className="font-medium mb-2">Kayıt Verileri</h4>
                <p className="mb-3">
                  Web sitemizde kayıt olursanız, seçtiğiniz kullanıcı adınızı, e-posta adresinizi ve kullanıcı profilinize eklenen diğer kişisel bilgileri saklarız. Kişisel bilgilerinizi istediğiniz zaman görebilir, düzenleyebilir veya silebilirsiniz (kullanıcı adınızı değiştirmek hariç). Web sitesi yöneticileri de bu bilgileri görebilir ve düzenleyebilir.
                </p>
                
                <h4 className="font-medium mb-2">Başvuru Verileri</h4>
                <p className="mb-3">
                  Anketör, gizli müşteri, online anket veya kalitatif araştırma başvurusu yaptığınızda, formda sağladığınız bilgiler sistemimizde saklanır. Bu bilgiler, başvurunuzu değerlendirmek ve sizinle iletişime geçmek için kullanılır.
                </p>
                
                <h4 className="font-medium mb-2">İletişim Formu</h4>
                <p className="mb-3">
                  Web sitemizdeki iletişim formu aracılığıyla gönderilen bilgiler şirket e-postamıza gönderilir. Bu gönderimler yalnızca müşteri hizmetleri amacıyla saklanır, pazarlama amaçlı kullanılmaz veya üçüncü taraflarla paylaşılmaz.
                </p>
                
                <h4 className="font-medium mb-2">Google Analytics</h4>
                <p className="mb-3">
                  Web sitemizde anonim site kullanım raporlaması için Google Analytics kullanıyoruz. Dolayısıyla, kişiselleştirilmiş veri saklanmaz. Web sitemizde davranışınızın Google Analytics tarafından izlenmesini istemiyorsanız, lütfen şu bağlantıyı kullanın: Google Analytics Devre Dışı Bırakma.
                </p>
                
                <h3 className="text-lg font-semibold mb-3">3. Kişisel Verilerin Kullanım Amaçları</h3>
                <p className="mb-3">Kişisel bilgilerinizi aşağıdaki durumlarda kullanırız:</p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>Web sitesi kullanımı sırasında kullanıcının doğrulanması/tanımlanması;</li>
                  <li>Teknik Destek Sağlama;</li>
                  <li>Kullanıcılarımıza önemli bilgilerle haberler/değişiklikler hakkında bilgi vermek için güncellemeler gönderme;</li>
                  <li>Müşterilerimizin kişisel bilgileri üzerindeki güvenliği sağlamak ve dolandırıcılık işlemleri önlemek için hesap etkinliğini kontrol etme;</li>
                  <li>Deneyiminizi daha kişisel ve ilgi çekici hale getirmek için web sitesini özelleştirme;</li>
                  <li>Genel performansı ve idari işlevleri sorunsuz bir şekilde garanti etme.</li>
                </ul>
                
                <h3 className="text-lg font-semibold mb-3">4. Çerezler</h3>
                <p className="mb-4">
                  Bu site, siteye daha iyi bir kullanıcı deneyimi sağlamasına yardımcı olan küçük metin dosyaları olan çerezleri kullanır. Genel olarak çerezler, kullanıcı tercihlerini korumak, alışveriş sepetleri gibi şeyler için bilgi saklamak ve Google Analytics gibi üçüncü taraf uygulamalara anonimleştirilmiş izleme verileri sağlamak için kullanılır. Çerezler genellikle tarama deneyiminizi daha iyi hale getirmek için vardır. Ancak, bu sitede ve diğerlerinde çerezleri devre dışı bırakmayı tercih edebilirsiniz. Bunu yapmanın en etkili yolu, tarayıcınızda çerezleri devre dışı bırakmaktır. Tarayıcınızın yardım bölümüne başvurmanızı öneririz.
                </p>
                
                <h3 className="text-lg font-semibold mb-3">5. Verilerinize Kimler Erişebilir</h3>
                <p className="mb-4">
                  Sitemiz için kayıtlı bir müşteri değilseniz, sizinle ilgili saklayabileceğimiz veya görüntüleyebileceğimiz kişisel bilgi yoktur. Kayıtlı bir hesaba sahip bir müşteriyseniz, kişisel bilgilerinize şu kişiler erişebilir:
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>Sistem yöneticilerimiz.</li>
                  <li>Destek ekibimiz, müşteri hesapları ve erişimi hakkında bilgi almak gerektiğinde (destek sağlamak amacıyla).</li>
                </ul>
                
                <h3 className="text-lg font-semibold mb-3">6. Verilerinizin Üçüncü Taraf Erişimi</h3>
                <p className="mb-4">
                  Verilerinizi, e-posta, ad vb. gibi kişisel bilgilerinizi açığa çıkaracak şekilde üçüncü taraflarla paylaşmıyoruz. Bu kuralın tek istisnaları, sizden beklediğiniz hizmetleri sağlamak için sınırlı verileri paylaşmamız gereken ortaklardır.
                </p>
                
                <h3 className="text-lg font-semibold mb-3">7. Verilerinizi Ne Kadar Süre Saklarız</h3>
                <p className="mb-4">
                  Bir destek bileti veya yorum gönderdiğinizde, kaldırmanızı söyleyene kadar meta verileri saklanır. Bu verileri, sizi tanıyabilmemiz ve yorumlarınızı moderasyon için bekletmek yerine otomatik olarak onaylayabilmemiz için kullanıyoruz. Web sitemizde kayıt olursanız, kullanıcı profilinizde sağladığınız kişisel bilgileri de saklarız. Kişisel bilgilerinizi istediğiniz zaman görebilir, düzenleyebilir veya silebilirsiniz (kullanıcı adınızı değiştirmek hariç). Web sitesi yöneticileri de bu bilgileri görebilir ve düzenleyebilir.
                </p>
                
                <h3 className="text-lg font-semibold mb-3">8. Güvenlik Önlemleri</h3>
                <p className="mb-4">
                  Tüm sitemizde SSL/HTTPS protokolünü kullanıyoruz. Bu, kullanıcı iletişimlerimizi sunucularla şifreler, böylece kişisel olarak tanımlanabilir bilgiler üçüncü taraflarca izinsiz olarak yakalanmaz/ele geçirilmez. Veri ihlali durumunda, sistem yöneticileri derhal sistem bütünlüğünü sağlamak için gereken tüm adımları atacak, etkilenen kullanıcılarla iletişime geçecek ve gerekirse şifreleri sıfırlamaya çalışacaktır.
                </p>
                
                <h3 className="text-lg font-semibold mb-3">9. Veri Haklarınız</h3>
                <h4 className="font-medium mb-2">Genel Haklar</h4>
                <p className="mb-3">
                  Bu web sitesinde kayıtlı bir hesabınız varsa veya yorum bıraktıysanız, bize sağladığınız ek veriler dahil olmak üzere sakladığımız kişisel verilerin dışa aktarılmış bir dosyasını talep edebilirsiniz. Ayrıca, sakladığımız kişisel verilerin silinmesini de talep edebilirsiniz. Bu, idari, yasal veya güvenlik amaçları için saklamak zorunda olduğumuz verileri içermez. Kısacası, aktif bir müşteri olmanız için hayati önem taşıyan verileri (örneğin, e-posta adresi gibi temel hesap bilgileri) silemeyiz. Tüm verilerinizin silinmesini isterseniz, size herhangi bir destek veya diğer ürünle ilgili hizmetleri sunmaya devam edemeyeceğiz.
                </p>
                
                <h4 className="font-medium mb-2">KVKK Hakları</h4>
                <p className="mb-3">
                  Gizliliğiniz bizim için son derece önemlidir. İleriye dönük olarak KVKK standardını desteklemeyi amaçlıyoruz. Algoritma Araştırma A.Ş., Türkiye Cumhuriyeti vatandaşlarının Hizmetini kullanmasına izin verir. Bu nedenle, Algoritma Araştırma A.Ş.'nin Kişisel Verilerin Korunması Kanunu'na uyması amaçlanmaktadır.
                </p>
                
                <h3 className="text-lg font-semibold mb-3">10. Üçüncü Taraf Web Siteleri</h3>
                <p className="mb-4">
                  Algoritma Araştırma A.Ş., bu web sitesinde üçüncü taraf web sitelerine bağlantılar yayınlayabilir. Bu üçüncü taraf web siteleri, Algoritma Araştırma A.Ş. tarafından gizlilik veya güvenlik uyumluluğu açısından taranmaz ve bu üçüncü taraf web sitelerinin davranışlarından dolayı bizi her türlü sorumluluktan muaf tutarsınız. Tüm sosyal medya paylaşım bağlantıları, ister metin bağlantıları olarak görüntülensin ister sosyal medya simgeleri olarak görüntülensin, açıkça üzerlerine tıklamadığınız sürece sizi ilişkili üçüncü taraflardan herhangi birine bağlamaz. Lütfen bu Gizlilik Politikasının ve yürürlükte olan diğer politikaların, herhangi bir değişikliğin yanı sıra, üçüncü taraflar tarafından uygulanabilir haklar yaratmadığını veya Hizmet veya Site üyelerine ilişkin herhangi bir kişisel bilginin açıklanmasını gerektirmediğini unutmayın. Algoritma Araştırma, herhangi bir reklamveren veya üçüncü taraf web sitesi tarafından toplanan veya kullanılan bilgilerden sorumlu değildir. Lütfen üçüncü taraf bağlantıları aracılığıyla ziyaret ettiğiniz her site için gizlilik politikasını ve hizmet şartlarını inceleyin.
                </p>
                
                <h3 className="text-lg font-semibold mb-3">11. Yasal Amaçlar İçin Verilerinizin Açıklanması</h3>
                <p className="mb-4">
                  Zaman zaman Algoritma Araştırma A.Ş. için, yasal amaçlar için, bir devlet kurumundan veya özel bir davacıdan gelen bir talebe yanıt olarak bilgilerinizi açıklamak gerekli veya arzu edilir hale gelebilir. Bir hukuk davası, cezai soruşturma veya diğer yasal konular amacıyla iyi niyetle gerekli olduğuna inandığımız durumlarda bilgilerinizi üçüncü bir tarafa açıklayabileceğimizi kabul edersiniz. Gizliliğinizi etkileyen bir celp aldığımız durumda, celbi reddetmek için bir dilekçe sunma fırsatı vermek için sizi bilgilendirmeyi seçebiliriz veya kendimiz reddetmeye çalışabiliriz, ancak bunların hiçbirini yapmak zorunda değiliz. Ayrıca, dolandırıcılık faaliyetlerinde bulunduğunuza dair inancımız gibi yasal nedenlerle, bilgilerinizi üçüncü taraflara proaktif olarak bildirebilir ve açıklayabiliriz. Bizi, bilgilerinizin kolluk kuvvetleri kurumlarından veya özel davacılardan gelen bir talebe açıklanmasından kaynaklanabilecek veya ilgili olabilecek herhangi bir zarardan muaf tutarsınız. Yasal amaçlar için kişisel verilerin herhangi bir şekilde aktarılması, yalnızca ikamet ettiğiniz ülkenin yasalarına uygun olarak yapılacaktır.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 