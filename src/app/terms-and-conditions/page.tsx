import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms and Conditions | Dviora",
  description: "The terms of service governing your partnership with Dviora.",
};

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-12">
          Terms <span className="text-gradient">& Conditions</span>
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-10 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing our website and engaging Dviora for services, you agree to comply with and be bound by these Terms and Conditions. Our services primarily include Performance Marketing, Social Media Management, and Website Designing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Service-Specific Terms</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Performance Marketing</h3>
                <p>
                  Our performance marketing services are focused on scaling ROAS and revenue. While we utilize data-driven strategies, specific results can vary based on market conditions, ad spend, and industry competition. Clients are responsible for providing access to necessary ad accounts and platforms.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Social Media Management</h3>
                <p>
                  We provide content creation, community engagement, and brand strategy. Clients must provide brand guidelines and necessary assets for content production. Dviora is not liable for third-party platform algorithm changes or account suspensions beyond our control.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Website Designing</h3>
                <p>
                  Website projects are delivered based on agreed storyboards and timelines. We offer revisions as per the specific project scope. Ownership of the website code and design is transferred to the client upon final payment.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Payments and Consultations</h2>
            <p>
              All projects begin with a consultation initiated via our "Book a Call" system. Payment terms, project milestones, and deliverables will be explicitly outlined in a separate service agreement signed between Dviora and the client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p>
              Unless otherwise agreed, all strategies, frameworks, and content created by Dviora remain our intellectual property until full project compensation is received.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
            <p>
              Dviora shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our digital marketing or design services.
            </p>
          </section>

          <p className="text-sm pt-10 border-t border-white/10">
            Last updated: May 15, 2026
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
