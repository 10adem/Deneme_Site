import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, UserCheck, FileText, Users } from 'lucide-react';
export const Forms = () => {
    const navigate = useNavigate();
    // Form kartları için veri
    const formCards = [
        {
            id: 'anketor',
            title: 'Anketör Başvuru Formu',
            description: 'Saha araştırmalarında görev almak için anketör başvuru formunu doldurun.',
            icon: _jsx(ClipboardList, { className: "w-12 h-12 text-blue-600" }),
            path: '/forms/anketor'
        },
        {
            id: 'gizli-musteri',
            title: 'Gizli Müşteri Başvuru Formu',
            description: 'Gizli müşteri programımıza katılmak için başvuru formunu doldurun.',
            icon: _jsx(UserCheck, { className: "w-12 h-12 text-green-600" }),
            path: '/forms/gizli-musteri'
        },
        {
            id: 'online-anket',
            title: 'Online Anket Başvuru Formu',
            description: 'Online anketlerimize katılmak için başvuru formunu doldurun.',
            icon: _jsx(FileText, { className: "w-12 h-12 text-purple-600" }),
            path: '/forms/online-anket'
        },
        {
            id: 'kalitatif',
            title: 'Kalitatif Başvuru Formu',
            description: 'Odak grup çalışmaları ve derinlemesine görüşmeler için başvuru formunu doldurun.',
            icon: _jsx(Users, { className: "w-12 h-12 text-orange-600" }),
            path: '/forms/kalitatif'
        }
    ];
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Ba\u015Fvuru Formlar\u0131m\u0131z | Algoritma Ara\u015Ft\u0131rma" }), _jsx("meta", { name: "description", content: "Algoritma Ara\u015Ft\u0131rma ba\u015Fvuru formlar\u0131 - Anket\u00F6r, gizli m\u00FC\u015Fteri, online anket ve kalitatif ara\u015Ft\u0131rma ba\u015Fvurular\u0131" })] }), _jsx("div", { className: "bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "Ba\u015Fvuru Formlar\u0131m\u0131z" }), _jsx("p", { className: "text-xl max-w-2xl", children: "Ara\u015Ft\u0131rma projelerimizde yer almak i\u00E7in a\u015Fa\u011F\u0131daki ba\u015Fvuru formlar\u0131ndan size uygun olan\u0131 doldurabilirsiniz." })] }) }), _jsx("div", { className: "py-16 bg-gray-50", children: _jsx("div", { className: "container mx-auto px-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: formCards.map((card, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: index * 0.1 }, whileHover: { y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }, className: "bg-white rounded-xl shadow-md overflow-hidden cursor-pointer", onClick: () => navigate(card.path), children: [_jsxs("div", { className: "p-6", children: [_jsx("div", { className: "flex justify-center mb-4", children: card.icon }), _jsx("h3", { className: "text-xl font-semibold text-center mb-3", children: card.title }), _jsx("p", { className: "text-gray-600 text-center", children: card.description })] }), _jsx("div", { className: "bg-gray-50 px-6 py-3", children: _jsx("button", { className: "w-full text-blue-600 font-medium hover:text-blue-800 transition-colors", onClick: () => navigate(card.path), children: "Ba\u015Fvur" }) })] }, card.id))) }) }) }), _jsx("div", { className: "py-16 bg-white", children: _jsx("div", { className: "container mx-auto px-6", children: _jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [_jsx("h2", { className: "text-3xl font-bold mb-6", children: "Neden Bize Kat\u0131lmal\u0131s\u0131n\u0131z?" }), _jsx("p", { className: "text-lg text-gray-600 mb-8", children: "Algoritma Ara\u015Ft\u0131rma A.\u015E. olarak, sekt\u00F6rde lider konumumuzla birlikte \u00E7al\u0131\u015Fan ekip arkada\u015Flar\u0131m\u0131za esnek \u00E7al\u0131\u015Fma saatleri, rekabet\u00E7i \u00FCcretler ve profesyonel geli\u015Fim f\u0131rsatlar\u0131 sunuyoruz. Ara\u015Ft\u0131rma projelerimizde g\u00F6rev alarak de\u011Ferli deneyimler kazanabilirsiniz." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "p-4 bg-blue-50 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Esnek \u00C7al\u0131\u015Fma" }), _jsx("p", { className: "text-gray-600", children: "Kendi program\u0131n\u0131za g\u00F6re \u00E7al\u0131\u015Fma imkan\u0131" })] }), _jsxs("div", { className: "p-4 bg-green-50 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Rekabet\u00E7i \u00DCcretler" }), _jsx("p", { className: "text-gray-600", children: "Sekt\u00F6r\u00FCn \u00FCzerinde \u00F6deme politikas\u0131" })] }), _jsxs("div", { className: "p-4 bg-purple-50 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Profesyonel Geli\u015Fim" }), _jsx("p", { className: "text-gray-600", children: "E\u011Fitim ve kariyer f\u0131rsatlar\u0131" })] })] })] }) }) })] }));
};
