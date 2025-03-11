import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { BlogPost, SurveyResult } from '../types';
import { Calendar, Loader, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import DOMPurify from 'dompurify';

export const Research = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [surveys, setSurveys] = useState<SurveyResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, surveysResponse] = await Promise.all([
          supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
          supabase.from('survey_results').select('*').order('created_at', { ascending: false })
        ]);

        if (postsResponse.data) setPosts(postsResponse.data);
        
        // Resim URL'lerini kontrol et ve düzelt
        if (surveysResponse.data) {
          console.log("Araştırma sonuçları:", surveysResponse.data);
          
          const processedSurveys = surveysResponse.data.map(survey => {
            // Eğer image_url varsa ve tam URL değilse, tam URL'ye dönüştür
            if (survey.image_url && !survey.image_url.startsWith('http')) {
              const { data } = supabase.storage
                .from('images') // bucket adını doğru kullanın
                .getPublicUrl(survey.image_url);
              
              return {
                ...survey,
                image_url: data.publicUrl
              };
            }
            return survey;
          });
          
          setSurveys(processedSurveys);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Realtime subscription
    const postsSubscription = supabase
      .channel('blog_posts_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' }, fetchData)
      .subscribe();

    const surveysSubscription = supabase
      .channel('survey_results_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'survey_results' }, fetchData)
      .subscribe();

    return () => {
      postsSubscription.unsubscribe();
      surveysSubscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader className="w-12 h-12 text-blue-600" />
            </motion.div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Veriler Yükleniyor</h3>
          <p className="text-gray-600">
            En güncel araştırma sonuçlarımız ve blog yazılarımız hazırlanıyor. Lütfen bekleyin...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Araştırmalarımız | Algoritma Araştırma</title>
        <meta name="description" content="Algoritma Araştırma'nın yaptığı araştırmalar, anketler ve analizler" />
      </Helmet>
      
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-20">
          {/* Blog Posts Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Son Blog Yazıları
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link to={`/blog/${post.id}`} key={post.id}>
                  <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <img
                      src={post.image_url || undefined}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(post.created_at).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          {/* Survey Results Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Son Araştırma Sonuçları
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {surveys.map((survey) => (
                <motion.div
                  key={survey.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {survey.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={survey.image_url} 
                        alt={survey.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                        onError={(e) => {
                          console.error("Resim yüklenemedi:", survey.image_url);
                          e.currentTarget.src = 'https://placehold.co/300x200?text=Resim+Yok';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{survey.title}</h3>
                    
                    {/* HTML içeriğini güvenli bir şekilde render edelim */}
                    <div className="text-gray-600 mb-4 prose prose-sm max-h-24 overflow-hidden">
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: DOMPurify.sanitize(
                            // İçeriği kısaltmak için
                            survey.description.length > 150 
                              ? survey.description.substring(0, 150) + '...' 
                              : survey.description
                          ) 
                        }}
                      />
                    </div>
                    
                    <Link 
                      to={`/research/${survey.id}`} 
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                    >
                      Devamını Oku
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};