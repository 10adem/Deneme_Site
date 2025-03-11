import React, { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import {
 Upload, X, Pencil, Trash2, Plus, Tag as Search,
 LogOut, Filter, ChevronLeft, Save, RefreshCw, Check,
 Calendar, BarChart, FileText as FileTextIcon
} from 'lucide-react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { UpdateConfirmModal } from '../components/UpdateConfirmModal';
import type { BlogPost, SurveyResult } from '../types';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { getErrorMessage } from '../utils/errorHandling';


interface FormData {
 title: string;
 content: string;
 excerpt?: string;
 type: 'blog' | 'survey';
}


interface FilterState {
 searchTerm: string;
 type: 'all' | 'blog' | 'survey';
 tag: number | null;
 dateRange: 'all' | 'today' | 'week' | 'month';
}


const schema = yup.object().shape({
 title: yup.string().required('Başlık zorunludur'),
 content: yup.string().required('İçerik zorunludur'),
 type: yup.string().oneOf(['blog', 'survey'] as const).required(),
 excerpt: yup.string().when('type', {
   is: (val: string) => val === 'blog',
   then: (schema) => schema.required('Özet zorunludur'),
   otherwise: (schema) => schema.optional(),
 }),
});


const defaultValues = {
  type: 'blog' as const,
  title: '',
  content: '',
  excerpt: '',
};


export const Admin = () => {
 const auth = useAuth();
 const navigate = useNavigate();
 const [loading, setLoading] = useState(false);
 const [imagePreview, setImagePreview] = useState<string | null>(null);
 const [imageFile, setImageFile] = useState<File | null>(null);
 const fileInputRef = useRef<HTMLInputElement>(null);
 const [posts, setPosts] = useState<BlogPost[]>([]);
 const [surveys, setSurveys] = useState<SurveyResult[]>([]);
 const [isEditing, setIsEditing] = useState(false);
 const [editingId, setEditingId] = useState<number | null>(null);
 const [showForm, setShowForm] = useState(false);
 const [deleteModal, setDeleteModal] = useState<{
   isOpen: boolean;
   id: number | null;
   type: 'blog' | 'survey' | null;
 }>({
   isOpen: false,
   id: null,
   type: null
 });
 // eslint-disable-next-line no-empty-pattern
 const [] = useState<FilterState>({
   searchTerm: '',
   type: 'all',
   tag: null,
   dateRange: 'all'
 });
 const [selectedItems, setSelectedItems] = useState<number[]>([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [filteredItems, setFilteredItems] = useState<(BlogPost | SurveyResult)[]>([]);
 const [filter, setFilter] = useState<'all' | 'blog' | 'survey'>('all');
 const [updateModal, setUpdateModal] = useState<{
   isOpen: boolean;
   data: FormData | null;
 }>({
   isOpen: false,
   data: null
 });
 const [confirmDialog, setConfirmDialog] = useState({
   isOpen: false,
   id: null as number | null,
   type: null as 'blog' | 'survey' | null,
   title: '',
   message: ''
 });


 const { control, handleSubmit, watch, formState: { errors }, reset } = useForm<FormData>({
   resolver: yupResolver(schema),
   defaultValues
 });


 const type = watch('type');


 useEffect(() => {
   fetchContent();
 }, []);


 useEffect(() => {
   let filtered: (BlogPost | SurveyResult)[] = [];
  
   if (filter === 'all') {
     filtered = [...posts, ...surveys];
   } else if (filter === 'blog') {
     filtered = [...posts];
   } else if (filter === 'survey') {
     filtered = [...surveys];
   }
  
   if (searchQuery) {
     filtered = filtered.filter(item => {
       const title = item.title.toLowerCase().includes(searchQuery.toLowerCase());
       
       if ('type' in item && item.type === 'blog') {
         // For BlogPost items
         return title || 
           ('excerpt' in item && item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
       } else {
         // For SurveyResult items
         return title || 
           ('description' in item && item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
       }
     });
   }
  
   setFilteredItems(filtered);
 }, [filter, posts, surveys, searchQuery]);


 const filteredPosts = filteredItems.filter(item => 'type' in item && item.type === 'blog') as BlogPost[];
 const filteredSurveys = filteredItems.filter(item => 'type' in item && item.type === 'survey') as SurveyResult[];


 useEffect(() => {
   if (showForm && !isEditing) {
     reset(defaultValues);
     setImagePreview(null);
     setImageFile(null);
   }
 }, [showForm, isEditing, reset]);


 const fetchContent = async () => {
   try {
     console.log("İçerikler yükleniyor...");
     setLoading(true);
     
     const [postsResponse, surveysResponse] = await Promise.all([
       supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
       supabase.from('survey_results').select('*').order('created_at', { ascending: false })
     ]);
     
     console.log("Blog yanıtı:", postsResponse);
     console.log("Araştırma yanıtı:", surveysResponse);
     
     if (postsResponse.error) {
       console.error("Blog yükleme hatası:", postsResponse.error);
     } else {
       // Blog yazılarına type özelliği ekleyelim
       const postsWithType = postsResponse.data?.map(post => ({ 
         ...post, 
         type: 'blog' as const 
       })) || [];
       setPosts(postsWithType);
     }
     
     if (surveysResponse.error) {
       console.error("Araştırma yükleme hatası:", surveysResponse.error);
     } else {
       // Araştırma sonuçlarına type özelliği ekleyelim
       const surveysWithType = surveysResponse.data?.map(survey => ({ 
         ...survey, 
         type: 'survey' as const 
       })) || [];
       setSurveys(surveysWithType);
     }
   } catch (error) {
     console.error("İçerik yükleme hatası:", error);
     toast.error('İçerikler yüklenirken bir hata oluştu');
   } finally {
     setLoading(false);
   }
 };

 const uploadImage = async (file: File): Promise<string> => {
   try {
     if (file.size > 2 * 1024 * 1024) {
       toast.error('Dosya boyutu 2MB\'dan büyük olamaz');
       throw new Error('Dosya boyutu 2MB\'dan büyük olamaz');
     }
     
     const fileExt = file.name.split('.').pop();
     const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
     
     // Burada bucket adını kontrol edin - "public" yerine "images" olabilir
     const bucketName = 'images'; // veya 'public'
     const filePath = fileName;
     
     // Yükleme başladığında bildirim göster
     const toastId = toast.loading('Resim yükleniyor...');
     
     console.log(`Resim yükleniyor: bucket=${bucketName}, filePath=${filePath}`);
     
     const { error: uploadError } = await supabase.storage
       .from(bucketName)
       .upload(filePath, file, {
         cacheControl: '3600',
         upsert: true // false yerine true kullanın
       });
     
     if (uploadError) {
       console.error('Resim yükleme hatası detayları:', uploadError);
       toast.error('Resim yüklenirken bir hata oluştu', { id: toastId });
       throw uploadError;
     }
     
     // Resim URL'sini al
     const { data: { publicUrl } } = supabase.storage
       .from(bucketName)
       .getPublicUrl(filePath);
     
     console.log("Yüklenen resim URL'si:", publicUrl);
     
     toast.success('Resim başarıyla yüklendi', { id: toastId });
     return publicUrl;
   } catch (error) {
     console.error('Resim yükleme hatası:', error);
     
     let errorMessage = 'Bilinmeyen hata';
     if (error instanceof Error) {
       errorMessage = error.message;
     } else if (typeof error === 'object' && error !== null && 'message' in error) {
       errorMessage = (error as { message: string }).message;
     }
     
     toast.error('Resim yüklenirken bir hata oluştu: ' + errorMessage);
     throw error;
   }
 };


 const handleEdit = async (item: BlogPost | SurveyResult) => {
   setIsEditing(true);
   setEditingId(item.id);
   setShowForm(true);
  
   if ('type' in item && item.type === 'blog') {
     // Blog yazısı düzenleme
     reset({
       title: item.title,
       content: item.content,
       excerpt: item.excerpt,
       type: 'blog'
     });
   } else {
     // Araştırma sonucu düzenleme - Veritabanınızdaki gerçek alan adlarını kullanın
     const surveyItem = item as SurveyResult;
     reset({
       title: surveyItem.title,
       // Araştırma sonuçları için içerik alanı olarak description'ı kullanabiliriz
       // veya veritabanınızda başka bir alan varsa onu kullanın
       content: surveyItem.description || '', // Burada description'ı content olarak kullanıyoruz
       excerpt: surveyItem.description || '', // description sütununu excerpt olarak kullanın
       type: 'survey'
     });
   }

   if (item.image_url) {
     setImagePreview(item.image_url);
   }
 };


 const handleDeleteClick = (id: number, type: 'blog' | 'survey') => {
   // İçerik başlığını bulmak için
   let title = '';
   if (type === 'blog') {
     const post = posts.find(p => p.id === id);
     title = post ? post.title : `ID: ${id}`;
   } else {
     const survey = surveys.find(s => s.id === id);
     title = survey ? survey.title : `ID: ${id}`;
   }
   
   setConfirmDialog({
     isOpen: true,
     id,
     type,
     title: 'İçeriği Sil',
     message: `"${title}" içeriğini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`
   });
 };


 const handleConfirmDelete = async () => {
   if (!confirmDialog.id || !confirmDialog.type) return;
   
   try {
     await handleDelete(confirmDialog.id, confirmDialog.type);
     setConfirmDialog({ 
       isOpen: false, 
       id: null, 
       type: null, 
       title: '', 
       message: '' 
     });
     toast.success('İçerik başarıyla silindi');
   } catch (error) {
     console.error('İçerik silinirken hata oluştu:', error);
     toast.error('İçerik silinirken bir hata oluştu. Lütfen tekrar deneyin.');
   }
 };


 const handleDeleteCancel = () => {
   setConfirmDialog({ 
     isOpen: false, 
     id: null, 
     type: null, 
     title: '', 
     message: '' 
   });
 };


 const handleDelete = async (id: number, type: 'blog' | 'survey') => {
   const contentType = type === 'blog' ? 'Blog yazısı' : 'Araştırma sonucu';
   
   // Silme başladığında bildirim göster
   const toastId = toast.loading(
     <div className="flex items-center gap-2">
       <RefreshCw className="w-4 h-4 animate-spin" />
       <span>{contentType} siliniyor...</span>
     </div>
   );
   
   try {
     const table = type === 'blog' ? 'blog_posts' : 'survey_results';
     
     const { error } = await supabase
       .from(table)
       .delete()
       .eq('id', id);
       
     if (error) throw error;
     
     // Silme başarılı olduğunda bildirimi güncelle
     toast.success(
       <div className="flex items-center gap-2">
         <Check className="w-4 h-4" />
         <span>{contentType} başarıyla silindi!</span>
       </div>,
       { id: toastId }
     );
     
     // Listeleri güncelle
     fetchContent();
     
     // Modal'ı kapat
     setDeleteModal({ isOpen: false, id: null, type: null });
   } catch (error) {
     console.error('Silme işlemi sırasında hata oluştu:', error);
     
     let errorMessage = 'Bilinmeyen hata';
     if (error instanceof Error) {
       errorMessage = error.message;
     } else if (typeof error === 'object' && error !== null && 'message' in error) {
       errorMessage = (error as { message: string }).message;
     }
     
     toast.error('İçerik silinirken bir hata oluştu: ' + errorMessage);
   }
 };


 const onSubmit = async (data: FormData) => {
   setLoading(true);
   
   try {
     let imageUrl = '';
     
     // Eğer yeni bir resim yüklendiyse
     if (imageFile) {
       try {
         imageUrl = await uploadImage(imageFile);
         console.log("Resim başarıyla yüklendi:", imageUrl);
       } catch (imageError) {
         console.error("Resim yükleme hatası:", imageError);
         toast.error("Resim yüklenirken bir hata oluştu. İçerik resimsiz kaydedilecek.");
       }
     } else if (imagePreview && !imageFile) {
       imageUrl = imagePreview;
     }
     
     console.log("İçerik kaydediliyor:", {
       type: data.type,
       title: data.title,
       isEditing: isEditing,
       editingId: editingId,
       imageUrl: imageUrl
     });
     
     if (isEditing && editingId) {
       // Düzenleme işlemi
       if (data.type === 'blog') {
         // Blog yazısı güncelleme
         const { error } = await supabase
           .from('blog_posts')
           .update({
             title: data.title,
             content: data.content,
             excerpt: data.excerpt,
             image_url: imageUrl,
             updated_at: new Date().toISOString()
           })
           .eq('id', editingId);
           
         if (error) {
           console.error("Blog güncelleme hatası:", error);
           throw error;
         }
         toast.success('Blog yazısı başarıyla güncellendi');
       } else {
         // Araştırma sonucu güncelleme
         const { error } = await supabase
           .from('survey_results')
           .update({
             title: data.title,
             description: data.content, // content alanını description olarak kaydediyoruz
             image_url: imageUrl,
             updated_at: new Date().toISOString()
           })
           .eq('id', editingId);
           
         if (error) {
           console.error("Araştırma güncelleme hatası:", error);
           throw error;
         }
         toast.success('Araştırma sonucu başarıyla güncellendi');
       }
     } else {
       // Yeni içerik ekleme
       if (data.type === 'blog') {
         // Blog yazısı ekleme
         const { error } = await supabase
           .from('blog_posts')
           .insert({
             title: data.title,
             content: data.content,
             excerpt: data.excerpt,
             image_url: imageUrl,
             created_at: new Date().toISOString(),
             updated_at: new Date().toISOString()
           });
           
         if (error) {
           console.error("Blog ekleme hatası:", error);
           throw error;
         }
         toast.success('Blog yazısı başarıyla eklendi');
       } else {
         // Araştırma sonucu ekleme
         console.log("Araştırma sonucu ekleniyor:", {
           title: data.title,
           description: data.content,
           image_url: imageUrl
         });
         
         const { error, data: insertedData } = await supabase
           .from('survey_results')
           .insert({
             title: data.title,
             description: data.content, // content alanını description olarak kaydediyoruz
             image_url: imageUrl,
             created_at: new Date().toISOString(),
             updated_at: new Date().toISOString()
           })
           .select();
           
         if (error) {
           console.error("Araştırma ekleme hatası:", error);
           throw error;
         }
         
         console.log("Eklenen araştırma sonucu:", insertedData);
         toast.success('Araştırma sonucu başarıyla eklendi');
       }
     }
     
     // Form sıfırlama ve listeye dönme
     reset(defaultValues);
     setImagePreview(null);
     setImageFile(null);
     setIsEditing(false);
     setEditingId(null);
     setShowForm(false);
     
     // İçerikleri yeniden yükle
     await fetchContent();
   } catch (error) {
     console.error('İçerik kaydedilirken hata oluştu:', error);
     toast.error('İçerik kaydedilirken bir hata oluştu: ' + getErrorMessage(error));
   } finally {
     setLoading(false);
   }
 };


 const handleLogout = async () => {
   try {
     await auth.logout();
     navigate('/login');
   } catch (error) {
     console.error('Çıkış yapılırken hata oluştu:', error);
   }
 };


 const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
   const searchTerm = e.target.value.toLowerCase();
   setSearchQuery(searchTerm);
 };


 const handleBulkDelete = async () => {
   if (!selectedItems.length) return;


   const toastId = toast.loading('Seçili öğeler siliniyor...');


   try {
     const { error: blogError } = await supabase
       .from('blog_posts')
       .delete()
       .in('id', selectedItems);


     const { error: surveyError } = await supabase
       .from('survey_results')
       .delete()
       .in('id', selectedItems);


     if (blogError || surveyError) throw blogError || surveyError;


     toast.success('Seçili öğeler silindi', { id: toastId });
     setSelectedItems([]);
     fetchContent();
   } catch (error) {
     console.error('Toplu silme hatası:', error);
     toast.error('Silme işlemi başarısız oldu', { id: toastId });
   }
 };


 const handleSelectItem = (id: number) => {
   setSelectedItems(prev =>
     prev.includes(id)
       ? prev.filter(itemId => itemId !== id)
       : [...prev, id]
   );
 };


 const handleSelectAll = (items: (BlogPost | SurveyResult)[]) => {
   if (selectedItems.length === items.length && items.length > 0) {
     setSelectedItems([]);
   } else {
     setSelectedItems(items.map(item => item.id));
   }
 };


 const itemVariants = {
   hidden: { y: 20, opacity: 0 },
   visible: {
     y: 0,
     opacity: 1
   }
 };


 const filterBarVariants = {
   hidden: { y: -20, opacity: 0 },
   visible: {
     y: 0,
     opacity: 1,
     transition: {
       duration: 0.3
     }
   }
 };


 const handleToggleForm = () => {
   if (showForm) {
     setShowForm(false);
     setIsEditing(false);
     setEditingId(null);
     reset(defaultValues);
     setImagePreview(null);
     setImageFile(null);
   } else {
     setShowForm(true);
     setIsEditing(false);
     setEditingId(null);
     reset(defaultValues);
     setImagePreview(null);
     setImageFile(null);
   }
 };


 const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
   const file = event.target.files?.[0];
   if (file) {
     if (file.size > 2 * 1024 * 1024) {
       toast.error('Dosya boyutu 2MB\'dan büyük olamaz');
       return;
     }
     setImageFile(file);
     const reader = new FileReader();
     reader.onloadend = () => {
       setImagePreview(reader.result as string);
     };
     reader.readAsDataURL(file);
   }
 };


 const removeImage = () => {
   setImageFile(null);
   setImagePreview(null);
   if (fileInputRef.current) {
     fileInputRef.current.value = '';
   }
 };


 return (
   <>
     <Helmet>
       <title>Yönetim Paneli | Algoritma Araştırma</title>
       <meta name="robots" content="noindex, nofollow" />
     </Helmet>
     <div className="container mx-auto px-6 py-20">
       <div className="flex justify-between items-center mb-8">
         <h2 className="text-3xl font-bold text-gray-800">İçerik Yönetimi</h2>
         <div className="flex gap-4">
           <button
             onClick={handleToggleForm}
             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md"
           >
             {showForm ? (
               <>
                 <ChevronLeft className="w-5 h-5" />
                 Listeye Dön
               </>
             ) : (
               <>
                 <Plus className="w-5 h-5" />
                 Yeni İçerik
               </>
             )}
           </button>
           <button
             onClick={handleLogout}
             className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md"
           >
             <LogOut className="w-5 h-5" />
             Çıkış Yap
           </button>
         </div>
       </div>


       {showForm ? (
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           className="bg-white rounded-xl shadow-lg p-8"
         >
           <h3 className="text-2xl font-bold mb-6">
             {isEditing ? 'İçerik Düzenle' : 'Yeni İçerik Oluştur'}
           </h3>
          
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
               <div className="space-y-2">
                 <label className="block text-sm font-medium text-gray-700">İçerik Türü</label>
                 <div className="flex gap-4">
                   <label className={`flex items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${type === 'blog' ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-300'}`}>
                     <Controller
                       name="type"
                       control={control}
                       render={({ field }) => (
                         <input
                           type="radio"
                           id="type-blog"
                           value="blog"
                           checked={field.value === 'blog'}
                           onChange={() => field.onChange('blog')}
                           className="sr-only"
                         />
                       )}
                     />
                     <FileTextIcon className={`w-5 h-5 ${type === 'blog' ? 'text-blue-600' : 'text-gray-500'}`} />
                     <span className={type === 'blog' ? 'font-medium text-blue-800' : 'text-gray-700'}>Blog Yazısı</span>
                   </label>
                  
                   <label className={`flex items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${type === 'survey' ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-300'}`}>
                     <Controller
                       name="type"
                       control={control}
                       render={({ field }) => (
                         <input
                           type="radio"
                           id="type-survey"
                           value="survey"
                           checked={field.value === 'survey'}
                           onChange={() => field.onChange('survey')}
                           className="sr-only"
                         />
                       )}
                     />
                     <BarChart className={`w-5 h-5 ${type === 'survey' ? 'text-blue-600' : 'text-gray-500'}`} />
                     <span className={type === 'survey' ? 'font-medium text-blue-800' : 'text-gray-700'}>Araştırma Sonucu</span>
                   </label>
                 </div>
               </div>
              
               <div className="space-y-2">
                 <label className="block text-sm font-medium text-gray-700">Görsel</label>
                 <div className="flex items-center gap-4">
                   <div className="relative flex-1">
                     {imagePreview ? (
                       <div className="relative rounded-lg overflow-hidden h-32">
                         <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                         <button
                           type="button"
                           onClick={removeImage}
                           className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                         >
                           <X className="w-4 h-4" />
                         </button>
                       </div>
                     ) : (
                       <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
                           <Upload className="w-8 h-8 mb-2 text-gray-400" />
                           <p className="text-sm text-gray-500">Görsel yüklemek için tıklayın</p>
                           <p className="text-xs text-gray-400">PNG, JPG veya WEBP (Max 2MB)</p>
                         </div>
                         <input
                           ref={fileInputRef}
                           type="file"
                           className="hidden"
                           accept="image/*"
                           onChange={handleImageSelect}
                         />
                       </label>
                     )}
                   </div>
                 </div>
               </div>
             </div>
            
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                 Başlık
               </label>
               <Controller
                 name="title"
                 control={control}
                 render={({ field }) => (
                   <input
                     id="title"
                     type="text"
                     placeholder="İçerik başlığı"
                     className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                     value={field.value}
                     onChange={(e) => field.onChange(e.target.value)}
                   />
                 )}
               />
               {errors.title && (
                 <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
               )}
             </div>
            
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                 İçerik
               </label>
               <Controller
                 name="content"
                 control={control}
                 render={({ field }) => (
                   <TinyMCEEditor
                     apiKey="xyooeg4azs1t9s8pa3qe2ikfxmqolzq7ym6314pfvvclf3oi"
                     init={{
                       height: 400,
                       menubar: true,
                       plugins: [
                         'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                         'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                         'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                       ],
                       toolbar: 'undo redo | blocks | ' +
                         'bold italic forecolor | alignleft aligncenter ' +
                         'alignright alignjustify | bullist numlist outdent indent | ' +
                         'removeformat | help',
                       content_style: 'body { font-family: Inter, sans-serif; font-size: 14px }',
                     }}
                     value={field.value}
                     onEditorChange={(content) => field.onChange(content)}
                   />
                 )}
               />
               {errors.content && (
                 <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
               )}
             </div>


             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                 {type === 'blog' ? 'Özet' : 'Açıklama'}
               </label>
               <Controller
                 name="excerpt"
                 control={control}
                 render={({ field }) => (
                   <textarea
                     id="excerpt"
                     placeholder={type === 'blog' ? "İçerik özeti (liste sayfasında görünecek)" : "Araştırma açıklaması"}
                     rows={3}
                     className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                     value={field.value || ''}
                     onChange={(e) => field.onChange(e.target.value)}
                   />
                 )}
               />
               {errors.excerpt && (
                 <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>
               )}
             </div>
            
             <div className="flex justify-end gap-4 pt-4 border-t">
               <button
                 type="button"
                 onClick={() => {
                   setShowForm(false);
                   setIsEditing(false);
                   setEditingId(null);
                   reset();
                   setImagePreview(null);
                   setImageFile(null);
                 }}
                 className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
               >
                 <X className="w-5 h-5" />
                 İptal
               </button>
               <button
                 type="submit"
                 disabled={loading}
                 className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md disabled:opacity-70"
               >
                 {loading ? (
                   <>
                     <RefreshCw className="w-5 h-5 animate-spin" />
                     {isEditing ? 'Güncelleniyor...' : 'Kaydediliyor...'}
                   </>
                 ) : (
                   <>
                     <Save className="w-5 h-5" />
                     {isEditing ? 'Güncelle' : 'Kaydet'}
                   </>
                 )}
               </button>
             </div>
           </form>
         </motion.div>
       ) : (
         <>
           <motion.div
             variants={filterBarVariants}
             initial="hidden"
             animate="visible"
             className="bg-white rounded-xl shadow-lg p-6 mb-8"
           >
             <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
               <div className="relative w-full md:w-96">
                 <input
                   type="text"
                   placeholder="İçerik ara..."
                   value={searchQuery}
                   onChange={handleSearch}
                   className="w-full pl-12 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm text-gray-700"
                 />
                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                 {searchQuery && (
                   <button
                     onClick={() => {
                       setSearchQuery('');
                       setFilteredItems([...posts, ...surveys]);
                     }}
                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                   >
                     <X className="w-5 h-5" />
                   </button>
                 )}
               </div>
               <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                 <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                   <Filter className="text-blue-600 w-5 h-5" />
                   <span className="text-gray-700 font-medium">Filtrele:</span>
                 </div>
                 <select
                   value={filter}
                   onChange={(e) => setFilter(e.target.value as 'all' | 'blog' | 'survey')}
                   className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white shadow-sm"
                 >
                   <option value="all">Tümü</option>
                   <option value="blog">Blog Yazıları</option>
                   <option value="survey">Araştırma Sonuçları</option>
                 </select>
                
                 {selectedItems.length > 0 && (
                   <button
                     onClick={handleBulkDelete}
                     className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2 ml-auto"
                   >
                     <Trash2 className="w-4 h-4" />
                     Seçilenleri Sil ({selectedItems.length})
                   </button>
                 )}
               </div>
             </div>
           </motion.div>


           <div className="bg-white rounded-xl shadow-lg overflow-hidden">
             <div className="overflow-x-auto">
               <table className="min-w-full divide-y divide-gray-200">
                 <thead className="bg-gray-50">
                   <tr>
                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       <div className="flex items-center gap-2">
                         <input
                           type="checkbox"
                           checked={selectedItems.length === [...filteredPosts, ...filteredSurveys].length && [...filteredPosts, ...filteredSurveys].length > 0}
                           onChange={() => handleSelectAll([...filteredPosts, ...filteredSurveys])}
                           className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                         />
                         Görsel
                       </div>
                     </th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Başlık
                     </th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Tür
                     </th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Tarih
                     </th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       İşlemler
                     </th>
                   </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                   <AnimatePresence>
                     {[...filteredPosts, ...filteredSurveys].map((item) => (
                       <motion.tr
                         key={`${('type' in item ? item.type : 'item')}-${item.id}`}
                         variants={itemVariants}
                         initial="hidden"
                         animate="visible"
                         exit={{ opacity: 0, y: 20 }}
                         layout
                         className="hover:bg-gray-50 transition-colors"
                       >
                         <td className="px-6 py-4 whitespace-nowrap">
                           <div className="flex items-center gap-3">
                             <input
                               type="checkbox"
                               checked={selectedItems.includes(item.id)}
                               onChange={() => handleSelectItem(item.id)}
                               className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                             />
                             <div className="w-16 h-16 rounded-lg overflow-hidden shadow-sm">
                               <img
                                 src={item.image_url || 'https://via.placeholder.com/150'}
                                 alt={item.title}
                                 className="w-full h-full object-cover"
                               />
                             </div>
                           </div>
                         </td>
                         <td className="px-6 py-4">
                           <div className="text-sm font-medium text-gray-900 line-clamp-2">
                             {item.title}
                           </div>
                           <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                             {('type' in item && item.type === 'blog') 
                               ? (item as BlogPost).excerpt || ''
                               : (item as SurveyResult).description || ''}
                           </div>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap">
                           <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                             'type' in item && item.type === 'blog' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                           }`}>
                             {'type' in item && item.type === 'blog' ? (
                               <div className="flex items-center gap-1">
                                 <FileTextIcon className="w-3 h-3" />
                                 Blog Yazısı
                               </div>
                             ) : (
                               <div className="flex items-center gap-1">
                                 <BarChart className="w-3 h-3" />
                                 Araştırma Sonucu
                               </div>
                             )}
                           </span>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap">
                           <div className="flex items-center text-sm text-gray-500">
                             <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                             {new Date(item.created_at).toLocaleDateString('tr-TR')}
                           </div>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                           <div className="flex space-x-3">
                             <button
                               onClick={() => handleEdit(item)}
                               className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-lg hover:bg-blue-100 transition-colors"
                               title="Düzenle"
                             >
                               <Pencil className="w-5 h-5" />
                             </button>
                             <button
                               onClick={() => handleDeleteClick(item.id, 'type' in item ? (item.type as "blog" | "survey") : 'survey')}
                               className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg hover:bg-red-100 transition-colors"
                               title="Sil"
                             >
                               <Trash2 className="w-5 h-5" />
                             </button>
                           </div>
                         </td>
                       </motion.tr>
                     ))}
                   </AnimatePresence>
                  
                   {[...filteredPosts, ...filteredSurveys].length === 0 && (
                     <tr>
                       <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                         <div className="flex flex-col items-center">
                           <Search className="w-12 h-12 text-gray-300 mb-3" />
                           <p>Sonuç bulunamadı</p>
                           {searchQuery && (
                             <button
                               onClick={() => {
                                 setSearchQuery('');
                                 setFilteredItems([...posts, ...surveys]);
                               }}
                               className="mt-2 text-blue-600 hover:text-blue-800"
                             >
                               Aramayı temizle
                             </button>
                           )}
                         </div>
                       </td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
           </div>
         </>
       )}
     </div>


     <AnimatePresence>
       {deleteModal.isOpen && (
         <DeleteConfirmModal
           isOpen={deleteModal.isOpen}
           onClose={() => setDeleteModal({ isOpen: false, id: null, type: null })}
           onConfirm={() => {
             if (deleteModal.id && deleteModal.type) {
               handleDelete(deleteModal.id, deleteModal.type);
             }
             setDeleteModal({ isOpen: false, id: null, type: null });
           }}
           type={deleteModal.type || 'blog'}
         />
       )}
     </AnimatePresence>

     <AnimatePresence>
       {updateModal.isOpen && (
         <UpdateConfirmModal
           isOpen={updateModal.isOpen}
           onClose={() => setUpdateModal({ isOpen: false, data: null })}
           onConfirm={() => {
             if (updateModal.data) {
               onSubmit(updateModal.data);
             }
           }}
           type={updateModal.data?.type || 'blog'}
           isEditing={isEditing}
         />
       )}
     </AnimatePresence>

     <ConfirmDialog
       isOpen={confirmDialog.isOpen}
       title={confirmDialog.title}
       message={confirmDialog.message}
       onConfirm={handleConfirmDelete}
       onCancel={handleDeleteCancel}
     />
   </>
 );
};

