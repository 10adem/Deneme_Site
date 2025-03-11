/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js';
// NOT: Bu yaklaşım sadece geliştirme aşamasında kullanılmalıdır!
// Gerçek projelerde ortam değişkenlerini kullanın.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// Değerlerin boş olmadığından emin olalım
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL veya Anon Key bulunamadı. Lütfen .env dosyasını kontrol edin.');
}
// WebSocket'i monkey patch ederek engelleme
if (typeof window !== 'undefined') {
    const originalWebSocket = window.WebSocket;
    // @ts-ignore
    window.WebSocket = function (url, ...args) {
        if (url.includes('supabase.co/realtime')) {
            console.log('Blocked WebSocket connection to Supabase Realtime');
            // Sahte bir WebSocket nesnesi döndür
            return {
                addEventListener: () => { },
                removeEventListener: () => { },
                send: () => { },
                close: () => { },
                onopen: null,
                onclose: null,
                onmessage: null,
                onerror: null,
            };
        }
        // Diğer WebSocket bağlantılarına izin ver
        return new originalWebSocket(url, ...args);
    };
    // Prototip zincirini koru
    window.WebSocket.prototype = originalWebSocket.prototype;
}
// Realtime özelliğini tamamen devre dışı bırakarak istemciyi oluşturun
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
    auth: {
        persistSession: true,
        autoRefreshToken: true
    },
    global: {
        headers: { 'x-application-name': 'algoritma-arastirma' }
    },
    realtime: {},
    db: {
        schema: 'public'
    }
});
// WebSocket bağlantısını manuel olarak kapatma girişimi
try {
    // @ts-ignore - Supabase tiplerinde bu özellik açıkça belirtilmemiş olabilir
    if (supabase.realtime && typeof supabase.realtime.disconnect === 'function') {
        supabase.realtime.disconnect();
    }
}
catch (error) {
    console.log('Realtime disconnect attempt ignored');
}
// Geriye dönük uyumluluk için default export
export default supabase;
