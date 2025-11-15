'use client';

import Footer from '@/Components/Footer';
import MenuBar from '@/Components/MenuBar';
import React from 'react';

const PolicySection = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-3xl font-bold text-slate-900 mb-4">{title}</h2>
    <div className="space-y-4 text-lg text-slate-700">{children}</div>
  </div>
);

const PolicySubSection = ({ title, children }) => (
  <div className="mt-6">
    <h3 className="text-2xl font-semibold text-slate-800 mb-3">{title}</h3>
    <div className="space-y-3 text-slate-700">{children}</div>
  </div>
);

// --- Page Component ---
export default function PrivacyPolicyPage() {
  const lastUpdated = "November 15, 2025"; // <-- CHANGE THIS DATE
  const contactEmail = "support@elmind.in"; // <-- CHANGE THIS EMAIL
  const websiteURL = "elmind.in"; // <-- CHANGE THIS URL

  return (
    <>
      {/* --- Page Content --- */}
      <div className="no-scrollbar flex min-h-screen flex-col relative items-center bg-white text-slate-800">
        <MenuBar/>

        <main className="w-full flex-grow">
          {/* --- Header --- */}
          <section className="w-full bg-slate-50 border-b border-slate-200">
            <div className="w-full max-w-5xl mx-auto px-4 py-20 md:py-24">
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-slate-600">
                Last Updated: {lastUpdated}
              </p>
            </div>
          </section>

          {/* --- Policy Content --- */}
          <section className="w-full max-w-5xl mx-auto px-4 py-20 md:py-24">
            
            <PolicySection title="Introduction">
              <p>
                Welcome to Elmind. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Elmind – Smart School Management & AI Assistant mobile application and website (collectively, the &ldquo;Services&ldquo;).
              </p>
              <p>
                This policy applies to information collected through our app (used by schools, teachers, students, and parents) and our website ({websiteURL}). Please read this policy carefully.
              </p>
            </PolicySection>

            <PolicySection title="Information We Collect">
              <p>We may collect information about you in a variety of ways. The information we may collect via the Services includes:</p>
              
              <PolicySubSection title="Personal Data">
                <p>
                  Personally identifiable information, such as your name, email address, and school information (like class, subjects) that you or your school&quot;s administrator voluntarily provides to us when you register or use the Services.
                </p>
                <p>
                  This includes information for:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>School Admins & Teachers:</strong> Name, email, school association.</li>
                  <li><strong>Students:</strong> Name, class, marks, and attendance data, which is provided and managed by the school.</li>
                </ul>
              </PolicySubSection>

              <PolicySubSection title="User-Generated Content">
                <p>
                  We collect files and content you upload, such as notes, homework submissions (PDFs, documents), lesson plans, and announcements.
                </p>
              </PolicySubSection>

              <PolicySubSection title="AI-Processed Data">
                <p>
                  To provide AI-powered insights (our &ldquo;AI Advisor&ldquo; feature), we process user-provided data (like performance metrics, attendance records, and uploaded content) using third-party APIs, such as Google&quot;s Gemini API. The data is sent for processing to generate insights and is not stored by the third-party AI provider.
                </p>
              </PolicySubSection>

              <PolicySubSection title="Device and Usage Data">
                <p>
                  We may automatically collect device information (e.g., mobile device ID, model) and usage analytics (e.g., features you use, pages you visit) to help us understand how our Services are used and to improve them.
                </p>
              </PolicySubSection>
            </PolicySection>
            
            <PolicySection title="How We Use Your Information">
              <p>We use the information we collect for various purposes, including:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>To create and manage your account.</li>
                <li>To provide, operate, and maintain the Services.</li>
                <li>To process and display student performance, attendance, and reports.</li>
                <li>To provide AI-powered learning insights and assistance.</li>
                <li>To send administrative information, such as announcements and updates.</li>
                <li>To monitor and analyze usage trends to improve your experience.</li>
              </ul>
            </PolicySection>

            <PolicySection title="How We Share Your Information">
              <p><strong>We do not sell your personal data.</strong> We may share information we have collected about you in certain situations:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <strong>With Your School:</strong> Your information (e.g., student performance) is visible to authorized users within your school, such as teachers and administrators, as part of the app&quot;s function.
                </li>
                <li>
                  <strong>Service Providers:</strong> We may share your data with third-party vendors who perform services for us, such as cloud hosting (e.g., Firebase) and analytics.
                </li>
                <li>
                  <strong>AI Processors:</strong> As stated, we send relevant data to AI APIs (like Google&quot;s Gemini API) for processing to provide specific features. These providers process the data on our behalf.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law.
                </li>
              </ul>
            </PolicySection>

            <PolicySection title="Data Security">
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. We use encryption (e.g., SSL/TLS) to protect data in transit.
              </p>
              <p>
                While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security system is perfect or impenetrable.
              </p>
            </PolicySection>

            <PolicySection title="Children's Privacy">
              <p>
                Elmind is intended for use by educational institutions. We process student data, including data of children under 18, on behalf of and at the direction of the school.
              </p>
              <p>
                The school is responsible for obtaining any necessary parental consent required by applicable law (such as the Children&quot;s Online Privacy Protection Act - COPPA) before allowing students to use the Services. We do not knowingly collect personal information from children directly without school or parental consent.
              </p>
            </PolicySection>
            
            <PolicySection title="Data Deletion">
              <p>
                Users (or their school administrators) can request the deletion of their personal data. To request account or data deletion, please contact your school&quot;s administrator or email us directly at {contactEmail}. We will process such requests in accordance with applicable law.
              </p>
            </PolicySection>

            <PolicySection title="Changes to This Privacy Policy">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &ldquo;Last Updated&ldquo; date.
              </p>
            </PolicySection>

            <PolicySection title="Contact Us">
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p className="font-semibold text-lg">{contactEmail}</p>
            </PolicySection>

          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}