import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from './Posts';

const Home: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-light text-gray-800 mb-4">Kumpulan Tulisan</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Sebuah perjalanan tak bertepi menembus lorong-lorong sunyi imajinasi. Di sini, logika hanya duduk sebagai saksi bisu, sementara fantasi menggenggam kemudi, membawa jiwa berlayar ke samudra kemungkinan yang tak pernah terpetakan.
                </p>
            </div>

            <div className="space-y-8">
                {posts.map((post) => (
                    <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <Link to={`/post/${post.id}`} className="block">
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-indigo-600">{post.date}</span>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{post.readTime}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-grayInter-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">{post.title}</h3>
                                <p className="text-gray-600">{post.excerpt}</p>
                                <div className="mt-4">
                                    <span className="inline-flex items-center text-indigo-600">
                                        Baca selengkapnya
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Home;
