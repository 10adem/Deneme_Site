import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Upload, X, Pencil, Trash2, Plus, Tag as Search, LogOut, Filter, ChevronLeft, Save, RefreshCw, Check, Calendar, BarChart, FileText as FileTextIcon } from 'lucide-react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { UpdateConfirmModal } from '../components/UpdateConfirmModal';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { getErrorMessage } from '../utils/errorHandling';
const schema = yup.object().shape({
    title: yup.string().required('Başlık zorunludur'),
    content: yup.string().required('İçerik zorunludur'),
    type: yup.string().oneOf(['blog', 'survey']).required(),
    excerpt: yup.string().when('type', {
        is: (val) => val === 'blog',
        then: (schema) => schema.required('Özet zorunludur'),
        otherwise: (schema) => schema.optional(),
    }),
});
const defaultValues = {
    type: 'blog',
    title: '',
    content: '',
    excerpt: '',
};
export const Admin = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const [posts, setPosts] = useState([]);
    const [surveys, setSurveys] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        id: null,
        type: null
    });
    // eslint-disable-next-line no-empty-pattern
    const [] = useState({
        searchTerm: '',
        type: 'all',
        tag: null,
        dateRange: 'all'
    });
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [filter, setFilter] = useState('all');
    const [updateModal, setUpdateModal] = useState({
        isOpen: false,
        data: null
    });
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        id: null,
        type: null,
        title: '',
        message: ''
    });
    const { control, handleSubmit, watch, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues
    });
    const type = watch('type');
    useEffect(() => {
        fetchContent();
    }, []);
    useEffect(() => {
        let filtered = [];
        if (filter === 'all') {
            filtered = [...posts, ...surveys];
        }
        else if (filter === 'blog') {
            filtered = [...posts];
        }
        else if (filter === 'survey') {
            filtered = [...surveys];
        }
        if (searchQuery) {
            filtered = filtered.filter(item => {
                const title = item.title.toLowerCase().includes(searchQuery.toLowerCase());
                if ('type' in item && item.type === 'blog') {
                    // For BlogPost items
                    return title ||
                        ('excerpt' in item && item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
                }
                else {
                    // For SurveyResult items
                    return title ||
                        ('description' in item && item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
                }
            });
        }
        setFilteredItems(filtered);
    }, [filter, posts, surveys, searchQuery]);
    const filteredPosts = filteredItems.filter(item => 'type' in item && item.type === 'blog');
    const filteredSurveys = filteredItems.filter(item => 'type' in item && item.type === 'survey');
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
            }
            else {
                // Blog yazılarına type özelliği ekleyelim
                const postsWithType = postsResponse.data?.map(post => ({
                    ...post,
                    type: 'blog'
                })) || [];
                setPosts(postsWithType);
            }
            if (surveysResponse.error) {
                console.error("Araştırma yükleme hatası:", surveysResponse.error);
            }
            else {
                // Araştırma sonuçlarına type özelliği ekleyelim
                const surveysWithType = surveysResponse.data?.map(survey => ({
                    ...survey,
                    type: 'survey'
                })) || [];
                setSurveys(surveysWithType);
            }
        }
        catch (error) {
            console.error("İçerik yükleme hatası:", error);
            toast.error('İçerikler yüklenirken bir hata oluştu');
        }
        finally {
            setLoading(false);
        }
    };
    const uploadImage = async (file) => {
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
        }
        catch (error) {
            console.error('Resim yükleme hatası:', error);
            let errorMessage = 'Bilinmeyen hata';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            else if (typeof error === 'object' && error !== null && 'message' in error) {
                errorMessage = error.message;
            }
            toast.error('Resim yüklenirken bir hata oluştu: ' + errorMessage);
            throw error;
        }
    };
    const handleEdit = async (item) => {
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
        }
        else {
            // Araştırma sonucu düzenleme - Veritabanınızdaki gerçek alan adlarını kullanın
            const surveyItem = item;
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
    const handleDeleteClick = (id, type) => {
        // İçerik başlığını bulmak için
        let title = '';
        if (type === 'blog') {
            const post = posts.find(p => p.id === id);
            title = post ? post.title : `ID: ${id}`;
        }
        else {
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
        if (!confirmDialog.id || !confirmDialog.type)
            return;
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
        }
        catch (error) {
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
    const handleDelete = async (id, type) => {
        const contentType = type === 'blog' ? 'Blog yazısı' : 'Araştırma sonucu';
        // Silme başladığında bildirim göster
        const toastId = toast.loading(_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }), _jsxs("span", { children: [contentType, " siliniyor..."] })] }));
        try {
            const table = type === 'blog' ? 'blog_posts' : 'survey_results';
            const { error } = await supabase
                .from(table)
                .delete()
                .eq('id', id);
            if (error)
                throw error;
            // Silme başarılı olduğunda bildirimi güncelle
            toast.success(_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Check, { className: "w-4 h-4" }), _jsxs("span", { children: [contentType, " ba\u015Far\u0131yla silindi!"] })] }), { id: toastId });
            // Listeleri güncelle
            fetchContent();
            // Modal'ı kapat
            setDeleteModal({ isOpen: false, id: null, type: null });
        }
        catch (error) {
            console.error('Silme işlemi sırasında hata oluştu:', error);
            let errorMessage = 'Bilinmeyen hata';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            else if (typeof error === 'object' && error !== null && 'message' in error) {
                errorMessage = error.message;
            }
            toast.error('İçerik silinirken bir hata oluştu: ' + errorMessage);
        }
    };
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            let imageUrl = '';
            // Eğer yeni bir resim yüklendiyse
            if (imageFile) {
                try {
                    imageUrl = await uploadImage(imageFile);
                    console.log("Resim başarıyla yüklendi:", imageUrl);
                }
                catch (imageError) {
                    console.error("Resim yükleme hatası:", imageError);
                    toast.error("Resim yüklenirken bir hata oluştu. İçerik resimsiz kaydedilecek.");
                }
            }
            else if (imagePreview && !imageFile) {
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
                }
                else {
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
            }
            else {
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
                }
                else {
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
        }
        catch (error) {
            console.error('İçerik kaydedilirken hata oluştu:', error);
            toast.error('İçerik kaydedilirken bir hata oluştu: ' + getErrorMessage(error));
        }
        finally {
            setLoading(false);
        }
    };
    const handleLogout = async () => {
        try {
            await auth.logout();
            navigate('/login');
        }
        catch (error) {
            console.error('Çıkış yapılırken hata oluştu:', error);
        }
    };
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchQuery(searchTerm);
    };
    const handleBulkDelete = async () => {
        if (!selectedItems.length)
            return;
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
            if (blogError || surveyError)
                throw blogError || surveyError;
            toast.success('Seçili öğeler silindi', { id: toastId });
            setSelectedItems([]);
            fetchContent();
        }
        catch (error) {
            console.error('Toplu silme hatası:', error);
            toast.error('Silme işlemi başarısız oldu', { id: toastId });
        }
    };
    const handleSelectItem = (id) => {
        setSelectedItems(prev => prev.includes(id)
            ? prev.filter(itemId => itemId !== id)
            : [...prev, id]);
    };
    const handleSelectAll = (items) => {
        if (selectedItems.length === items.length && items.length > 0) {
            setSelectedItems([]);
        }
        else {
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
        }
        else {
            setShowForm(true);
            setIsEditing(false);
            setEditingId(null);
            reset(defaultValues);
            setImagePreview(null);
            setImageFile(null);
        }
    };
    const handleImageSelect = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error('Dosya boyutu 2MB\'dan büyük olamaz');
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
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
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Y\u00F6netim Paneli | Algoritma Ara\u015Ft\u0131rma" }), _jsx("meta", { name: "robots", content: "noindex, nofollow" })] }), _jsxs("div", { className: "container mx-auto px-6 py-20", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-800", children: "\u0130\u00E7erik Y\u00F6netimi" }), _jsxs("div", { className: "flex gap-4", children: [_jsx("button", { onClick: handleToggleForm, className: "bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md", children: showForm ? (_jsxs(_Fragment, { children: [_jsx(ChevronLeft, { className: "w-5 h-5" }), "Listeye D\u00F6n"] })) : (_jsxs(_Fragment, { children: [_jsx(Plus, { className: "w-5 h-5" }), "Yeni \u0130\u00E7erik"] })) }), _jsxs("button", { onClick: handleLogout, className: "bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md", children: [_jsx(LogOut, { className: "w-5 h-5" }), "\u00C7\u0131k\u0131\u015F Yap"] })] })] }), showForm ? (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "bg-white rounded-xl shadow-lg p-8", children: [_jsx("h3", { className: "text-2xl font-bold mb-6", children: isEditing ? 'İçerik Düzenle' : 'Yeni İçerik Oluştur' }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "\u0130\u00E7erik T\u00FCr\u00FC" }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("label", { className: `flex items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${type === 'blog' ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-300'}`, children: [_jsx(Controller, { name: "type", control: control, render: ({ field }) => (_jsx("input", { type: "radio", id: "type-blog", value: "blog", checked: field.value === 'blog', onChange: () => field.onChange('blog'), className: "sr-only" })) }), _jsx(FileTextIcon, { className: `w-5 h-5 ${type === 'blog' ? 'text-blue-600' : 'text-gray-500'}` }), _jsx("span", { className: type === 'blog' ? 'font-medium text-blue-800' : 'text-gray-700', children: "Blog Yaz\u0131s\u0131" })] }), _jsxs("label", { className: `flex items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${type === 'survey' ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-300'}`, children: [_jsx(Controller, { name: "type", control: control, render: ({ field }) => (_jsx("input", { type: "radio", id: "type-survey", value: "survey", checked: field.value === 'survey', onChange: () => field.onChange('survey'), className: "sr-only" })) }), _jsx(BarChart, { className: `w-5 h-5 ${type === 'survey' ? 'text-blue-600' : 'text-gray-500'}` }), _jsx("span", { className: type === 'survey' ? 'font-medium text-blue-800' : 'text-gray-700', children: "Ara\u015Ft\u0131rma Sonucu" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "G\u00F6rsel" }), _jsx("div", { className: "flex items-center gap-4", children: _jsx("div", { className: "relative flex-1", children: imagePreview ? (_jsxs("div", { className: "relative rounded-lg overflow-hidden h-32", children: [_jsx("img", { src: imagePreview, alt: "Preview", className: "w-full h-full object-cover" }), _jsx("button", { type: "button", onClick: removeImage, className: "absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors", children: _jsx(X, { className: "w-4 h-4" }) })] })) : (_jsxs("label", { className: "flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors", children: [_jsxs("div", { className: "flex flex-col items-center justify-center pt-5 pb-6", children: [_jsx(Upload, { className: "w-8 h-8 mb-2 text-gray-400" }), _jsx("p", { className: "text-sm text-gray-500", children: "G\u00F6rsel y\u00FCklemek i\u00E7in t\u0131klay\u0131n" }), _jsx("p", { className: "text-xs text-gray-400", children: "PNG, JPG veya WEBP (Max 2MB)" })] }), _jsx("input", { ref: fileInputRef, type: "file", className: "hidden", accept: "image/*", onChange: handleImageSelect })] })) }) })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Ba\u015Fl\u0131k" }), _jsx(Controller, { name: "title", control: control, render: ({ field }) => (_jsx("input", { id: "title", type: "text", placeholder: "\u0130\u00E7erik ba\u015Fl\u0131\u011F\u0131", className: "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600", value: field.value, onChange: (e) => field.onChange(e.target.value) })) }), errors.title && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.title.message }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "\u0130\u00E7erik" }), _jsx(Controller, { name: "content", control: control, render: ({ field }) => (_jsx(TinyMCEEditor, { apiKey: "xyooeg4azs1t9s8pa3qe2ikfxmqolzq7ym6314pfvvclf3oi", init: {
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
                                                    }, value: field.value, onEditorChange: (content) => field.onChange(content) })) }), errors.content && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.content.message }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: type === 'blog' ? 'Özet' : 'Açıklama' }), _jsx(Controller, { name: "excerpt", control: control, render: ({ field }) => (_jsx("textarea", { id: "excerpt", placeholder: type === 'blog' ? "İçerik özeti (liste sayfasında görünecek)" : "Araştırma açıklaması", rows: 3, className: "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600", value: field.value || '', onChange: (e) => field.onChange(e.target.value) })) }), errors.excerpt && (_jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.excerpt.message }))] }), _jsxs("div", { className: "flex justify-end gap-4 pt-4 border-t", children: [_jsxs("button", { type: "button", onClick: () => {
                                                    setShowForm(false);
                                                    setIsEditing(false);
                                                    setEditingId(null);
                                                    reset();
                                                    setImagePreview(null);
                                                    setImageFile(null);
                                                }, className: "px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2", children: [_jsx(X, { className: "w-5 h-5" }), "\u0130ptal"] }), _jsx("button", { type: "submit", disabled: loading, className: "bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md disabled:opacity-70", children: loading ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "w-5 h-5 animate-spin" }), isEditing ? 'Güncelleniyor...' : 'Kaydediliyor...'] })) : (_jsxs(_Fragment, { children: [_jsx(Save, { className: "w-5 h-5" }), isEditing ? 'Güncelle' : 'Kaydet'] })) })] })] })] })) : (_jsxs(_Fragment, { children: [_jsx(motion.div, { variants: filterBarVariants, initial: "hidden", animate: "visible", className: "bg-white rounded-xl shadow-lg p-6 mb-8", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-6 items-start md:items-center justify-between", children: [_jsxs("div", { className: "relative w-full md:w-96", children: [_jsx("input", { type: "text", placeholder: "\u0130\u00E7erik ara...", value: searchQuery, onChange: handleSearch, className: "w-full pl-12 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm text-gray-700" }), _jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" }), searchQuery && (_jsx("button", { onClick: () => {
                                                        setSearchQuery('');
                                                        setFilteredItems([...posts, ...surveys]);
                                                    }, className: "absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600", children: _jsx(X, { className: "w-5 h-5" }) }))] }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 w-full md:w-auto", children: [_jsxs("div", { className: "flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg", children: [_jsx(Filter, { className: "text-blue-600 w-5 h-5" }), _jsx("span", { className: "text-gray-700 font-medium", children: "Filtrele:" })] }), _jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white shadow-sm", children: [_jsx("option", { value: "all", children: "T\u00FCm\u00FC" }), _jsx("option", { value: "blog", children: "Blog Yaz\u0131lar\u0131" }), _jsx("option", { value: "survey", children: "Ara\u015Ft\u0131rma Sonu\u00E7lar\u0131" })] }), selectedItems.length > 0 && (_jsxs("button", { onClick: handleBulkDelete, className: "bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2 ml-auto", children: [_jsx(Trash2, { className: "w-4 h-4" }), "Se\u00E7ilenleri Sil (", selectedItems.length, ")"] }))] })] }) }), _jsx("div", { className: "bg-white rounded-xl shadow-lg overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: selectedItems.length === [...filteredPosts, ...filteredSurveys].length && [...filteredPosts, ...filteredSurveys].length > 0, onChange: () => handleSelectAll([...filteredPosts, ...filteredSurveys]), className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500" }), "G\u00F6rsel"] }) }), _jsx("th", { className: "px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Ba\u015Fl\u0131k" }), _jsx("th", { className: "px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "T\u00FCr" }), _jsx("th", { className: "px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Tarih" }), _jsx("th", { className: "px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "\u0130\u015Flemler" })] }) }), _jsxs("tbody", { className: "bg-white divide-y divide-gray-200", children: [_jsx(AnimatePresence, { children: [...filteredPosts, ...filteredSurveys].map((item) => (_jsxs(motion.tr, { variants: itemVariants, initial: "hidden", animate: "visible", exit: { opacity: 0, y: 20 }, layout: true, className: "hover:bg-gray-50 transition-colors", children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: selectedItems.includes(item.id), onChange: () => handleSelectItem(item.id), className: "w-4 h-4 text-blue-600 rounded focus:ring-blue-500" }), _jsx("div", { className: "w-16 h-16 rounded-lg overflow-hidden shadow-sm", children: _jsx("img", { src: item.image_url || 'https://via.placeholder.com/150', alt: item.title, className: "w-full h-full object-cover" }) })] }) }), _jsxs("td", { className: "px-6 py-4", children: [_jsx("div", { className: "text-sm font-medium text-gray-900 line-clamp-2", children: item.title }), _jsx("div", { className: "text-xs text-gray-500 mt-1 line-clamp-1", children: ('type' in item && item.type === 'blog')
                                                                                ? item.excerpt || ''
                                                                                : item.description || '' })] }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("span", { className: `px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${'type' in item && item.type === 'blog' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`, children: 'type' in item && item.type === 'blog' ? (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(FileTextIcon, { className: "w-3 h-3" }), "Blog Yaz\u0131s\u0131"] })) : (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(BarChart, { className: "w-3 h-3" }), "Ara\u015Ft\u0131rma Sonucu"] })) }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "flex items-center text-sm text-gray-500", children: [_jsx(Calendar, { className: "w-4 h-4 mr-1 text-gray-400" }), new Date(item.created_at).toLocaleDateString('tr-TR')] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: _jsxs("div", { className: "flex space-x-3", children: [_jsx("button", { onClick: () => handleEdit(item), className: "text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-lg hover:bg-blue-100 transition-colors", title: "D\u00FCzenle", children: _jsx(Pencil, { className: "w-5 h-5" }) }), _jsx("button", { onClick: () => handleDeleteClick(item.id, 'type' in item ? item.type : 'survey'), className: "text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg hover:bg-red-100 transition-colors", title: "Sil", children: _jsx(Trash2, { className: "w-5 h-5" }) })] }) })] }, `${('type' in item ? item.type : 'item')}-${item.id}`))) }), [...filteredPosts, ...filteredSurveys].length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "px-6 py-10 text-center text-gray-500", children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Search, { className: "w-12 h-12 text-gray-300 mb-3" }), _jsx("p", { children: "Sonu\u00E7 bulunamad\u0131" }), searchQuery && (_jsx("button", { onClick: () => {
                                                                            setSearchQuery('');
                                                                            setFilteredItems([...posts, ...surveys]);
                                                                        }, className: "mt-2 text-blue-600 hover:text-blue-800", children: "Aramay\u0131 temizle" }))] }) }) }))] })] }) }) })] }))] }), _jsx(AnimatePresence, { children: deleteModal.isOpen && (_jsx(DeleteConfirmModal, { isOpen: deleteModal.isOpen, onClose: () => setDeleteModal({ isOpen: false, id: null, type: null }), onConfirm: () => {
                        if (deleteModal.id && deleteModal.type) {
                            handleDelete(deleteModal.id, deleteModal.type);
                        }
                        setDeleteModal({ isOpen: false, id: null, type: null });
                    }, type: deleteModal.type || 'blog' })) }), _jsx(AnimatePresence, { children: updateModal.isOpen && (_jsx(UpdateConfirmModal, { isOpen: updateModal.isOpen, onClose: () => setUpdateModal({ isOpen: false, data: null }), onConfirm: () => {
                        if (updateModal.data) {
                            onSubmit(updateModal.data);
                        }
                    }, type: updateModal.data?.type || 'blog', isEditing: isEditing })) }), _jsx(ConfirmDialog, { isOpen: confirmDialog.isOpen, title: confirmDialog.title, message: confirmDialog.message, onConfirm: handleConfirmDelete, onCancel: handleDeleteCancel })] }));
};
