import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import AlertTrial from './AlertTrial';

// Fungsi untuk format tanggal Indonesia
const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

const WritePost: React.FC = () => {
    const [form, setForm] = useState({
        title: '',
        excerpt: '',
        content: '',
        date: getTodayDate(), // otomatis tanggal sekarang
        readTime: ''
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);

        const { error } = await supabase
            .from('posts')
            .insert([{ ...form }]);

        setLoading(false);

        if (error) {
            setErrorMsg(error.message);
        } else {
            navigate('/', { state: { success: true } });
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <AlertTrial />
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Tulis Nyinyiran Baru</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="Judul" className="w-full px-4 py-2 border rounded-lg" />
                    <input type="text" name="excerpt" value={form.excerpt} onChange={handleChange} required placeholder="Excerpt" className="w-full px-4 py-2 border rounded-lg" />
                    <textarea name="content" value={form.content} onChange={handleChange} required rows={6} placeholder="Isi tulisan..." className="w-full px-4 py-2 border rounded-lg" />
                    <input
                        type="text"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                        placeholder="Tanggal"
                        className="w-full px-4 py-2 border rounded-lg text-gray-500 bg-gray-100"
                        readOnly
                    />
                    <input type="text" name="readTime" value={form.readTime} onChange={handleChange} required placeholder="Waktu baca (misal: 5 min read)" className="w-full px-4 py-2 border rounded-lg" />

                    <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-indigo-700 transition-colors duration-300" disabled={loading}>
                        {loading ? 'Menyimpan...' : 'Simpan'}
                    </button>

                    {errorMsg && <p className="text-red-600 text-center mt-4">{errorMsg}</p>}
                </form>
            </div>
        </div>
    );
};

export default WritePost;
