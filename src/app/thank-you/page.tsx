import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white px-6">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
           <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
           </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4 font-outfit">Thank You!</h1>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Your message has been received. Our team will analyze your request and get back to you within 24 hours.
        </p>
        <Link href="/" className="px-10 py-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/20">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
