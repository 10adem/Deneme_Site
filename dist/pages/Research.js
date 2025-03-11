import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, Loader, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import DOMPurify from 'dompurify';
export const Research = () => {
    const [posts, setPosts] = useState([]);
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsResponse, surveysResponse] = await Promise.all([
                    supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
                    supabase.from('survey_results').select('*').order('created_at', { ascending: false })
                ]);
                if (postsResponse.data)
                    setPosts(postsResponse.data);
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
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
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
        return (_jsx("div", { className: "min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center", children: [_jsx("div", { className: "flex justify-center mb-6", children: _jsx(motion.div, { animate: { rotate: 360 }, transition: { duration: 1, repeat: Infinity, ease: "linear" }, children: _jsx(Loader, { className: "w-12 h-12 text-blue-600" }) }) }), _jsx("h3", { className: "text-xl font-semibold text-gray-800 mb-2", children: "Veriler Y\u00FCkleniyor" }), _jsx("p", { className: "text-gray-600", children: "En g\u00FCncel ara\u015Ft\u0131rma sonu\u00E7lar\u0131m\u0131z ve blog yaz\u0131lar\u0131m\u0131z haz\u0131rlan\u0131yor. L\u00FCtfen bekleyin..." })] }) }));
    }
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Ara\u015Ft\u0131rmalar\u0131m\u0131z | Algoritma Ara\u015Ft\u0131rma" }), _jsx("meta", { name: "description", content: "Algoritma Ara\u015Ft\u0131rma'n\u0131n yapt\u0131\u011F\u0131 ara\u015Ft\u0131rmalar, anketler ve analizler" })] }), _jsx("div", { className: "bg-gray-50 min-h-screen", children: _jsxs("div", { className: "container mx-auto px-6 py-20", children: [_jsxs("section", { className: "mb-20", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-12", children: "Son Blog Yaz\u0131lar\u0131" }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post) => (_jsx(Link, { to: `/blog/${post.id}`, children: _jsxs("article", { className: "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow", children: [_jsx("img", { src: post.image_url || undefined, alt: post.title, className: "w-full h-48 object-cover" }), _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: post.title }), _jsx("p", { className: "text-gray-600 mb-4", children: post.excerpt }), _jsxs("div", { className: "flex items-center text-gray-500 text-sm", children: [_jsx(Calendar, { className: "w-4 h-4 mr-2" }), new Date(post.created_at).toLocaleDateString('tr-TR')] })] })] }) }, post.id))) })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-12", children: "Son Ara\u015Ft\u0131rma Sonu\u00E7lar\u0131" }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: surveys.map((survey) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 }, className: "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow", children: [survey.image_url && (_jsx("div", { className: "h-48 overflow-hidden", children: _jsx("img", { src: survey.image_url, alt: survey.title, className: "w-full h-full object-cover transition-transform hover:scale-105", onError: (e) => {
                                                        console.error("Resim yüklenemedi:", survey.image_url);
                                                        e.currentTarget.src = 'https://placehold.co/300x200?text=Resim+Yok';
                                                    } }) })), _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-xl font-bold text-gray-800 mb-2", children: survey.title }), _jsx("div", { className: "text-gray-600 mb-4 prose prose-sm max-h-24 overflow-hidden", children: _jsx("div", { dangerouslySetInnerHTML: {
                                                                __html: DOMPurify.sanitize(
                                                                // İçeriği kısaltmak için
                                                                survey.description.length > 150
                                                                    ? survey.description.substring(0, 150) + '...'
                                                                    : survey.description)
                                                            } }) }), _jsxs(Link, { to: `/research/${survey.id}`, className: "inline-flex items-center text-blue-600 font-medium hover:text-blue-800", children: ["Devam\u0131n\u0131 Oku", _jsx(ArrowRight, { className: "ml-2 w-4 h-4" })] })] })] }, survey.id))) })] })] }) })] }));
};
