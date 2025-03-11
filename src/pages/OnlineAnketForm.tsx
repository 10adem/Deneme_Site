import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FileText, Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PrivacyPolicyModal } from '../components/PrivacyPolicyModal';

// Form şeması
const schema = yup.object().shape({
  fullName: yup.string().required('Ad Soyad zorunludur'),
  email: yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta zorunludur'),
  phone: yup.string().required('Telefon numarası zorunludur'),
  ageGroup: yup.string().required('Yaş grubu zorunludur'),
  gender: yup.string().required('Cinsiyet zorunludur'),
  education: yup.string().required('Eğitim durumu zorunludur'),
  occupation: yup.string().required('Meslek zorunludur'),
  interests: yup.array().min(1, 'En az bir ilgi alanı seçmelisiniz'),
  surveyFrequency: yup.string().required('Anket katılım sıklığı zorunludur'),
  preferredTopics: yup.array().min(1, 'En az bir tercih edilen konu seçmelisiniz'),
  agreement: yup.boolean().oneOf([true], 'Gizlilik politikasını kabul etmelisiniz')
});

type FormData = yup.InferType<typeof schema>;

export const OnlineAnketForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    
    try {
      // Supabase'e veri gönderme
      const { error } = await supabase
        .from('online_anket_applications')
        .insert([
          { 
            full_name: data.fullName,
            email: data.email,
            phone: data.phone,
            age_group: data.ageGroup,
            gender: data.gender,
            education: data.education,
            occupation: data.occupation,
            interests: data.interests,
            survey_frequency: data.surveyFrequency,
            preferred_topics: data.preferredTopics
          }
        ]);
      
      // Hata kontrolü
      if (error) {
        console.error('Supabase hatası:', error);
        throw error;
      }
      
      // Başarılı form gönderimi
      setSubmitted(true);
      reset();
      toast.success('Başvurunuz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.');
      
    } catch (error) {
      console.error('Form gönderme hatası:', error);
      toast.error('Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Online Anket Başvuru Formu | Algoritma Araştırma</title>
        <meta name="description" content="Algoritma Araştırma online anket başvuru formu - Online anketlerimize katılmak için başvurun" />
      </Helmet>
      
      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal 
        isOpen={isPrivacyPolicyOpen} 
        onClose={() => setIsPrivacyPolicyOpen(false)} 
      />
      
      <div className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/forms" className="flex items-center gap-2 text-white hover:text-purple-200 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Tüm Formlar</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <FileText className="w-12 h-12" />
            <h1 className="text-3xl font-bold">Online Anket Başvuru Formu</h1>
          </div>
        </div>
      </div>
      
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 inline-block">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">Başvurunuz Alındı!</h2>
                <p className="text-gray-600 mb-6">
                  Online anket başvurunuz başarıyla alınmıştır. Başvurunuz incelendikten sonra sizinle iletişime geçeceğiz.
                </p>
                <div className="flex justify-center gap-4">
                  <Link
                    to="/forms"
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Formlara Dön
                  </Link>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Yeni Başvuru
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                <p className="text-gray-600 mb-8">
                  Online anketlerimize katılmak için aşağıdaki formu doldurarak başvurabilirsiniz.
                  Tüm alanları eksiksiz ve doğru bir şekilde doldurmanız değerlendirme sürecini hızlandıracaktır.
                </p>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      {...register('fullName')}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Adınız ve soyadınız"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="E-posta adresiniz"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone')}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Telefon numaranız"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700 mb-1">
                        Yaş Grubu *
                      </label>
                      <select
                        id="ageGroup"
                        {...register('ageGroup')}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors.ageGroup ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Seçiniz</option>
                        <option value="18-24">18-24</option>
                        <option value="25-34">25-34</option>
                        <option value="35-44">35-44</option>
                        <option value="45-54">45-54</option>
                        <option value="55-64">55-64</option>
                        <option value="65+">65 ve üzeri</option>
                      </select>
                      {errors.ageGroup && (
                        <p className="mt-1 text-sm text-red-600">{errors.ageGroup.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                        Cinsiyet *
                      </label>
                      <select
                        id="gender"
                        {...register('gender')}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Seçiniz</option>
                        <option value="erkek">Erkek</option>
                        <option value="kadın">Kadın</option>
                        <option value="belirtmek-istemiyorum">Belirtmek İstemiyorum</option>
                      </select>
                      {errors.gender && (
                        <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                        Eğitim Durumu *
                      </label>
                      <select
                        id="education"
                        {...register('education')}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors.education ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Seçiniz</option>
                        <option value="ilkokul">İlkokul</option>
                        <option value="ortaokul">Ortaokul</option>
                        <option value="lise">Lise</option>
                        <option value="önlisans">Önlisans</option>
                        <option value="lisans">Lisans</option>
                        <option value="yüksek-lisans">Yüksek Lisans</option>
                        <option value="doktora">Doktora</option>
                      </select>
                      {errors.education && (
                        <p className="mt-1 text-sm text-red-600">{errors.education.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                        Meslek *
                      </label>
                      <input
                        type="text"
                        id="occupation"
                        {...register('occupation')}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors.occupation ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Mesleğiniz"
                      />
                      {errors.occupation && (
                        <p className="mt-1 text-sm text-red-600">{errors.occupation.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      İlgi Alanları *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="interest-technology"
                          value="technology"
                          {...register('interests')}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="interest-technology" className="ml-2 text-sm text-gray-700">
                          Teknoloji
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="interest-health"
                          value="health"
                          {...register('interests')}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="interest-health" className="ml-2 text-sm text-gray-700">
                          Sağlık
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="interest-finance"
                          value="finance"
                          {...register('interests')}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="interest-finance" className="ml-2 text-sm text-gray-700">
                          Finans
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="interest-education"
                          value="education"
                          {...register('interests')}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="interest-education" className="ml-2 text-sm text-gray-700">
                          Eğitim
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="interest-food"
                          value="food"
                          {...register('interests')}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="interest-food" className="ml-2 text-sm text-gray-700">
                          Gıda
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="interest-travel"
                          value="travel"
                          {...register('interests')}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="interest-travel" className="ml-2 text-sm text-gray-700">
                          Seyahat
                        </label>
                      </div>
                    </div>
                    {errors.interests && (
                      <p className="mt-1 text-sm text-red-600">{errors.interests.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="surveyFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                      Anket Katılım Sıklığı *
                    </label>
                    <select
                      id="surveyFrequency"
                      {...register('surveyFrequency')}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${errors.surveyFrequency ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Seçiniz</option>
                      <option value="günlük">Günlük</option>
                      <option value="haftalık">Haftalık</option>
                      <option value="aylık">Aylık</option>
                      <option value="nadiren">Nadiren</option>
                    </select>
                    {errors.surveyFrequency && (
                      <p className="mt-1 text-sm text-red-600">{errors.surveyFrequency.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tercih Ettiğiniz Anket Konuları *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="topic-consumer"
                          value="consumer"
                          {...register('preferredTopics')}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="topic-consumer" className="ml-2 text-sm text-gray-700">
                          Tüketici Davranışları
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="topic-product"
                          value="product"
                          {...register('preferredTopics')}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="topic-product" className="ml-2 text-sm text-gray-700">
                          Ürün Değerlendirme
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="topic-market"
                          value="market"
                          {...register('preferredTopics')}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="topic-market" className="ml-2 text-sm text-gray-700">
                          Pazar Araştırması
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="topic-social"
                          value="social"
                          {...register('preferredTopics')}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="topic-social" className="ml-2 text-sm text-gray-700">
                          Sosyal Konular
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="topic-political"
                          value="political"
                          {...register('preferredTopics')}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="topic-political" className="ml-2 text-sm text-gray-700">
                          Politik Araştırmalar
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="topic-academic"
                          value="academic"
                          {...register('preferredTopics')}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="topic-academic" className="ml-2 text-sm text-gray-700">
                          Akademik Araştırmalar
                        </label>
                      </div>
                    </div>
                    {errors.preferredTopics && (
                      <p className="mt-1 text-sm text-red-600">{errors.preferredTopics.message}</p>
                    )}
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agreement"
                        type="checkbox"
                        {...register('agreement')}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreement" className="font-medium text-gray-700">
                        Kişisel verilerimin işlenmesine ilişkin <a href="#" onClick={(e) => {
                          e.preventDefault();
                          setIsPrivacyPolicyOpen(true);
                        }} className="text-purple-600 hover:underline">gizlilik politikasını</a> okudum ve kabul ediyorum. *
                      </label>
                      {errors.agreement && (
                        <p className="mt-1 text-sm text-red-600">{errors.agreement.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Başvuruyu Gönder
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}; 