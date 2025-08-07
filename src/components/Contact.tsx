import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `mailto:anhardhoher@gmail.com?subject=Pesan dari ${form.name}&body=${form.message}%0AEmail: ${form.email}`;
    };

    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mt-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Hubungi Kami</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Nama</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Nama Anda"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Email Anda"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">Pesan</label>
                    <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Tulis pesan Anda di sini..."
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-indigo-700 transition-colors duration-300"
                    >
                        Kirim Pesan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Contact;