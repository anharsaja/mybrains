import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching post:', error);
            } else {
                setPost(data);
            }
            setLoading(false);
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    const handleDelete = async () => {
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (!error) {
            setShowConfirm(false);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/');
            }, 2000);
        } else {
            setShowConfirm(false);
            alert('Gagal menghapus tulisan.');
        }
    };

    if (loading) {
        return <p className="text-center mt-12">Memuat artikel...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <AlertTrial />
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                {/* Popup sukses */}
                {showSuccess && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        {/* Background abu-abu */}
                        <div className="fixed inset-0 bg-black opacity-30 z-40"></div>

                        {/* Kotak modal */}
                        <div className="bg-white rounded-xl shadow-xl px-8 py-6 flex flex-col items-center border border-green-400 z-50">
                            <svg className="w-12 h-12 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                            </svg>
                            <span className="text-green-600 font-semibold text-lg mb-2">Tulisan berhasil dihapus!</span>
                            <span className="text-gray-500 text-sm">Anda akan diarahkan ke halaman utama...</span>
                        </div>
                    </div>
                )}
                {/* Popup konfirmasi */}
                {showConfirm && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        {/* Background abu-abu */}
                        <div className="fixed inset-0 bg-black opacity-30 z-40"></div>

                        {/* Kotak modal */}
                        <div className="bg-white rounded-xl shadow-xl px-8 py-6 flex flex-col items-center border border-red-400 z-50">
                            <svg className="w-12 h-12 text-red-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12l6 6 6-6" />
                            </svg>
                            <span className="text-red-600 font-semibold text-lg mb-4">Yakin ingin menghapus tulisan ini?</span>
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors duration-200"
                                >
                                    Ya, Hapus
                                </button>
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition-colors duration-200"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {post ? (
                    <>
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-sm text-indigo-600">{post.date}</span>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{post.readTime}</span>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-800 mb-6">{post.title}</h1>

                            <div>
                                {post.content.split('\n').map((para, i) => (
                                    <p key={i} className="mb-0">{para}</p>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-gray-200 px-8 py-6 bg-gray-50 flex justify-between items-center">
                            <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                                Back to Articles
                            </Link>
                            <button
                                onClick={() => setShowConfirm(true)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
                            >
                                Hapus
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="p-8 text-center">
                        <h2 className="text-2xl font-medium text-gray-800 mb-4">Post Not Found</h2>
                        <p className="text-gray-600">The article you're looking for doesn't exist.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostDetail;
