import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ClipboardList, Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PrivacyPolicyModal } from '../components/PrivacyPolicyModal';
// Form şeması
const schema = yup.object().shape({
    fullName: yup.string().required('Ad Soyad zorunludur'),
    email: yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta zorunludur'),
    phone: yup.string().required('Telefon numarası zorunludur'),
    city: yup.string().required('Şehir zorunludur'),
    district: yup.string().required('İlçe zorunludur'),
    education: yup.string().required('Eğitim durumu zorunludur'),
    experience: yup.string().required('Deneyim zorunludur'),
    availability: yup.string().required('Uygunluk durumu zorunludur'),
    about: yup.string().required('Kendiniz hakkında bilgi zorunludur'),
    agreement: yup.boolean().oneOf([true], 'Gizlilik politikasını kabul etmelisiniz')
});
export const AnketorForm = () => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // console.log('Form verileri:', data); // Gönderilen verileri konsola yazdır
            // Supabase'e veri gönderme
            const { error } = await supabase
                .from('anketor_applications')
                .insert([
                {
                    full_name: data.fullName,
                    email: data.email,
                    phone: data.phone,
                    city: data.city,
                    district: data.district,
                    education: data.education,
                    experience: data.experience,
                    availability: data.availability,
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
        }
        catch (error) {
            console.error('Form gönderme hatası:', error);
            toast.error('Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Anket\u00F6r Ba\u015Fvuru Formu | Algoritma Ara\u015Ft\u0131rma" }), _jsx("meta", { name: "description", content: "Algoritma Ara\u015Ft\u0131rma anket\u00F6r ba\u015Fvuru formu - Saha ara\u015Ft\u0131rmalar\u0131nda g\u00F6rev almak i\u00E7in ba\u015Fvurun" })] }), _jsx(PrivacyPolicyModal, { isOpen: isPrivacyPolicyOpen, onClose: () => setIsPrivacyPolicyOpen(false) }), _jsx("div", { className: "bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsx("div", { className: "flex items-center gap-4 mb-4", children: _jsxs(Link, { to: "/forms", className: "flex items-center gap-2 text-white hover:text-blue-200 transition-colors", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), _jsx("span", { children: "T\u00FCm Formlar" })] }) }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(ClipboardList, { className: "w-12 h-12" }), _jsx("h1", { className: "text-3xl font-bold", children: "Anket\u00F6r Ba\u015Fvuru Formu" })] })] }) }), _jsx("div", { className: "py-12 bg-gray-50", children: _jsx("div", { className: "container mx-auto px-6", children: _jsx("div", { className: "max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8", children: submitted ? (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-12", children: [_jsx("div", { className: "bg-green-100 text-green-800 p-4 rounded-lg mb-6 inline-block", children: _jsx("svg", { className: "w-16 h-16 mx-auto", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }), _jsx("h2", { className: "text-2xl font-bold mb-4", children: "Ba\u015Fvurunuz Al\u0131nd\u0131!" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Anket\u00F6r ba\u015Fvurunuz ba\u015Far\u0131yla al\u0131nm\u0131\u015Ft\u0131r. Ba\u015Fvurunuz incelendikten sonra sizinle ileti\u015Fime ge\u00E7ece\u011Fiz." }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx(Link, { to: "/forms", className: "px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors", children: "Formlara D\u00F6n" }), _jsx("button", { onClick: () => setSubmitted(false), className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors", children: "Yeni Ba\u015Fvuru" })] })] })) : (_jsxs(_Fragment, { children: [_jsx("p", { className: "text-gray-600 mb-8", children: "Saha ara\u015Ft\u0131rmalar\u0131nda anket\u00F6r olarak g\u00F6rev almak i\u00E7in a\u015Fa\u011F\u0131daki formu doldurarak ba\u015Fvurabilirsiniz. T\u00FCm alanlar\u0131 eksiksiz ve do\u011Fru bir \u015Fekilde doldurman\u0131z de\u011Ferlendirme s\u00FCrecini h\u0131zland\u0131racakt\u0131r." }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "fullName", className: "block text-sm font-medium text-gray-700 mb-1", children: "Ad Soyad *" }), _jsx("input", { type: "text", id: "fullName", ...register('fullName'), className: `w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`, placeholder: "Ad Soyad" }), errors.fullName && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.fullName.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1", children: "E-posta *" }), _jsx("input", { type: "email", id: "email", ...register('email'), className: `w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`, placeholder: "E-posta adresiniz" }), errors.email && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.email.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700 mb-1", children: "Telefon *" }), _jsx("input", { type: "tel", id: "phone", ...register('phone'), className: `w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`, placeholder: "Telefon numaran\u0131z" }), errors.phone && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.phone.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "city", className: "block text-sm font-medium text-gray-700 mb-1", children: "\u015Eehir *" }), _jsx("input", { type: "text", id: "city", ...register('city'), className: `w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`, placeholder: "Ya\u015Fad\u0131\u011F\u0131n\u0131z \u015Fehir" }), errors.city && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.city.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "district", className: "block text-sm font-medium text-gray-700 mb-1", children: "\u0130l\u00E7e *" }), _jsx("input", { type: "text", id: "district", ...register('district'), className: `w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.district ? 'border-red-500' : 'border-gray-300'}`, placeholder: "Ya\u015Fad\u0131\u011F\u0131n\u0131z il\u00E7e" }), errors.district && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.district.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "education", className: "block text-sm font-medium text-gray-700 mb-1", children: "E\u011Fitim Durumu *" }), _jsxs("select", { id: "education", ...register('education'), className: `w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.education ? 'border-red-500' : 'border-gray-300'}`, children: [_jsx("option", { value: "", children: "Se\u00E7iniz" }), _jsx("option", { value: "ilkokul", children: "\u0130lkokul" }), _jsx("option", { value: "ortaokul", children: "Ortaokul" }), _jsx("option", { value: "lise", children: "Lise" }), _jsx("option", { value: "onlisans", children: "\u00D6n Lisans" }), _jsx("option", { value: "lisans", children: "Lisans" }), _jsx("option", { value: "yukseklisans", children: "Y\u00FCksek Lisans" }), _jsx("option", { value: "doktora", children: "Doktora" })] }), errors.education && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.education.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "experience", className: "block text-sm font-medium text-gray-700 mb-1", children: "Anket\u00F6rl\u00FCk Deneyimi *" }), _jsxs("select", { id: "experience", ...register('experience'), className: `w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.experience ? 'border-red-500' : 'border-gray-300'}`, children: [_jsx("option", { value: "", children: "Se\u00E7iniz" }), _jsx("option", { value: "yok", children: "Deneyimim yok" }), _jsx("option", { value: "1-yildan-az", children: "1 y\u0131ldan az" }), _jsx("option", { value: "1-3-yil", children: "1-3 y\u0131l" }), _jsx("option", { value: "3-5-yil", children: "3-5 y\u0131l" }), _jsx("option", { value: "5-yildan-fazla", children: "5 y\u0131ldan fazla" })] }), errors.experience && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.experience.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "availability", className: "block text-sm font-medium text-gray-700 mb-1", children: "\u00C7al\u0131\u015Fma Uygunlu\u011Fu *" }), _jsxs("select", { id: "availability", ...register('availability'), className: `w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.availability ? 'border-red-500' : 'border-gray-300'}`, children: [_jsx("option", { value: "", children: "Se\u00E7iniz" }), _jsx("option", { value: "tam-zamanli", children: "Tam zamanl\u0131 \u00E7al\u0131\u015Fabilirim" }), _jsx("option", { value: "yarim-zamanli", children: "Yar\u0131 zamanl\u0131 \u00E7al\u0131\u015Fabilirim" }), _jsx("option", { value: "hafta-sonu", children: "Sadece hafta sonlar\u0131 \u00E7al\u0131\u015Fabilirim" }), _jsx("option", { value: "proje-bazli", children: "Proje bazl\u0131 \u00E7al\u0131\u015Fabilirim" })] }), errors.availability && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.availability.message }))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "about", className: "block text-sm font-medium text-gray-700 mb-1", children: "Kendiniz Hakk\u0131nda *" }), _jsx("textarea", { id: "about", ...register('about'), rows: 4, className: `w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.about ? 'border-red-500' : 'border-gray-300'}`, placeholder: "Kendiniz hakk\u0131nda k\u0131sa bilgi veriniz" }), errors.about && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.about.message }))] }), _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex items-center h-5", children: _jsx("input", { id: "agreement", type: "checkbox", ...register('agreement'), className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" }) }), _jsxs("div", { className: "ml-3 text-sm", children: [_jsxs("label", { htmlFor: "agreement", className: "font-medium text-gray-700", children: ["Ki\u015Fisel verilerimin i\u015Flenmesine ili\u015Fkin ", _jsx("a", { href: "#", onClick: (e) => {
                                                                        e.preventDefault();
                                                                        setIsPrivacyPolicyOpen(true);
                                                                    }, className: "text-blue-600 hover:underline", children: "gizlilik politikas\u0131n\u0131" }), " okudum ve kabul ediyorum. *"] }), errors.agreement && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.agreement.message }))] })] }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { type: "submit", disabled: loading, className: "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed", children: loading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "G\u00F6nderiliyor..."] })) : (_jsxs(_Fragment, { children: [_jsx(Send, { className: "w-5 h-5" }), "Ba\u015Fvuruyu G\u00F6nder"] })) }) })] })] })) }) }) })] }));
};
