import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Users, Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PrivacyPolicyModal } from '../components/PrivacyPolicyModal';

// Form şeması
const schema = yup.object().shape({
  fullName: yup.string().required('Ad Soyad zorunludur'),
  email: yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta zorunludur'),
  phone: yup.string().required('Telefon numarası zorunludur'),
  city: yup.string().required('Şehir zorunludur'),
  age: yup.number().typeError('Yaş sayı olmalıdır').required('Yaş zorunludur').min(18, 'Yaşınız 18 veya üzeri olmalıdır'),
  gender: yup.string().required('Cinsiyet zorunludur'),
  education: yup.string().required('Eğitim durumu zorunludur'),
  occupation: yup.string().required('Meslek zorunludur'),
  experience: yup.string().required('Deneyim zorunludur'),
  availability: yup.string().required('Uygunluk durumu zorunludur'),
  preferredResearchTypes: yup.array().min(1, 'En az bir araştırma türü seçmelisiniz'),
  about: yup.string().required('Kendiniz hakkında bilgi zorunludur'),
  agreement: yup.boolean().oneOf([true], 'Gizlilik politikasını kabul etmelisiniz')
});

type FormData = yup.InferType<typeof schema>;

export const KalitatifForm = () => {
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
        .from('kalitatif_applications')
        .insert([
          { 
            full_name: data.fullName,
            email: data.email,
            phone: data.phone,
            city: data.city,
            age: data.age,
            gender: data.gender,
            education: data.education,
            occupation: data.occupation,
            experience: data.experience,
            availability: data.availability,
            preferred_research_types: data.preferredResearchTypes,
            about: data.about
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
        <title>Kalitatif Başvuru Formu | Algoritma Araştırma</title>
        <meta name="description" content="Algoritma Araştırma kalitatif başvuru formu - Odak grup çalışmaları ve derinlemesine görüşmeler için başvurun" />
      </Helmet>
      
      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal 
        isOpen={isPrivacyPolicyOpen} 
        onClose={() => setIsPrivacyPolicyOpen(false)} 
      />
      
      <div className="bg-gradient-to-r from-orange-800 to-orange-600 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/forms" className="flex items-center gap-2 text-white hover:text-orange-200 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Tüm Formlar</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Users className="w-12 h-12" />
            <h1 className="text-3xl font-bold">Kalitatif Başvuru Formu</h1>
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
                  Kalitatif araştırma başvurunuz başarıyla alınmıştır. Başvurunuz incelendikten sonra sizinle iletişime geçeceğiz.
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
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Yeni Başvuru
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                <p className="text-gray-600 mb-8">
                  Odak grup çalışmaları ve derinlemesine görüşmeler için aşağıdaki formu doldurarak başvurabilirsiniz.
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
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
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
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
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
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Telefon numaranız"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        Şehir *
                      </label>
                      <input
                        type="text"
                        id="city"
                        {...register('city')}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Yaşadığınız şehir"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                        Yaş *
                      </label>
                      <input
                        type="number"
                        id="age"
                        {...register('age')}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Yaşınız"
                        min="18"
                      />
                      {errors.age && (
                        <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                        Cinsiyet *
                      </label>
                      <select
                        id="gender"
                        {...register('gender')}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Seçiniz</option>
                        <option value="female">Kadın</option>
                        <option value="male">Erkek</option>
                        <option value="other">Diğer</option>
                        <option value="prefer_not_to_say">Belirtmek İstemiyorum</option>
                      </select>
                      {errors.gender && (
                        <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                        Eğitim Durumu *
                      </label>
                      <select
                        id="education"
                        {...register('education')}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.education ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Seçiniz</option>
                        <option value="primary">İlkokul</option>
                        <option value="secondary">Ortaokul</option>
                        <option value="high_school">Lise</option>
                        <option value="associate">Ön Lisans</option>
                        <option value="bachelor">Lisans</option>
                        <option value="master">Yüksek Lisans</option>
                        <option value="doctorate">Doktora</option>
                      </select>
                      {errors.education && (
                        <p className="mt-1 text-sm text-red-600">{errors.education.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                      Meslek *
                    </label>
                    <input
                      type="text"
                      id="occupation"
                      {...register('occupation')}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.occupation ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Mesleğiniz"
                    />
                    {errors.occupation && (
                      <p className="mt-1 text-sm text-red-600">{errors.occupation.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Kalitatif Araştırma Deneyimi *
                    </label>
                    <select
                      id="experience"
                      {...register('experience')}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.experience ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Seçiniz</option>
                      <option value="none">Hiç deneyimim yok</option>
                      <option value="little">Az deneyimim var (1-2 kez katıldım)</option>
                      <option value="moderate">Orta düzeyde deneyimim var (3-5 kez katıldım)</option>
                      <option value="experienced">Deneyimliyim (5+ kez katıldım)</option>
                    </select>
                    {errors.experience && (
                      <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                      Uygunluk Durumu *
                    </label>
                    <select
                      id="availability"
                      {...register('availability')}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.availability ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Seçiniz</option>
                      <option value="weekdays">Hafta içi</option>
                      <option value="weekends">Hafta sonu</option>
                      <option value="evenings">Akşam saatleri</option>
                      <option value="anytime">Her zaman</option>
                    </select>
                    {errors.availability && (
                      <p className="mt-1 text-sm text-red-600">{errors.availability.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tercih Ettiğiniz Araştırma Türleri *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="research-focus"
                          value="focus_group"
                          {...register('preferredResearchTypes')}
                          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="research-focus" className="ml-2 text-sm text-gray-700">
                          Odak Grup Çalışmaları
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="research-depth"
                          value="depth_interview"
                          {...register('preferredResearchTypes')}
                          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="research-depth" className="ml-2 text-sm text-gray-700">
                          Derinlemesine Görüşmeler
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="research-ethnographic"
                          value="ethnographic"
                          {...register('preferredResearchTypes')}
                          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="research-ethnographic" className="ml-2 text-sm text-gray-700">
                          Etnografik Araştırmalar
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="research-usability"
                          value="usability"
                          {...register('preferredResearchTypes')}
                          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="research-usability" className="ml-2 text-sm text-gray-700">
                          Kullanılabilirlik Testleri
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="research-diary"
                          value="diary"
                          {...register('preferredResearchTypes')}
                          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="research-diary" className="ml-2 text-sm text-gray-700">
                          Günlük Çalışmaları
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="research-workshop"
                          value="workshop"
                          {...register('preferredResearchTypes')}
                          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="research-workshop" className="ml-2 text-sm text-gray-700">
                          Çalıştaylar
                        </label>
                      </div>
                    </div>
                    {errors.preferredResearchTypes && (
                      <p className="mt-1 text-sm text-red-600">{errors.preferredResearchTypes.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                      Kendiniz Hakkında *
                    </label>
                    <textarea
                      id="about"
                      {...register('about')}
                      rows={4}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.about ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Kendiniz hakkında kısa bilgi veriniz"
                    ></textarea>
                    {errors.about && (
                      <p className="mt-1 text-sm text-red-600">{errors.about.message}</p>
                    )}
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agreement"
                        type="checkbox"
                        {...register('agreement')}
                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreement" className="font-medium text-gray-700">
                        Kişisel verilerimin işlenmesine ilişkin <a href="#" onClick={(e) => {
                          e.preventDefault();
                          setIsPrivacyPolicyOpen(true);
                        }} className="text-orange-600 hover:underline">gizlilik politikasını</a> okudum ve kabul ediyorum. *
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
                      className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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