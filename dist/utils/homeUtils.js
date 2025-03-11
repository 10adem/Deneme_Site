// Home sayfası için sabitler ve yardımcı fonksiyonlar
import ref1 from '../assets/ref1.jpg';
import ref2 from '../assets/ref2.jpg';
import ref3 from '../assets/ref3.jpg';
import ref4 from '../assets/ref4.jpg';
import ref5 from '../assets/ref5.jpg';
import ref6 from '../assets/ref6.jpg';
import kalite1 from '../assets/kalite1.jpeg';
import kalite2 from '../assets/kalite2.jpeg';
import kalite3 from '../assets/kalite3.jpeg';
import kalite4 from '../assets/kalite4.jpeg';
// Referans görselleri
export const referenceImages = [ref1, ref2, ref3, ref4, ref5, ref6];
// Kalite belgeleri
export const qualityCertificates = [
    {
        image: kalite1,
        title: "ISO 9001:2015",
        description: "Kalite Yönetim Sistemi"
    },
    {
        image: kalite2,
        title: "ISO 10002:2018",
        description: "Müşteri Memnuniyeti Yönetim Sistemi"
    },
    {
        image: kalite3,
        title: "ISO 27001:2013",
        description: "Bilgi Güvenliği Yönetim Sistemi"
    },
    {
        image: kalite4,
        title: "TÜRKAK",
        description: "Akreditasyon Sertifikası"
    }
];
// Hizmetler listesi
export const services = [
    {
        title: "Pazar Araştırması",
        description: "Hedef kitlenizi, pazar trendlerini ve rekabet ortamını analiz ederek stratejik kararlar almanıza yardımcı oluyoruz."
    },
    {
        title: "Müşteri Memnuniyeti",
        description: "Müşterilerinizin deneyimlerini ve beklentilerini ölçerek, hizmet kalitenizi artırmanıza yardımcı oluyoruz."
    },
    {
        title: "Marka Araştırması",
        description: "Markanızın algısını, bilinirliğini ve konumlandırmasını ölçerek, marka stratejinizi güçlendirmenize yardımcı oluyoruz."
    },
    {
        title: "Ürün Testi",
        description: "Yeni ürünlerinizin veya mevcut ürünlerinizin performansını test ederek, geliştirme süreçlerinize katkıda bulunuyoruz."
    }
];
// Yardımcı fonksiyonlar
export const homeHelpers = {
    // Otomatik slider için yardımcı fonksiyon
    autoSlide: (currentSlide, totalSlides, setCurrentSlide) => {
        const nextSlide = (currentSlide + 1) % totalSlides;
        setCurrentSlide(nextSlide);
    }
};
