import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart2, Users, TrendingUp, Search, Target, PieChart, LineChart, UserCheck, ShoppingBag, Award, Vote } from 'lucide-react';
export const Services = () => {
    const services = [
        {
            icon: _jsx(BarChart2, { className: "w-8 h-8" }),
            title: "Pazar ve Tüketici Araştırmaları",
            description: "Hedef kitlenizi, pazar trendlerini ve rekabet ortamını analiz ederek stratejik kararlar almanıza yardımcı oluyoruz.",
            features: ["Pazar Araştırması", "Müşteri Memnuniyeti ve Deneyimi", "Alışveriş Davranışları ve Perakende Araştırmaları", "Ürün ve Hizmet Testi Araştırmaları", "Reklam ve Marka Araştırmaları", "Marka Bilinirliği ve Algı Araştırmaları", "Marka ve İletişim Stratejileri Araştırmaları"]
        },
        {
            icon: _jsx(Users, { className: "w-8 h-8" }),
            title: "Kurumsal ve Çalışan Araştırmaları",
            description: "Müşterilerinizin deneyimlerini ve beklentilerini ölçerek, hizmet kalitenizi artırmanıza yardımcı oluyoruz.",
            features: ["Çalışan Memnuniyeti Araştırmaları", "Hizmet Kalitesi ve Operasyonel Verimlilik Araştırmaları", "Kurum İmajı ve İtibar Araştırmaları", "Kriz Yönetimi ve Risk Değerlendirmesi", "Kurumsal Sosyal Sorumluluk (KSS) Araştırmaları"]
        },
        {
            icon: _jsx(TrendingUp, { className: "w-8 h-8" }),
            title: "Teknoloji, İnovasyon ve Eğitim Araştırmaları",
            description: "Markanızın algısını, bilinirliğini ve konumlandırmasını ölçerek, marka stratejinizi güçlendirmenize yardımcı oluyoruz.",
            features: ["Eğitim Araştırmaları", "Teknoloji ve Dijital Dönüşüm Araştırmaları", "Sosyal Medya ve Dijital Analiz", "İnovasyon ve Ürün Geliştirme Araştırmaları", "İnovasyon Yönetimi ve Girişimcilik Araştırmaları", "Periyodik Trend ve Gelecek Projeksiyon Araştırmaları", "Sanat, Kültür ve Medya Araştırmaları"]
        },
        {
            icon: _jsx(Search, { className: "w-8 h-8" }),
            title: "Sosyal, Kamu ve Demografik Araştırmalar",
            description: "Yeni ürünlerinizin veya mevcut ürünlerinizin performansını test ederek, geliştirme süreçlerinize katkıda bulunuyoruz.",
            features: ["Yerel Yönetimler ve Kamu Hizmetleri", "Demografik ve Toplum Yapısı Araştırmaları", "Demografik Araştırmalar", "Çevre ve Sürdürülebilirlik Araştırmaları", "İklim Değişikliği ve Adaptasyon Araştırmaları"]
        },
        {
            icon: _jsx(Target, { className: "w-8 h-8" }),
            title: "Ekonomi, Finans ve Sektörel Araştırmalar",
            description: "Hedef kitlenizin demografik, psikografik ve davranışsal özelliklerini analiz ederek, pazarlama stratejilerinizi optimize ediyoruz.",
            features: ["Finansal ve Ekonomik İçgörü Araştırmaları", "Sigorta ve Finansal Güvenlik Araştırmaları", "Gayrimenkul ve Konut Araştırmaları", "Lojistik ve Tedarik Zinciri Araştırmaları", "Telekomünikasyon ve Teknoloji Hizmetleri Araştırmaları", "Taşımacılık ve Ulaşım Araştırmaları", "Trafik ve Ulaşım Araştırmaları", "Sağlık Araştırmaları"]
        },
        {
            icon: _jsx(PieChart, { className: "w-8 h-8" }),
            title: "Akademik Araştırmalar",
            description: "Akademisyenlerimize akademik çalışmalarında veri toplama hizmeti vermekteyiz.",
            features: ["Lisans Tezi", "Yüksek lisans Tezi", "Doktora Tezi", "Akademik Makaleler", "Tübitak AB Projeleri"]
        },
        {
            icon: _jsx(Vote, { className: "w-8 h-8" }),
            title: "Siyasi Araştırmalar",
            description: "Seçmen davranışlarını ve siyasi eğilimleri analiz ederek, veri odaklı stratejiler geliştirmenize ve kamuoyu beklentilerini anlamanıza yardımcı oluyoruz.",
            features: ["Siyasi Eğilim Araştırmaları", "Belediye Memnuniyet Araştırmaları", "Strateji Geliştirme Araştırmaları", "Aday Belirleme", "Belediye Performans Ölçümü"]
        }
    ];
    const methodologies = [
        {
            icon: _jsx(LineChart, { className: "w-6 h-6" }),
            title: "Nicel Araştırma",
            description: "Sayısal veriler toplayarak istatistiksel analizler yapıyoruz."
        },
        {
            icon: _jsx(UserCheck, { className: "w-6 h-6" }),
            title: "Nitel Araştırma",
            description: "Derinlemesine görüşmeler ve odak gruplarla detaylı içgörüler elde ediyoruz."
        },
        {
            icon: _jsx(ShoppingBag, { className: "w-6 h-6" }),
            title: "Gizli Müşteri",
            description: "Müşteri deneyimini objektif olarak değerlendiriyoruz."
        },
        {
            icon: _jsx(Award, { className: "w-6 h-6" }),
            title: "Benchmark Analizi",
            description: "Sektördeki en iyi uygulamaları inceleyerek karşılaştırmalı analizler sunuyoruz."
        }
    ];
    // const politicalResearch = [
    //   {
    //     icon: <Vote className="w-10 h-10 text-blue-600" />,
    //     title: 'Siyasi Eğilim Araştırmaları',
    //     description: 'Seçmen davranışlarını ve siyasi eğilimleri analiz ederek stratejik kararlar almanıza yardımcı oluyoruz.'
    //   },
    //   {
    //     icon: <Building2 className="w-10 h-10 text-blue-600" />,
    //     title: 'Belediye Memnuniyet Araştırmaları',
    //     description: 'Vatandaşların belediye hizmetlerinden memnuniyet düzeyini ölçerek yerel yönetimlere yol gösteriyoruz.'
    //   },
    //   {
    //     icon: <TrendingUp className="w-10 h-10 text-blue-600" />,
    //     title: 'Strateji Geliştirme Araştırmaları',
    //     description: 'Veri odaklı analizlerle etkili siyasi stratejiler geliştirmenize destek oluyoruz.'
    //   },
    //   {
    //     icon: <UserCheck className="w-10 h-10 text-blue-600" />,
    //     title: 'Aday Belirleme',
    //     description: 'Potansiyel adayların seçmen nezdindeki algısını ve başarı potansiyelini ölçüyoruz.'
    //   },
    //   {
    //     icon: <Activity className="w-10 h-10 text-blue-600" />,
    //     title: 'Belediye Performans Ölçümü',
    //     description: 'Belediye hizmetlerinin etkinliğini ve performansını değerlendirerek iyileştirme alanlarını belirliyoruz.'
    //   }
    // ];
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Hizmetlerimiz | Algoritma Ara\u015Ft\u0131rma" }), _jsx("meta", { name: "description", content: "Algoritma Ara\u015Ft\u0131rma'n\u0131n sundu\u011Fu pazar ara\u015Ft\u0131rmas\u0131, m\u00FC\u015Fteri memnuniyeti, marka ara\u015Ft\u0131rmas\u0131 ve di\u011Fer hizmetler." })] }), _jsx("section", { className: "py-20 bg-gradient-to-b from-blue-50 to-white", children: _jsx("div", { className: "container mx-auto px-6", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsx(motion.h1, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "text-4xl md:text-5xl font-bold text-gray-900 mb-6", children: "Hizmetlerimiz" }), _jsx(motion.p, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 }, className: "text-xl text-gray-600 leading-relaxed", children: "Algoritma Ara\u015Ft\u0131rma A.\u015E. olarak, i\u015Fletmenizin b\u00FCy\u00FCmesine ve geli\u015Fmesine yard\u0131mc\u0131 olacak kapsaml\u0131 ara\u015Ft\u0131rma ve analiz hizmetleri sunuyoruz." })] }) }) }), _jsx("section", { className: "py-16 bg-white", children: _jsx("div", { className: "container mx-auto px-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center", children: services.map((service, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: index * 0.1 }, className: `bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full max-w-md ${index === services.length - 1 && services.length % 2 === 1
                                ? "lg:col-span-3 lg:max-w-md"
                                : ""}`, children: _jsxs("div", { className: "p-6", children: [_jsx("div", { className: "bg-blue-100 p-4 rounded-lg text-blue-600 inline-block mb-6", children: service.icon }), _jsx("h2", { className: "text-xl font-bold text-gray-900 mb-2", children: service.title }), _jsx("p", { className: "text-gray-600 mb-6", children: service.description }), _jsx("h3", { className: "text-lg font-semibold text-gray-800 mb-3", children: "\u00D6zellikler" }), _jsx("ul", { className: "space-y-2", children: service.features.map((feature, idx) => (_jsxs("li", { className: "flex items-start", children: [_jsx("svg", { className: "w-5 h-5 text-blue-500 mr-2 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }), _jsx("span", { className: "text-gray-700", children: feature })] }, idx))) })] }) }, service.title))) }) }) }), _jsx("section", { className: "py-16 bg-gray-50", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx(motion.h2, { initial: { opacity: 0, y: -20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 }, className: "text-3xl font-bold text-gray-900 mb-4", children: "Ara\u015Ft\u0131rma Metodolojilerimiz" }), _jsx(motion.p, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: 0.1 }, className: "text-lg text-gray-600 max-w-2xl mx-auto", children: "Her projeye \u00F6zel, bilimsel ve g\u00FCvenilir ara\u015Ft\u0131rma y\u00F6ntemleri kullan\u0131yoruz." })] }), _jsx("div", { className: "grid md:grid-cols-4 gap-6", children: methodologies.map((method, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.4, delay: index * 0.1 }, className: "bg-white p-6 rounded-lg shadow-md text-center", children: [_jsx("div", { className: "bg-blue-100 p-3 rounded-full inline-flex items-center justify-center mb-4", children: method.icon }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: method.title }), _jsx("p", { className: "text-gray-600", children: method.description })] }, index))) })] }) }), _jsx("section", { className: "py-16 bg-blue-600 text-white", children: _jsx("div", { className: "container mx-auto px-6", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsx(motion.h2, { initial: { opacity: 0, y: -20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 }, className: "text-3xl font-bold mb-6", children: "Projeleriniz \u0130\u00E7in Bize Ula\u015F\u0131n" }), _jsx(motion.p, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: 0.1 }, className: "text-xl mb-8 opacity-90", children: "Ara\u015Ft\u0131rma ihtiya\u00E7lar\u0131n\u0131z i\u00E7in \u00F6zel \u00E7\u00F6z\u00FCmler sunuyoruz. Hemen bizimle ileti\u015Fime ge\u00E7in." }), _jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { duration: 0.5, delay: 0.2 }, children: _jsx(Link, { to: "/get-quote", className: "inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10", children: "Teklif Al\u0131n" }) })] }) }) })] }));
};
