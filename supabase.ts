import { createClient } from '@supabase/supabase-js'

// Supabase URL ve anahtarını doğrudan string olarak tanımlayalım
// (Geliştirme aşamasında bu şekilde kullanabilirsiniz, ancak gerçek projelerde .env kullanmak daha güvenlidir)
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL as string
const supabaseKey = (import.meta.env?.VITE_SUPABASE_SERVICE_ROLE_KEY || import.meta.env?.VITE_SUPABASE_ANON_KEY) as string

// Değerlerin boş olmadığından emin olalım
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL veya Key tanımlanmamış!')
}

// Supabase istemcisini oluştururken ek seçenekler ekleyelim
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
})

// Geriye dönük uyumluluk için default export da ekleyelim
export default supabase 