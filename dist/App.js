import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Home } from './pages/Home';
import { Research } from './pages/Research';
import { Contact } from './pages/Contact';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Admin } from './pages/Admin';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { BlogDetail } from './pages/BlogDetail';
import { SurveyDetail } from './pages/SurveyDetail';
import { HelmetProvider } from 'react-helmet-async';
import algoritmaLogo from './assets/algoritmaLogo.png';
import { GetQuote } from './pages/GetQuote';
import { Footer } from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { Forms } from './pages/Forms';
import { AnketorForm } from './pages/AnketorForm';
import { GizliMusteriForm } from './pages/GizliMusteriForm';
import { OnlineAnketForm } from './pages/OnlineAnketForm';
import { KalitatifForm } from './pages/KalitatifForm';
// Gelecekte kullanılacak
// import { ProtectedRoute } from './components/ProtectedRoute';
// Aktif link için özel bir bileşen oluşturalım
const NavLink = ({ to, children, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (_jsx(Link, { to: to, className: `transition-colors ${isActive
            ? "text-blue-600 font-bold text-lg"
            : "text-gray-700 hover:text-blue-600"}`, onClick: onClick, children: children }));
};
// Sayfa değiştiğinde en üste kaydırma bileşeni
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}
function AppContent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    // Admin sayfalarında navbar ve footer'ı gösterme
    const isAdminPage = location.pathname === '/admin' || location.pathname === '/login';
    // Menüyü kapatmak için yeni fonksiyon
    const handleMenuClick = () => {
        setIsMenuOpen(false);
    };
    return (_jsxs("div", { className: "min-h-screen bg-white text-base md:text-lg flex flex-col", children: [!isAdminPage && (_jsx("nav", { className: "fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs("div", { className: "flex items-center justify-between h-20", children: [_jsx(Link, { to: "/", className: "flex items-center", children: _jsx("img", { src: algoritmaLogo, alt: "Algoritma Logo", className: "h-48 w-auto object-contain" }) }), _jsxs("div", { className: "hidden md:flex items-center gap-8", children: [_jsx(NavLink, { to: "/", children: "Ana Sayfa" }), _jsx(NavLink, { to: "/about", children: "Hakk\u0131m\u0131zda" }), _jsx(NavLink, { to: "/services", children: "Hizmetlerimiz" }), _jsx(NavLink, { to: "/research", children: "Ara\u015Ft\u0131rmalar" }), _jsx(NavLink, { to: "/forms", children: "Kariyer" }), _jsx(NavLink, { to: "/contact", children: "\u0130leti\u015Fim" }), _jsx(Link, { to: "/get-quote", className: "bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors", children: "Teklif Al\u0131n" })] }), _jsx("button", { className: "md:hidden text-gray-700", onClick: () => setIsMenuOpen(!isMenuOpen), children: isMenuOpen ? _jsx(X, { className: "w-6 h-6" }) : _jsx(Menu, { className: "w-6 h-6" }) })] }), isMenuOpen && (_jsx("div", { className: "md:hidden py-4 border-t", children: _jsxs("div", { className: "flex flex-col gap-4", children: [_jsx(NavLink, { to: "/", onClick: handleMenuClick, children: "Ana Sayfa" }), _jsx(NavLink, { to: "/about", onClick: handleMenuClick, children: "Hakk\u0131m\u0131zda" }), _jsx(NavLink, { to: "/services", onClick: handleMenuClick, children: "Hizmetlerimiz" }), _jsx(NavLink, { to: "/research", onClick: handleMenuClick, children: "Ara\u015Ft\u0131rmalar" }), _jsx(NavLink, { to: "/forms", onClick: handleMenuClick, children: "Kariyer" }), _jsx(NavLink, { to: "/contact", onClick: handleMenuClick, children: "\u0130leti\u015Fim" }), _jsx(Link, { to: "/get-quote", className: "bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full text-center", onClick: handleMenuClick, children: "Teklif Al\u0131n" })] }) }))] }) })), _jsx("main", { className: `${!isAdminPage ? 'pt-20' : ''} flex-grow`, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/services", element: _jsx(Services, {}) }), _jsx(Route, { path: "/research", element: _jsx(Research, {}) }), _jsx(Route, { path: "/research/:id", element: _jsx(SurveyDetail, {}) }), _jsx(Route, { path: "/blog/:id", element: _jsx(BlogDetail, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "/get-quote", element: _jsx(GetQuote, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/admin", element: _jsx(ProtectedRoute, { children: _jsx(Admin, {}) }) }), _jsx(Route, { path: "/forms", element: _jsx(Forms, {}) }), _jsx(Route, { path: "/forms/anketor", element: _jsx(AnketorForm, {}) }), _jsx(Route, { path: "/forms/gizli-musteri", element: _jsx(GizliMusteriForm, {}) }), _jsx(Route, { path: "/forms/online-anket", element: _jsx(OnlineAnketForm, {}) }), _jsx(Route, { path: "/forms/kalitatif", element: _jsx(KalitatifForm, {}) }), _jsx(Route, { path: "*", element: _jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12", children: _jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center", children: [_jsx("div", { className: "mb-6", children: _jsx("span", { className: "text-9xl font-bold text-blue-600", children: "404" }) }), _jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Sayfa Bulunamad\u0131" }), _jsx("p", { className: "text-gray-600 mb-8", children: "Arad\u0131\u011F\u0131n\u0131z sayfa mevcut de\u011Fil veya ta\u015F\u0131nm\u0131\u015F olabilir." }), _jsx(Link, { to: "/", className: "inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors", children: "Ana Sayfaya D\u00F6n" })] }) }) })] }) }), !isAdminPage && _jsx(Footer, {}), !isAdminPage && _jsx(WhatsAppButton, {})] }));
}
function App() {
    return (_jsx(HelmetProvider, { children: _jsx(AuthProvider, { children: _jsxs(BrowserRouter, { children: [_jsx(ScrollToTop, {}), _jsx(Toaster, { position: "top-right", toastOptions: {
                            duration: 3000,
                            style: {
                                background: '#FFFFFF',
                                color: '#333333',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                padding: '12px 16px',
                            },
                            success: {
                                iconTheme: {
                                    primary: '#10B981',
                                    secondary: '#FFFFFF',
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: '#EF4444',
                                    secondary: '#FFFFFF',
                                },
                            },
                            loading: {
                                iconTheme: {
                                    primary: '#3B82F6',
                                    secondary: '#FFFFFF',
                                },
                            },
                        } }), _jsx(AppContent, {})] }) }) }));
}
export default App;
