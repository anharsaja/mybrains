import React from 'react';
import { useParams } from 'react-router-dom';
import { posts } from './Posts';

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const post = posts.find(p => p.id === parseInt(id || ''));

    // ...existing code...
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {post ? (
                <>
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm text-indigo-600">{post.date}</span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{post.readTime}</span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800 mb-6">{post.title}</h1>

                        <div className="prose prose-indigo max-w-none">
                            {post.content.split('\n').map((para, i) => (
                                <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <button className="flex items-center text-indigo-600 hover:text-indigo-800">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                                Back to Articles
                            </button>
                            <div className="flex space-x-4">
                                <button className="text-gray-500 hover:text-indigo-600">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="p-8 text-center">
                    <h2 className="text-2xl font-medium text-gray-800 mb-4">Post Not Found</h2>
                    <p className="text-gray-600">The article you're looking for doesn't exist.</p>
                </div>
            )}
        </div>
    );
};

export default PostDetail;
