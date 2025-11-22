"use client";
import { useState, useEffect, useRef } from 'react';

// Standard Components
const MenuBar = () => (
    <nav className="w-full p-4 bg-white shadow-sm flex justify-between items-center">
        <div className="font-bold text-xl">Elmind.</div>
    </nav>
);

const Footer = () => (
    <footer className="w-full p-6 bg-gray-100 text-center text-gray-500 text-sm mt-auto">
        &copy; 2025 Elmind Inc.
    </footer>
);

export default function VerifyOTP() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [phone, setPhone] = useState(null);
    const [timer, setTimer] = useState(60);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Use useRef for values that shouldn't trigger re-renders but need to persist
    const hasRan = useRef(false);

    // 1. Phone Number Logic
    useEffect(() => {
        if (hasRan.current) return;
        hasRan.current = true;

        const storedPhone = localStorage.getItem('phoneNumber');
        const CheckToken = localStorage.getItem('CheckToken');

        console.log(`Phone number: ${storedPhone} \nToken:${CheckToken}`);
        
        
        if (storedPhone && CheckToken) {
            setPhone(storedPhone);
            // Optional: Keep it until success, or remove immediately depending on preference
            localStorage.removeItem('CheckToken'); 
            console.log(localStorage.getItem('CheckToken'));
            return;
        }
        localStorage.removeItem('CheckToken'); 
        // If no phone found, redirect
        window.location.replace('/');
    }, []);

    // 2. Timer Logic (The missing piece)
    useEffect(() => {
        // Only set interval if timer is > 0
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        }

        // Cleanup interval on unmount or when timer changes
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const enteredCode = otp.join('');

        if (enteredCode.length < 6) {
            setError('Please enter the full 6-digit code.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const baseUrl = process.env.NEXT_PUBLIC_PUBLIC_URL;

            const response = await fetch(`${baseUrl}/AccountManagingSystem/api/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: phone,
                    otp: enteredCode
                })
            });

            const data = await response.json();

            if (data.success) {
                const secureToken = data.token;

                sessionStorage.setItem('elmind_access_token', secureToken);
                sessionStorage.setItem('elmind_user_phone', phone);
                sessionStorage.removeItem('elmind_page_visited');
                localStorage.removeItem('phoneNumber');
                window.location.href = '/MyAccount';

            } else {
                setError(data.message || 'Invalid Code');
            }

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <MenuBar />
            <main className="flex-grow flex flex-col justify-center items-center p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-[5px_4px_0px_0px_#000000] border-2 border-black p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Verify It&apos;s You</h2>
                        <p className="text-gray-600 mt-2 text-sm">
                            Enter code sent to <span className="font-bold text-black">{phone || "..."}</span>
                        </p>
                    </div>

                    <form onSubmit={handleVerify} className="space-y-6">
                        <div className="flex justify-center gap-2">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={data}
                                    onChange={e => handleChange(e.target, index)}
                                    onFocus={e => e.target.select()}
                                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#2AA5A3] focus:ring-2 focus:ring-[#2AA5A3]/50 outline-none transition-all"
                                />
                            ))}
                        </div>

                        {error && <p className="text-red-500 text-center text-sm font-bold bg-red-50 p-2 rounded">{error}</p>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#2AA5A3] shadow-[5px_4px_0px_0px_#000000] p-3 rounded-xl text-white font-semibold hover:-translate-y-1 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#000000] transition-all"
                        >
                            {isLoading ? 'Verifying...' : 'Verify Code'}
                        </button>
                    </form>

                    <div className="text-center mt-6 text-sm text-gray-600">
                        {timer > 0 ? (
                            <p>Resend code in <span className="font-bold text-[#2AA5A3]">{timer}s</span></p>
                        ) : (
                            <button 
                                onClick={() => {
                                    setTimer(60);
                                    // Add resend API call logic here if needed
                                    alert("Code resent!");
                                }} 
                                className="text-[#2AA5A3] font-bold hover:underline"
                            >
                                Resend Code
                            </button>
                        )}
                    </div>
                    
                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-400">(Preview Tip: Use code 123456)</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}