import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Calendar } from 'lucide-react';
import DOMPurify from 'dompurify';

interface SurveyResult {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  created_at: string;
}

export const SurveyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<SurveyResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        if (!id) return;
        
        const { data, error } = await supabase
          .from('survey_results')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        setSurvey(data);
      } catch (error) {
        console.error('Araştırma sonucu yüklenirken hata oluştu:', error);
        setError('Araştırma sonucu bulunamadı');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSurvey();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !survey) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Araştırma sonucu bulunamadı'}</h1>
        <Link to="/research" className="text-blue-600 hover:text-blue-800">
          Araştırmalar sayfasına dön
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{survey.title} | Algoritma Araştırma</title>
        <meta name="description" content={survey.description.substring(0, 160)} />
      </Helmet>
      
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-6">
          <Link 
            to="/research" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Araştırmalar Sayfasına Dön
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {survey.image_url && (
              <div className="w-full h-80 overflow-hidden">
                <img 
                  src={survey.image_url} 
                  alt={survey.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Detay sayfasında resim yüklenemedi:", survey.image_url);
                    e.currentTarget.src = 'https://placehold.co/800x400?text=Resim+Yok';
                  }}
                />
              </div>
            )}
            
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{survey.title}</h1>
              
              <div className="flex items-center text-gray-500 mb-6">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {new Date(survey.created_at).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(survey.description) 
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}; 