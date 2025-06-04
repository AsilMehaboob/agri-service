'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function RegistrationForm() {
  const router = useRouter();
  const params = useParams();
  const role = (params.role as string)?.toLowerCase();

  const [formData, setFormData] = useState({ name: '', phone: '', district: '' });

  const isValidRole = role === 'farmer' || role === 'buyer';

  useEffect(() => {
    if (!isValidRole) {
      router.push('/');
    }
  }, [isValidRole]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, role }),
    });
    router.push('/thank-you');
  };

  if (!isValidRole) return null;

  return (
    <section className="max-w-md mx-auto my-16 p-6 bg-white">
      <h2 className="text-xl font-light text-center mb-6 tracking-wide capitalize">
        {role} Registration
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full mb-4 px-3 py-2 border-b focus:outline-none placeholder-gray-500 text-sm"
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          className="w-full mb-4 px-3 py-2 border-b focus:outline-none placeholder-gray-500 text-sm"
          onChange={handleChange}
        />
        <input
          type="text"
          name="district"
          placeholder="District/State"
          required
          className="w-full mb-6 px-3 py-2 border-b focus:outline-none placeholder-gray-500 text-sm"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2.5 text-sm tracking-wide"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
