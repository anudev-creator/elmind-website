"use client";
import Footer from '@/Components/Footer';
import MenuBar from '@/Components/MenuBar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AES from 'crypto-js/aes';


export default function ForgotPassword() {
    const [phone, setPhone] = useState('');
    const [ID, setID] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            // 1. ENCRYPT: Protect phone number before sending over network
            const encryptedPhone = AES.encrypt(
                JSON.stringify({ phone: phone }), 
                process.env.NEXT_PUBLIC_ENCRYPTION_KEY 
            ).toString();

            // 2. API CALL: Send to your Node.js Backend
            const baseUrl = process.env.NEXT_PUBLIC_PUBLIC_URL;
            console.log(`Sending Data to ${baseUrl}`);
            
            const response = await fetch(`${baseUrl}/AccountManagingSystem/api/checkDetail`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ payload: encryptedPhone,ID: ID }),
            });

            const data = await response.json();

            if (data.success) {
                // 3. SUCCESS: Store phone temporarily and Redirect
                // We store it so the "Verify OTP" page knows which number to verify
                localStorage.setItem('CheckToken', data.Id);

                localStorage.setItem('phoneNumber', phone);
                
                setMessage('Code sent! Redirecting...');
                
                setTimeout(() => {
                    router.push('/verify_otp'); // Create this page next
                }, 1500);
            } else {
                // 4. ERROR: Show backend message (e.g. "Database error")
                setMessage(data.message || 'Failed to send SMS.');
            }

        } catch (error) {
            console.error(error);
            setMessage('Server connection failed. Is the backend running?');
        } finally {
            setIsLoading(false);
            // Clear error messages after 5 seconds
            if (message) setTimeout(() => setMessage(''), 5000);
        }
    };

    return (
        <>
            <div className="flex flex-col min-h-screen bg-gray-50">
                <MenuBar />

                <main className="flex-grow flex flex-col justify-center items-center p-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-[5px_4px_0px_0px_#000000] border-2 border-black p-8 transition-all duration-300">
                        
                        <div className="text-center mb-8">
                            <div className="font-bold text-3xl animate-fade-in-up">Elmind.</div>
                            <h2 className="text-2xl font-semibold text-gray-800 mt-4 animate-fade-in-up">
                                Manage your Account
                            </h2>
                            <p className="text-gray-600 mt-2 text-sm animate-fade-in-up">
                                No problem. Enter your phone number and we&apos;ll send you a reset code.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="PersionaID" className="block text-sm font-medium text-gray-700 mb-1 animate-fade-in-up">
                                    App ID
                                </label>
                                <input 
                                    type="text" 
                                    id="PersionaID" 
                                    placeholder="e.g. SH or TC or ST 32423423" 
                                    required 
                                    value={ID}
                                    onChange={(e) => setID(e.target.value)}
                                    disabled={isLoading}
                                    className="w-full p-3 rounded-xl border-2 border-gray-300 focus:border-[#2AA5A3] focus:ring-2 focus:ring-[#2AA5A3]/50 outline-none transition-all duration-200 animate-fade-in-up disabled:opacity-50"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 animate-fade-in-up">
                                    Phone Number
                                </label>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    placeholder="e.g. 9876543210" 
                                    required 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled={isLoading}
                                    className="w-full p-3 rounded-xl border-2 border-gray-300 focus:border-[#2AA5A3] focus:ring-2 focus:ring-[#2AA5A3]/50 outline-none transition-all duration-200 animate-fade-in-up disabled:opacity-50"
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-[#2AA5A3] shadow-[5px_4px_0px_0px_#000000] p-3 rounded-xl text-white font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[7px_6px_0px_0px_#000000] active:translate-y-0 active:shadow-[5px_4px_0px_0px_#000000] animate-fade-in-up disabled:bg-gray-400"
                            >
                                {isLoading ? 'Sending Code...' : 'Send Reset Code'}
                            </button>
                        </form>


                    </div>
                </main>
                
                <Footer />
            </div>

            {/* Message Box */}
              <div 
                className={`fixed bottom-5 right-5 bg-[#232426] text-white p-4 rounded-xl shadow-lg max-w-sm text-center transition-all duration-300 z-50 ${
                    message ? 'translate-x-0' : 'translate-x-[150%]'
                }`}
                style={{ opacity: message ? 1 : 0 }}
            >
                <p>{message}</p>
            </div>
        </>
    );
}