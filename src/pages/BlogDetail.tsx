import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../types';
import { Calendar } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
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

        if (postResponse.error) throw postResponse.error;
        if (tagsResponse.error) throw tagsResponse.error;
        setPost(postResponse.data);
        // Fix the type issue by properly typing the tags data
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>Yükleniyor...</div>;
  if (!post) return <div>Yazı bulunamadı</div>;

  return (
    <>
      <Helmet>
        <title>{post ? `${post.title} | Algoritma Araştırma` : 'Blog Yazısı | Algoritma Araştırma'}</title>
        <meta name="description" content={post?.excerpt || 'Algoritma Araştırma blog yazısı'} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image_url || ''} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.created_at} />
        <meta property="article:modified_time" content={post.updated_at} />
        <link rel="canonical" href={`https://algoritma.com.tr/blog/${post.id}`} />
      </Helmet>
      
      <div className="container mx-auto px-6 py-20">
        <article className="max-w-4xl mx-auto">
          <img
            src={post.image_url || ''}
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl mb-8"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-500 mb-8">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(post.created_at).toLocaleDateString('tr-TR')}
          </div>
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </>
  );
}; 