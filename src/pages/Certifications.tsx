import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, Download, Plus, X, Send, Image as ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface Post {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

export default function Certifications() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts/certification');
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const body = new FormData();
    body.append('title', formData.title);
    body.append('description', formData.description);
    body.append('category', 'certification');
    if (file) body.append('image', file);

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ title: '', description: '' });
        setFile(null);
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-5xl font-serif font-bold text-brand-navy mb-4">Certifications</h1>
          <p className="text-brand-gold font-medium uppercase tracking-widest text-sm">Professional Licenses & Achievements</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-brand-navy text-white px-6 py-3 rounded-full font-bold hover:bg-brand-gold transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus size={20} /> Add New
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-brand-navy/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative"
          >
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-brand-navy"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-brand-navy mb-6">Post New Certification</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-navy">Title</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-gold outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-navy">Description</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-gold outline-none resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-navy">Certificate Image</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="text-slate-400 mb-2" size={24} />
                    <p className="text-xs text-slate-500">{file ? file.name : 'Click to upload image'}</p>
                  </div>
                  <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </label>
              </div>
              <button 
                disabled={loading}
                className="w-full bg-brand-navy text-white py-4 rounded-xl font-bold hover:bg-brand-gold transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? 'Posting...' : 'Post Certification'} <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <motion.div 
            key={post.id}
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 group"
          >
            <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
              {post.image_url ? (
                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <Award size={64} />
                </div>
              )}
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-gold transition-colors">{post.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">{post.description}</p>
              <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                <span className="text-xs font-mono text-slate-400">{new Date(post.created_at).toLocaleDateString()}</span>
                <button className="text-brand-gold font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  View Details <Download size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
