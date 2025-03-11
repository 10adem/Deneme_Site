import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
export const GetQuote = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        services: []
    });
    const [formState, setFormState] = useState({
        loading: false,
        success: false,
        error: ''
    });
    const services = [
        { id: 'market-research', name: 'Pazar Araştırması' },
        { id: 'customer-satisfaction', name: 'Belediye Memnuniyeti Araştırması' },
        { id: 'brand-research', name: 'Akademik Araştırmalar' },
        { id: 'product-testing', name: 'Siyasi Araştırmalar' },
        { id: 'competitor-analysis', name: 'Rakip Analizi' },
        { id: 'other', name: 'Diğer' }
    ];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleServiceToggle = (serviceId) => {
        setFormData(prev => {
            const updatedServices = prev.services.includes(serviceId)
                ? prev.services.filter(id => id !== serviceId)
                : [...prev.services, serviceId];
            return { ...prev, services: updatedServices };
        });
    };
    const validateForm = () => {
        let isValid = true;
        const errors = [];
        // E-posta doğrulama
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.push('Geçerli bir e-posta adresi giriniz');
            isValid = false;
        }
        // Basit XSS koruması
        const dangerousPatterns = [
            /<script/i,
            /javascript:/i,
            /on\w+=/i,
            /data:/i
        ];
        if (dangerousPatterns.some(pattern => pattern.test(formData.message))) {
            errors.push('Mesajınızda geçersiz karakterler bulunmaktadır');
            isValid = false;
        }
        // Zorunlu alanları kontrol et
        if (!formData.name.trim()) {
            errors.push('Ad Soyad alanı zorunludur');
            isValid = false;
        }
        if (!formData.phone.trim()) {
            errors.push('Telefon numarası alanı zorunludur');
            isValid = false;
        }
        if (!formData.subject.trim()) {
            errors.push('Konu alanı zorunludur');
            isValid = false;
        }
        if (!formData.message.trim()) {
            errors.push('Mesaj alanı zorunludur');
            isValid = false;
        }
        return { isValid, errors };
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Son gönderim zamanını kontrol et
        const lastSubmitTime = localStorage.getItem('lastFormSubmit');
        const now = Date.now();
        if (lastSubmitTime && now - parseInt(lastSubmitTime) < 60000) { // 1 dakika
            setFormState({
                loading: false,
                success: false,
                error: 'Çok fazla deneme yaptınız. Lütfen bir dakika bekleyin.'
            });
            return;
        }
        // Form doğrulama
        const { isValid, errors } = validateForm();
        if (!isValid) {
            setFormState({
                loading: false,
                success: false,
                error: errors.join('\n')
            });
            return;
        }
        // Form durumunu güncelle
        setFormState({
            loading: true,
            success: false,
            error: ''
        });
        try {
            console.log('Form verileri gönderiliyor:', formData);
            // Form verilerini Supabase'e gönder
            const { error } = await supabase
                .from('quote_requests')
                .insert([
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    company: formData.company,
                    subject: formData.subject,
                    message: formData.message,
                    services: formData.services
                }
            ]);
            if (error) {
                console.error('Supabase hatası:', error);
                throw error;
            }
            // Formspree'ye form verilerini gönder
            const formspreeResponse = await fetch('https://formspree.io/f/xldgqyen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    company: formData.company,
                    subject: formData.subject,
                    message: formData.message,
                    services: formData.services.map(id => {
                        const service = services.find(s => s.id === id);
                        return service ? service.name : id;
                    }).join(', ')
                })
            });
            if (!formspreeResponse.ok) {
                throw new Error('E-posta gönderme hatası');
            }
            // Başarılı durumu
            setFormState({
                loading: false,
                success: true,
                error: ''
            });
            // Formu sıfırla
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                subject: '',
                message: '',
                services: []
            });
            // 5 saniye sonra başarı mesajını kaldır
            setTimeout(() => {
                setFormState(prev => ({
                    ...prev,
                    success: false
                }));
            }, 5000);
            // Başarılı gönderim sonrası son gönderim zamanını kaydet
            localStorage.setItem('lastFormSubmit', now.toString());
        }
        catch (err) {
            console.error('Form gönderme hatası:', err);
            setFormState({
                loading: false,
                success: false,
                error: 'Form gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
            });
        }
    };
    // Yükleme göstergesi için animasyon
    const loadingAnimation = (_jsxs("div", { className: "flex items-center justify-center", children: [_jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" }), _jsx("span", { children: "G\u00F6nderiliyor..." })] }));
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Teklif Al\u0131n | Algoritma Ara\u015Ft\u0131rma" }), _jsx("meta", { name: "description", content: "Algoritma Ara\u015Ft\u0131rma'dan ara\u015Ft\u0131rma hizmetleri i\u00E7in teklif al\u0131n. Pazar ara\u015Ft\u0131rmas\u0131, m\u00FC\u015Fteri memnuniyeti ve daha fazlas\u0131 i\u00E7in bizimle ileti\u015Fime ge\u00E7in." })] }), _jsx("section", { className: "py-20 bg-gradient-to-b from-blue-50 to-white", children: _jsx("div", { className: "container mx-auto px-6", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsx(motion.h1, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "text-4xl md:text-5xl font-bold text-gray-900 mb-6", children: "Teklif Al\u0131n" }), _jsx(motion.p, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 }, className: "text-xl text-gray-600 leading-relaxed", children: "Ara\u015Ft\u0131rma ihtiya\u00E7lar\u0131n\u0131z i\u00E7in size \u00F6zel \u00E7\u00F6z\u00FCmler sunuyoruz. Formu doldurun, en k\u0131sa s\u00FCrede size d\u00F6n\u00FC\u015F yapal\u0131m." })] }) }) }), _jsx("section", { className: "py-16 bg-white", children: _jsx("div", { className: "container mx-auto px-6", children: _jsx("div", { className: "max-w-3xl mx-auto", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "bg-white p-8 rounded-xl shadow-lg", children: formState.success ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx(CheckCircle, { className: "h-16 w-16 text-green-500" }) }), _jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Te\u015Fekk\u00FCrler!" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Teklif talebiniz ba\u015Far\u0131yla al\u0131nd\u0131. En k\u0131sa s\u00FCrede sizinle ileti\u015Fime ge\u00E7ece\u011Fiz." }), _jsx("button", { onClick: () => setFormState(prev => ({ ...prev, success: false })), className: "bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors", children: "Yeni Teklif Talebi" })] })) : (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Teklif Talep Formu" }), formState.error && (_jsx("div", { className: "bg-red-50 border-l-4 border-red-500 p-4 mb-6", children: _jsxs("div", { className: "flex", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AlertCircle, { className: "h-5 w-5 text-red-500" }) }), _jsx("div", { className: "ml-3", children: _jsx("p", { className: "text-sm text-red-700", children: formState.error }) })] }) })), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 mb-1", children: "Ad\u0131n\u0131z Soyad\u0131n\u0131z *" }), _jsx("input", { type: "text", id: "name", name: "name", required: true, value: formData.name, onChange: handleChange, className: "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1", children: "E-posta Adresiniz *" }), _jsx("input", { type: "email", id: "email", name: "email", required: true, value: formData.email, onChange: handleChange, className: "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700 mb-1", children: "Telefon Numaran\u0131z *" }), _jsx("input", { type: "tel", id: "phone", name: "phone", required: true, value: formData.phone, onChange: handleChange, className: "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "company", className: "block text-sm font-medium text-gray-700 mb-1", children: "\u015Eirket Ad\u0131" }), _jsx("input", { type: "text", id: "company", name: "company", value: formData.company, onChange: handleChange, className: "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "subject", className: "block text-sm font-medium text-gray-700 mb-1", children: "Konu *" }), _jsx("input", { type: "text", id: "subject", name: "subject", required: true, value: formData.subject, onChange: handleChange, className: "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\u0130lgilendi\u011Finiz Hizmetler" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: services.map(service => (_jsxs("label", { className: `flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${formData.services.includes(service.id)
                                                        ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm'
                                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`, children: [_jsx("div", { className: `w-5 h-5 flex items-center justify-center rounded-md border transition-all ${formData.services.includes(service.id)
                                                                ? 'bg-blue-600 border-blue-600'
                                                                : 'border-gray-400'}`, children: formData.services.includes(service.id) && (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-3.5 w-3.5 text-white", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) })) }), _jsx("input", { type: "checkbox", checked: formData.services.includes(service.id), onChange: () => handleServiceToggle(service.id), className: "sr-only" }), _jsx("span", { className: "text-sm font-medium", children: service.name })] }, service.id))) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "message", className: "block text-sm font-medium text-gray-700 mb-1", children: "Mesaj\u0131n\u0131z *" }), _jsx("textarea", { id: "message", name: "message", rows: 5, required: true, value: formData.message, onChange: handleChange, placeholder: "Projeniz hakk\u0131nda detaylar\u0131 ve beklentilerinizi payla\u015F\u0131n...", className: "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" })] }), _jsx("div", { className: "pt-4", children: _jsx("button", { type: "submit", disabled: formState.loading, className: "w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed", children: formState.loading ? (loadingAnimation) : (_jsxs(_Fragment, { children: [_jsx(Send, { className: "w-5 h-5" }), "Teklif Talebi G\u00F6nder"] })) }) })] })) }) }) }) })] }));
};
