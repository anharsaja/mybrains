import React from 'react';
import fotoAnhar from '../assets/foto-anhar.png';
import fotoDani from '../assets/foto-dani.png';
import ruangBaca from '../assets/ruang-baca.png';

const About: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <section className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
                    Tentang <span className="text-primary-600">Isi Kepala</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Sebuah platform yang lahir dari kebutuhan akan ruang ekspresi yang autentik dan menenangkan.
                </p>
            </section>

            {/* Story Section */}
            <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
                <div>
                    <h2 className="text-3xl font-serif font-semibold text-gray-800 mb-6">Cerita Kami</h2>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                        <p>
                            Brain Odyssey lahir pada tahun 2023, dari kerinduan untuk menjelajahi sudut-sudut liar dalam benak manusia—tempat di mana realitas melebur dengan fantasi.
                            Ini adalah ruang digital yang tenang, namun penuh kejutan; tempat cerita tumbuh tanpa diburu waktu, bebas dari riuh dunia luar.
                        </p>

                        <p>
                            Kami percaya, setiap pikiran adalah galaksi kecil dengan petualangannya sendiri.
                            Maka, platform ini kami bangun dengan kesabaran: huruf yang mengalun nyaman di mata, ruang putih yang lapang untuk bernafas, dan detail yang sengaja dibiarkan menjadi peta bagi penjelajah imajinasi.
                        </p>
                    </div>
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={ruangBaca}
                        alt="Ruang baca nyaman dengan buku dan tanaman"
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

            {/* Values Section */}
            <section className="mb-16">
                <h2 className="text-3xl font-serif font-semibold text-gray-800 mb-8 text-center">Nilai Kami</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Keaslian",
                            icon: "✍️",
                            description: "Mendorong ekspresi diri yang jujur dan bebas dari judgement"
                        },
                        {
                            title: "Ketenangan",
                            icon: "🌿",
                            description: "Menciptakan pengalaman digital yang damai dan mindful"
                        },
                        {
                            title: "Komunitas",
                            icon: "🤝",
                            description: "Membangun hubungan bermakna melalui cerita yang dibagikan"
                        }
                    ].map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="text-3xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team Section */}
            <section>
                <h2 className="text-3xl font-serif font-semibold text-gray-800 mb-8 text-center">Out Team</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            name: "Anhar Sandova",
                            role: "Author",
                            photo: fotoAnhar
                        },
                        {
                            name: "Dani Bigol",
                            role: "Penulis Utama",
                            photo: fotoDani
                        },
                        // {
                        //     name: "Budi Santoso",
                        //     role: "Pengembang",
                        //     photo: "https://placehold.co/300x300?text=BS&font=playfair-display"
                        // },
                        // {
                        //     name: "Dewi Rahmawati",
                        //     role: "Desainer",
                        //     photo: "https://placehold.co/300x300?text=DR&font=playfair-display"
                        // }
                    ].map((member, index) => (
                        <div key={index} className="text-center">
                            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                            <p className="text-primary-600">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
