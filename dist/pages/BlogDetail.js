import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
export const BlogDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const [postResponse, tagsResponse] = await Promise.all([
                    supabase
                        .from('blog_posts')
                        .select('*')
                        .eq('id', id)
                        .single(),
                    supabase
                        .from('blog_post_tags')
                        .select(`
              tags (
                id,
                name
              )
            `)
                        .eq('blog_post_id', id)
                ]);
                if (postResponse.error)
                    throw postResponse.error;
                if (tagsResponse.error)
                    throw tagsResponse.error;
                setPost(postResponse.data);
                // Fix the type issue by properly typing the tags data
            }
            catch (error) {
                console.error('Error:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);
    if (loading)
        return _jsx("div", { children: "Y\u00FCkleniyor..." });
    if (!post)
        return _jsx("div", { children: "Yaz\u0131 bulunamad\u0131" });
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: post ? `${post.title} | Algoritma Araştırma` : 'Blog Yazısı | Algoritma Araştırma' }), _jsx("meta", { name: "description", content: post?.excerpt || 'Algoritma Araştırma blog yazısı' }), _jsx("meta", { property: "og:title", content: post.title }), _jsx("meta", { property: "og:description", content: post.excerpt }), _jsx("meta", { property: "og:image", content: post.image_url || '' }), _jsx("meta", { property: "og:type", content: "article" }), _jsx("meta", { property: "article:published_time", content: post.created_at }), _jsx("meta", { property: "article:modified_time", content: post.updated_at }), _jsx("link", { rel: "canonical", href: `https://algoritma.com.tr/blog/${post.id}` })] }), _jsx("div", { className: "container mx-auto px-6 py-20", children: _jsxs("article", { className: "max-w-4xl mx-auto", children: [_jsx("img", { src: post.image_url || '', alt: post.title, className: "w-full h-96 object-cover rounded-xl mb-8" }), _jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: post.title }), _jsxs("div", { className: "flex items-center text-gray-500 mb-8", children: [_jsx(Calendar, { className: "w-4 h-4 mr-2" }), new Date(post.created_at).toLocaleDateString('tr-TR')] }), _jsx("div", { className: "prose prose-lg max-w-none", dangerouslySetInnerHTML: { __html: post.content } })] }) })] }));
};
