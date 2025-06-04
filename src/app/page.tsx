'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white py-20 px-4 text-center border-b">
        <h1 className="text-4xl font-sans md:text-5xl mb-4 tracking-tight">
          Connecting Farmers & Buyers
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Direct agricultural marketplace
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => router.push('/farmer')}
            className="bg-gray-900 text-white py-2 px-5 text-sm tracking-wide"
          >
            Farmer Registration
          </button>
          <button
            onClick={() => router.push('/buyer')}
            className="border border-gray-900 text-gray-900 py-2 px-5 text-sm tracking-wide"
          >
            Buyer Registration
          </button>
        </div>
      </header>
    </div>
  );
}
