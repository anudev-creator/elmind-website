'use client';
import Footer from '@/Components/Footer';
import MenuBar from '@/Components/MenuBar';
// Removed imports for MenuBar and Footer
import React, { useState } from 'react';

// SVG Icon for the header - represents reporting/feedback
const ReportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-blue-500 animate-fade-in">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.731 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
  </svg>
);



export default function ReportIssuePage() {
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState(''); // Added email state
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ message: '', type: '' }); // For success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ message: '', type: '' }); // Clear previous status

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('email', email); // Added email to form data
    formData.append('category', category);
    formData.append('description', description);
    if (file) {
      formData.append('attachment', file);
    }

    // --- NEW: API Submission Logic ---
    const baseURL = 'http://192.168.1.33:3221'; 
    const submitURL = `${baseURL}/Reports/submit`; // Using a relative path

    try {
      const response = await fetch(submitURL, {
        method: 'POST',
        body: formData,
        // Headers are not needed for FormData; browser sets multipart/form-data
      });

      if (response.ok) {
        // --- Success Case ---
        setFormStatus({ message: 'Your report has been submitted successfully! Thank you.', type: 'success' });
        setSubject('');
        setEmail(''); // Reset email state
        setCategory('');
        setDescription('');
        setFile(null);
        e.target.reset(); // Resets file input
      } else {
        // --- API Error Case ---
        const errorData = await response.json().catch(() => ({ message: 'Server error. Please try again.' }));
        setFormStatus({ message: `Submission failed: ${errorData.message || 'Please try again.'}`, type: 'error' });
      }
    } catch (error) {
      // --- Network Error Case ---
      console.error('Submission Error:', error);
      setFormStatus({ message: 'A network error occurred. Please check your connection and try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans flex flex-col">
      <MenuBar/>
      <main className="flex-grow flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-2xl border border-gray-200 animate-slide-up">
          <div className="text-center mb-10">
            <ReportIcon />
            <h1 className="text-4xl font-extrabold text-gray-800 mt-4 tracking-tight">
              Report an Issue
            </h1>
            <p className="text-lg text-gray-600 mt-3 max-w-prose mx-auto animate-fade-in delay-200">
              Encountered a problem or have valuable feedback? Please let us know! Your detailed report helps us improve the experience for everyone.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">

            {/* Subject Field */}
            <div className="input-group animate-fade-in delay-300">
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                placeholder="e.g., 'Data not showing ', 'Alert not sending or receiving'"
                required
              />
            </div>

            {/* --- NEW EMAIL FIELD --- */}
            <div className="input-group animate-fade-in delay-400">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                placeholder="e.g., 'your@email.com'"
                required
              />
              <p className="mt-2 text-xs text-gray-500">
                We&apos;ll use this to send you updates about your report.
              </p>
            </div>
            {/* --- END OF NEW FIELD --- */}


            {/* Category Field - (Delay updated) */}
            <div className="input-group animate-fade-in delay-500">
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-400 bg-white appearance-none pr-10 transition-all duration-200"
                  required
                >
                  <option value="" disabled>-- Select an issue type --</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature_request">Feature Request</option>
                  <option value="billing">Billing Issue</option>
                  <option value="account">Account & Profile</option>
                  <option value="performance">Performance Issue</option>
                  <option value="security">Security Concern</option>
                  <option value="harassment">User Harassment / Abuse</option>
                  <option value="other">Other / General Feedback</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

            {/* Description Field - (Delay updated) */}
            <div className="input-group animate-fade-in delay-600">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Detailed Description
              </label>
              <textarea
                id="description"
                rows={7}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                placeholder="Describe the issue, including steps to reproduce it, expected behavior, and actual behavior. Be as detailed as possible!"
                required
              />
            </div>

            {/* File Attachment Field - (Delay updated) */}
            <div className="input-group animate-fade-in delay-700">
              <label htmlFor="attachment" className="block text-sm font-semibold text-gray-700 mb-2">
                Attach Screenshot or File (Optional)
              </label>
              <input
                type="file"
                id="attachment"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-600
                         file:mr-5 file:py-2.5 file:px-6
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-indigo-100 file:text-indigo-700
                         hover:file:bg-indigo-200 transition-colors duration-200 cursor-pointer"
              />
              <p className="mt-2 text-xs text-gray-500">
                Accepted formats: PNG, JPG, GIF, PDF. Max file size: 10MB.
              </p>
            </div>

            {/* --- NEW: Form Status Message --- */}
            {formStatus.message && (
              <div className={`p-4 rounded-lg text-sm font-medium animate-fade-in ${
                formStatus.type === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}
                role="alert"
              >
                {formStatus.message}
              </div>
            )}
            {/* --- END: Form Status Message --- */}


            {/* Submit Button - (Delay updated) */}
            <div className="pt-4 animate-fade-in delay-800">
              <button
                type="submit"
                className={`w-full py-3.5 px-6 rounded-full text-white font-bold text-lg shadow-lg 
                         focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 
                         transition-all duration-300 ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-0.5'}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Report'
                )}
              </button>
            </div>

          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}