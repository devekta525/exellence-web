import React from "react";

export const metadata = {
  title: "Privacy Policy | Dviora",
  description: "Our commitment to protecting your privacy and managing your data securely.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-12">
          Privacy <span className="text-gradient">Policy</span>
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-10 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to Dviora. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our services, including Performance Marketing, Social Media Management, and Website Designing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you "Book a Call" or contact us. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Name and contact details (email, phone number).</li>
              <li>Business information (monthly revenue, service interests).</li>
              <li>Project requirements for Website Designing or Social Media campaigns.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p>
              We use the collected information to deliver and improve our core services:
            </p>
            <ul className="list-disc pl-6 space-y-4 mt-4">
              <li><strong>Performance Marketing:</strong> To analyze business revenue and tailor ROAS-focused advertising strategies.</li>
              <li><strong>Social Media Management:</strong> To understand brand voice and manage community engagement.</li>
              <li><strong>Website Designing:</strong> To develop custom UI/UX solutions that align with your business goals.</li>
              <li>To communicate with you regarding project updates and consultations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. Whether we are managing your ad accounts or designing your digital assets, your business data remains confidential and secure within our infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
            <p>
              You have the right to access, update, or request the deletion of your personal information. If you have questions about how your data is handled across our marketing or design services, please contact us at hi@excellence.agency.
            </p>
          </section>

          <p className="text-sm pt-10 border-t border-white/10">
            Last updated: May 15, 2026
          </p>
        </div>
      </div>
    </main>
  );
}
