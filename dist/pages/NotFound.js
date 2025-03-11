import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
export const NotFound = () => {
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Sayfa Bulunamad\u0131 | Algoritma Ara\u015Ft\u0131rma" }), _jsx("meta", { name: "robots", content: "noindex, nofollow" })] }), _jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center", children: [_jsx("div", { className: "mb-6", children: _jsx("span", { className: "text-9xl font-bold text-blue-600", children: "404" }) }), _jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Sayfa Bulunamad\u0131" }), _jsx("p", { className: "text-gray-600 mb-8", children: "Arad\u0131\u011F\u0131n\u0131z sayfa mevcut de\u011Fil veya ta\u015F\u0131nm\u0131\u015F olabilir. Ana sayfaya d\u00F6nerek devam edebilirsiniz." }), _jsxs(Link, { to: "/", className: "inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors", children: [_jsx(Home, { className: "w-5 h-5" }), "Ana Sayfaya D\u00F6n"] })] }) })] }));
};
export default NotFound;
