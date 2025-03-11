import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import algoritmaLogo from '../assets/algoritma_logo.png';
export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    // Scroll olayını dinle
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    // Sayfa değiştiğinde menüyü kapat
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);
    return (_jsx("header", { className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`, children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(Link, { to: "/", className: "flex items-center", children: _jsx("img", { src: algoritmaLogo, alt: "Algoritma Ara\u015Ft\u0131rma Logo", className: `transition-all duration-300 ${isScrolled ? 'h-18' : 'h-28'}` }) }), _jsxs("nav", { className: "hidden md:flex space-x-8", children: [_jsx(Link, { to: "/", className: `font-medium ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-600 transition-colors`, children: "Ana Sayfa" }), _jsx(Link, { to: "/about", className: `font-medium ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-600 transition-colors`, children: "Hakk\u0131m\u0131zda" }), _jsx(Link, { to: "/services", className: `font-medium ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-600 transition-colors`, children: "Hizmetlerimiz" }), _jsx(Link, { to: "/forms", className: `font-medium ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-600 transition-colors`, children: "Kariyer" }), _jsx(Link, { to: "/get-quote", className: `font-medium ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-600 transition-colors`, children: "Teklif Al\u0131n" }), _jsx(Link, { to: "/contact", className: `font-medium ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-600 transition-colors`, children: "\u0130leti\u015Fim" })] }), _jsx("button", { className: "md:hidden", onClick: () => setIsMenuOpen(!isMenuOpen), "aria-label": "Men\u00FCy\u00FC A\u00E7/Kapat", children: isMenuOpen ? (_jsx(X, { className: `w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}` })) : (_jsx(Menu, { className: `w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}` })) })] }), isMenuOpen && (_jsx("div", { className: "md:hidden mt-4 bg-white rounded-lg shadow-lg p-4", children: _jsxs("nav", { className: "flex flex-col space-y-3", children: [_jsx(Link, { to: "/", className: "font-medium text-gray-800 hover:text-blue-600 transition-colors py-2", children: "Ana Sayfa" }), _jsx(Link, { to: "/about", className: "font-medium text-gray-800 hover:text-blue-600 transition-colors py-2", children: "Hakk\u0131m\u0131zda" }), _jsx(Link, { to: "/services", className: "font-medium text-gray-800 hover:text-blue-600 transition-colors py-2", children: "Hizmetlerimiz" }), _jsx(Link, { to: "/forms", className: "font-medium text-gray-800 hover:text-blue-600 transition-colors py-2", children: "Kariyer" }), _jsx(Link, { to: "/get-quote", className: "font-medium text-gray-800 hover:text-blue-600 transition-colors py-2", children: "Teklif Al\u0131n" }), _jsx(Link, { to: "/contact", className: "font-medium text-gray-800 hover:text-blue-600 transition-colors py-2", children: "\u0130leti\u015Fim" })] }) }))] }) }));
};
