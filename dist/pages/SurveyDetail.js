import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Calendar } from 'lucide-react';
import DOMPurify from 'dompurify';
export const SurveyDetail = () => {
    const { id } = useParams();
    const [survey, setSurvey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                if (!id)
                    return;
                const { data, error } = await supabase
                    .from('survey_results')
                    .select('*')
                    .eq('id', id)
                    .single();
                if (error)
                    throw error;
                setSurvey(data);
            }
            catch (error) {
                console.error('Araştırma sonucu yüklenirken hata oluştu:', error);
                setError('Araştırma sonucu bulunamadı');
            }
            finally {
                setLoading(false);
            }
        };
        fetchSurvey();
    }, [id]);
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center min-h-screen", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" }) }));
    }
    if (error || !survey) {
        return (_jsxs("div", { className: "container mx-auto px-6 py-20 text-center", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800 mb-4", children: error || 'Araştırma sonucu bulunamadı' }), _jsx(Link, { to: "/research", className: "text-blue-600 hover:text-blue-800", children: "Ara\u015Ft\u0131rmalar sayfas\u0131na d\u00F6n" })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsxs("title", { children: [survey.title, " | Algoritma Ara\u015Ft\u0131rma"] }), _jsx("meta", { name: "description", content: survey.description.substring(0, 160) })] }), _jsx("div", { className: "bg-gray-50 min-h-screen py-20", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs(Link, { to: "/research", className: "inline-flex items-center text-blue-600 hover:text-blue-800 mb-8", children: [_jsx(ArrowLeft, { className: "mr-2 w-4 h-4" }), "Ara\u015Ft\u0131rmalar Sayfas\u0131na D\u00F6n"] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "bg-white rounded-xl shadow-lg overflow-hidden", children: [survey.image_url && (_jsx("div", { className: "w-full h-80 overflow-hidden", children: _jsx("img", { src: survey.image_url, alt: survey.title, className: "w-full h-full object-cover", onError: (e) => {
                                            console.error("Detay sayfasında resim yüklenemedi:", survey.image_url);
                                            e.currentTarget.src = 'https://placehold.co/800x400?text=Resim+Yok';
                                        } }) })), _jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: survey.title }), _jsxs("div", { className: "flex items-center text-gray-500 mb-6", children: [_jsx(Calendar, { className: "w-4 h-4 mr-2" }), _jsx("span", { children: new Date(survey.created_at).toLocaleDateString('tr-TR', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    }) })] }), _jsx("div", { className: "prose prose-lg max-w-none", dangerouslySetInnerHTML: {
                                                __html: DOMPurify.sanitize(survey.description)
                                            } })] })] })] }) })] }));
};
