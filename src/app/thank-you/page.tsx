'use client';

import { useRouter } from 'next/navigation';

export default function ThankYou() {
  const router = useRouter();

  return (
    <div className='min-h-screen flex items-center justify-center'>
    <section className="max-w-md mx-auto my-16 p-8 bg-white text-center">
      <h2 className="text-xl font-light mb-4 tracking-wide">Registration Received</h2>
      <p className="text-gray-600 text-sm mb-6">We'll contact you shortly</p>
      <button onClick={() => router.push('/')} className="text-xs underline tracking-wide">
        RETURN HOME
      </button>
    </section>
    </div>
  );
}
