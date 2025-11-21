"use client";
import { useState, useEffect } from 'react';

// Mock Components
const MenuBar = () => <nav className="p-4 shadow bg-white flex justify-between items-center"><span className="font-bold">Elmind.</span><span className="text-xs text-gray-400">Secure Session</span></nav>;
const Footer = () => <footer className="p-4 text-center text-gray-500 text-xs">© 2024 Elmind Inc.</footer>;

// Mock Router for Preview Environment (Replaces next/navigation)
const useRouter = () => {
    return {
        push: (path) => {
            console.log(`[Router Push]: ${path}`);
            if(path === '/login') alert("Success! Redirecting to Login Page...");
        },
        replace: (path) => {
            console.log(`[Router Replace]: ${path}`);
            if(path === '/') alert("Security Redirect: Returning to Home/Login...");
        }
    };
};

export default function ResetPasswordSecure() {
    const router = useRouter();
    
    // State
    const [authorized, setAuthorized] = useState(false);
    const [passwords, setPasswords] = useState({ new: '', confirm: '' });
    const [status, setStatus] = useState({ loading: false, error: '', success: false });
    
    // Security Data
    const [secureData, setSecureData] = useState({ token: '', phone: '' });

    useEffect(() => {
        // ==================================================
        // 🔒 LEVEL 1: SESSION STORAGE CHECK (No Copy/Paste)
        // ==================================================
        // In a real scenario, these are set by the previous page. 
        // For PREVIEW PURPOSES ONLY: We simulate them if missing so you can see the UI.
        // Remove the `|| '...'` fallbacks in production!
        const storedToken = sessionStorage.getItem('elmind_access_token');
        const storedPhone = sessionStorage.getItem('elmind_user_phone');

        // Strict Check
        if (!storedToken || !storedPhone) {
            console.warn("Security Breach: No token found. Direct access attempt.");
            // For preview visualization, we might want to allow it, but strictly adhering to your rules:
            // router.replace('/'); 
            // return;
            
            // SIMULATION FOR PREVIEW (Remove in Production)
            if (!sessionStorage.getItem('elmind_access_token')) {
                console.log("Preview Mode: Simulating Token...");
                sessionStorage.setItem('elmind_access_token', 'PREVIEW-TOKEN-123');
                sessionStorage.setItem('elmind_user_phone', '9876543210');
            }
        }

        // ==================================================
        // 🔒 LEVEL 2: RELOAD DETECTION (No Reload)
        // ==================================================
        // We check if this specific page session has been "touched" already.
        if (sessionStorage.getItem('elmind_page_visited')) {
             console.warn("Security Breach: Page Reload Detected.");
             
             // Clear credentials immediately
             sessionStorage.clear();
             
             // Using a slight delay to ensure the render happens before alert
             setTimeout(() => {
                alert("Security Alert: Page reload detected. For your security, the session has been terminated.");
                router.replace('/'); 
             }, 100);
             setAuthorized(false);
             return;
        }

        // Mark page as visited. If they F5 refresh, the check above ^ will trigger.
        sessionStorage.setItem('elmind_page_visited', 'true');

        // ==================================================
        // ✅ ACCESS GRANTED
        // ==================================================
        setSecureData({ 
            token: sessionStorage.getItem('elmind_access_token'), 
            phone: sessionStorage.getItem('elmind_user_phone') 
        });
        setAuthorized(true);

    }, []);


    const handleReset = async (e) => {
        e.preventDefault();
        setStatus({ ...status, error: '' });

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(passwords.new)) {
             return setStatus({ ...status, error: 'Password must be 6+ chars with Upper, Lower & Number.' });
        }

        if (passwords.new !== passwords.confirm) {
            return setStatus({ ...status, error: "Passwords don't match" });
        }

        setStatus({ ...status, loading: true });

        try {
            const baseUrl = process.env.NEXT_PUBLIC_PUBLIC_URL || 'http://localhost:5000';
            
            // Mocking Fetch for Preview
            // const res = await fetch(...) 
            
            // Simulating Network Delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simulating Success
            const success = true; 

            if (success) {
                setStatus({ loading: false, error: '', success: true });
                
                // 🔒 LEVEL 3: CLEANUP
                // Wipe everything so back button doesn't work
                sessionStorage.clear();
            } else {
                setStatus({ loading: false, error: "Server Error", success: false });
            }
        } catch (err) {
            setStatus({ loading: false, error: "Connection Failed", success: false });
        }
    };

    // 1. Unauthorized View (Loading or Blank)
    if (!authorized) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                <p className="text-gray-500 text-sm">Verifying Security Token...</p>
            </div>
        </div>
    );

    // 2. Success View
    if (status.success) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                 <div className="w-full max-w-md bg-white rounded-2xl shadow-[5px_4px_0px_0px_#2AA5A3] border-2 border-[#2AA5A3] p-8 text-center">
                    <div className="text-5xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Password Changed!</h2>
                    <p className="mb-6 text-gray-600 text-sm">Your account is secure. The session has been terminated.</p>
                    <button onClick={() => router.push('/login')} className="w-full bg-black text-white font-bold p-3 rounded-xl shadow-lg hover:translate-y-1 transition-all">Go to Login</button>
                </div>
            </div>
        );
    }

    // 3. Form View
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <MenuBar />
            <div className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-[5px_5px_0px_0px_#000] border-2 border-black p-8 relative overflow-hidden">
                    
                    {/* Security Badge */}
                    <div className="absolute top-0 right-0 bg-red-50 text-red-500 text-[10px] font-bold px-3 py-1 border-b border-l border-red-100">
                        NO RELOAD ALLOWED
                    </div>

                    <h2 className="text-2xl font-bold mb-2">Secure Reset</h2>
                    <p className="text-xs text-gray-500 mb-6">
                        Session ID: <span className="font-mono bg-gray-100 px-1 rounded">{secureData.token ? secureData.token.substring(0, 8) + '...' : 'Loading...'}</span>
                    </p>
                    <p className="text-xs text-gray-400 mb-4 italic">
                        Note: Reloading this page will invalidate your session.
                    </p>

                    <form onSubmit={handleReset} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-700 uppercase">New Password</label>
                            <input 
                                type="password" 
                                placeholder="Min 6 chars, Upper, Lower, Number"
                                className="w-full mt-1 p-3 border-2 border-gray-200 rounded-xl focus:border-[#2AA5A3] outline-none transition-colors"
                                value={passwords.new}
                                onChange={e => setPasswords({...passwords, new: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-700 uppercase">Confirm Password</label>
                            <input 
                                type="password" 
                                placeholder="Retype password"
                                className="w-full mt-1 p-3 border-2 border-gray-200 rounded-xl focus:border-[#2AA5A3] outline-none transition-colors"
                                value={passwords.confirm}
                                onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                                required
                            />
                        </div>

                        {status.error && <p className="text-red-500 text-xs font-bold text-center bg-red-50 p-2 rounded border border-red-100">{status.error}</p>}

                        <button 
                            type="submit" 
                            disabled={status.loading}
                            className="w-full bg-[#2AA5A3] text-white font-bold py-4 rounded-xl shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status.loading ? "Securing Account..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}