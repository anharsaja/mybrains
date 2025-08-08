import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import AlertTrial from './AlertTrial';

interface Post {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    readTime: string;
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    // State untuk kritik/saran
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showBubble, setShowBubble] = useState(false);
    const [inputSuggestion, setInputSuggestion] = useState('');
    const [sending, setSending] = useState(false);

    // Tambahkan state baru untuk popup sukses
    const [showSuccess, setShowSuccess] = useState(false);

    // Ambil data tulisan
    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('id', { ascending: false });

            if (error) {
                console.error('Error fetching posts:', error);
            } else {
                setPosts(data || []);
            }
            setLoading(false);
        };

        fetchPosts();
    }, []);

    // Ambil saran dari localStorage + Supabase
    useEffect(() => {
        // 1. Ambil dari localStorage dulu
        const saved = localStorage.getItem('suggestions');
        if (saved) setSuggestions(JSON.parse(saved));

        // 2. Ambil dari Supabase untuk update terbaru
        const fetchSuggestions = async () => {
            const { data, error } = await supabase
                .from('support')
                .select('suggestion')
                .order('id', { ascending: false });

            if (error) {
                console.error('Gagal mengambil saran:', error);
            } else if (data) {
                const saranList = data.map(item => item.suggestion);
                setSuggestions(saranList);
                localStorage.setItem('suggestions', JSON.stringify(saranList));
            }
        };

        fetchSuggestions();
    }, []);

    // Simpan ke localStorage setiap kali suggestions berubah
    useEffect(() => {
        localStorage.setItem('suggestions', JSON.stringify(suggestions));
    }, [suggestions]);

    // Kirim saran ke Supabase
    const handleSubmitSuggestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputSuggestion.trim()) return;

        setSending(true);

        try {
            const { error } = await supabase
                .from('support')
                .insert([{ suggestion: inputSuggestion.trim() }]);

            if (error) {
                console.error('Gagal mengirim saran:', error);
                setShowBubble(false);
                setShowSuccess(true);
            } else {
                setSuggestions([inputSuggestion.trim(), ...suggestions]);
                setInputSuggestion('');
                setShowBubble(false);
                setShowSuccess(true);
            }
            setTimeout(() => setShowSuccess(false), 2000);
        } catch (err) {
            console.error('Error tak terduga:', err);
            setShowBubble(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        } finally {
            setSending(false);
        }
    };

    const handleDeleteSuggestion = async (index: number) => {
        // Cari id dari Supabase berdasarkan urutan
        const { data } = await supabase
            .from('support')
            .select('id')
            .order('id', { ascending: false });
        if (data && data[index]) {
            const id = data[index].id;
            const { error } = await supabase.from('support').delete().eq('id', id);
            if (!error) {
                setSuggestions(suggestions.filter((_, i) => i !== index));
            }
        }
    };

    if (loading) {
        return <p className="text-center mt-12">Memuat tulisan...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto relative">
            <AlertTrial />

            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-gray-800 mb-4">Kumpulan Tulisan</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Sebuah perjalanan tak bertepi menembus lorong-lorong sunyi imajinasi.
                    Di sini, logika hanya duduk sebagai saksi bisu, sementara fantasi
                    menggenggam kemudi, membawa jiwa berlayar ke samudera kemungkinan
                    yang tak pernah terpetakan.
                </p>
            </div>

            {/* List Posts */}
            <div className="space-y-8">
                {posts.map((post) => (
                    <article
                        key={post.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <Link to={`/post/${post.id}`} className="block">
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-indigo-600">{post.date}</span>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                        {post.readTime}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600">{post.excerpt}</p>
                                <div className="mt-4">
                                    <span className="inline-flex items-center text-indigo-600">
                                        Baca selengkapnya
                                        <svg
                                            className="w-4 h-4 ml-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>

            {/* Bubble kritik/saran */}
            <div className="fixed right-8 bottom-3 z-50 flex flex-col items-end space-y-3">
                {/* Daftar saran tampil di atas tombol bubble */}
                {suggestions.slice(0, 3).map((s, i) => (
                    <div key={i} className="relative flex items-center max-w-xs">
                        <div className="bg-white border border-blue-300 text-blue-700 px-4 py-2 rounded-full shadow text-sm w-full">
                            {s}
                        </div>
                        <button
                            onClick={() => handleDeleteSuggestion(i)}
                            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full w-7 h-7 flex items-center justify-center shadow border border-red-300"
                            title="Hapus saran"
                        >
                            <span className="text-lg font-bold">&times;</span>
                        </button>
                    </div>
                ))}
                {/* Tombol bubble input */}
                <button
                    className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded-full shadow flex items-center focus:outline-none"
                    onClick={() => setShowBubble(true)}
                >
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 3h-6a2 2 0 00-2 2v4h10V5a2 2 0 00-2-2z"></path>
                    </svg>
                    <span className="font-medium text-sm">Ada kritik atau saran?</span>
                </button>
            </div>

            {/* Popup form saran */}
            {showBubble && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Background abu-abu (klik untuk tutup) */}
                    <div
                        className="fixed inset-0 bg-black opacity-30"
                        onClick={() => setShowBubble(false)}
                    ></div>

                    {/* Kotak modal */}
                    <div className="bg-white rounded-xl shadow-xl px-8 py-6 flex flex-col items-center border border-blue-400 relative z-10">
                        <h3 className="text-blue-600 font-semibold text-lg mb-2">Kritik & Saran</h3>
                        <form onSubmit={handleSubmitSuggestion} className="w-full flex flex-col items-center">
                            <textarea
                                className="w-[400px] max-w-full border border-blue-300 rounded-lg px-4 py-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                                rows={6}
                                placeholder="Tulis saran atau kritik Anda di sini..."
                                value={inputSuggestion}
                                onChange={e => setInputSuggestion(e.target.value)}
                                required
                            />
                            <div className="flex justify-end space-x-2 w-[400px] max-w-full">
                                <button
                                    type="button"
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                                    onClick={() => setShowBubble(false)}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${sending ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {sending ? 'Mengirim...' : 'Kirim'}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Popup sukses kirim saran */}
            {showSuccess && (
                <div className="fixed top-6 right-8 z-50">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow flex items-center space-x-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" fill="#22c55e" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="white" d="M9 12l2 2 4-4" />
                        </svg>
                        <span className="text-sm font-medium">Saran terkirim!</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
