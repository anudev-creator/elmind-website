"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Smartphone, Laptop, School, User, 
  RefreshCw, LogOut, MapPin, BadgeCheck, Lock, Trash2
} from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_PUBLIC_URL;
const INACTIVITY_LIMIT_MS = 5 * 60 * 1000; // 5 Minutes timeout

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [school, setSchool] = useState(null);
  const [devices, setDevices] = useState([]);
  
  // Reset Password State
  const [showResetModal, setShowResetModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [resetStatus, setResetStatus] = useState({ loading: false, message: '', error: false });

  // Timer Reference
  const timerRef = useRef(null);

  // ---------------------------------------------------------
  // 1. AUTH & SECURITY LOGIC
  // ---------------------------------------------------------
  const logout = () => {
    sessionStorage.clear(); 
    localStorage.removeItem('phoneNumber');
    window.location.href = '/'; 
  };

  const resetInactivityTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      alert("Session expired due to inactivity.");
      logout();
    }, INACTIVITY_LIMIT_MS);
  };

  // ---------------------------------------------------------
  // 2. FETCH DATA & SETUP LISTENERS ON LOAD
  // ---------------------------------------------------------
  useEffect(() => {
    const token = sessionStorage.getItem('elmind_access_token');
    const phone = sessionStorage.getItem('elmind_user_phone');

    // Security: Copy/Paste URL protection
    if (!token || !phone) {
       window.location.href = '/';
       return;
    }

    // Fetch Profile Data
    const fetchData = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/AccountManagingSystem/api/get-user-profile`, {
          phone: phone
        });

        if (response.data.success) {
          setUser(response.data.user);
          setSchool(response.data.school);
          setDevices(response.data.loginHistory);
        } else {
          alert("Could not fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Setup Inactivity Listeners
    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetInactivityTimer));
    
    // Start initial timer
    resetInactivityTimer();

    // Cleanup on unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
    };
  }, []);

  // ---------------------------------------------------------
  // 3. HANDLE DEVICE REMOVAL
  // ---------------------------------------------------------
  const handleRemoveDevice = async (uuid) => {
    if(!confirm("Are you sure you want to sign out this device?")) return;

    try {
        const response = await axios.post(`${API_BASE_URL}/AccountManagingSystem/api/revoke-device`, {
            device_uuid: uuid,
            role: user.role
        });
        
        if(response.data.success) {
            setDevices(devices.filter(d => d.id !== uuid));
        }
    } catch(error) {
        alert("Failed to remove device");
    }
  };

  // ---------------------------------------------------------
  // 4. HANDLE PASSWORD RESET
  // ---------------------------------------------------------
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetStatus({ loading: true, message: '', error: false });

    const token = sessionStorage.getItem('elmind_access_token');
    const phone = sessionStorage.getItem('elmind_user_phone');

    try {
      const response = await axios.post(`${API_BASE_URL}/AccountManagingSystem/api/reset-password`, {
        token: token,
        phone: phone,
        newPassword: newPassword
      });

      if (response.data.success) {
        setResetStatus({ loading: false, message: 'Password updated successfully!', error: false });
        setTimeout(() => {
          setShowResetModal(false);
          setNewPassword('');
          setResetStatus({ loading: false, message: '', error: false });
        }, 2000);
      } else {
        setResetStatus({ loading: false, message: response.data.message || 'Failed to reset', error: true });
      }
    } catch (error) {
      setResetStatus({ loading: false, message: 'Server connection failed.', error: true });
    }
  };
  
  // Helper for badge colors
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'HEADMASTER': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'TEACHER': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'STUDENT': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading || !user) return <div className="h-screen flex items-center justify-center">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-slate-800 relative">
      
      {/* Top Nav */}
      <nav className="flex justify-between items-center max-w-5xl mx-auto mb-6">
        <div className="font-bold text-xl">Elmind.</div>
        <button onClick={logout} className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-medium">
          <LogOut size={16} /> Logout
        </button>
      </nav>

      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-[#2AA5A3] to-slate-800"></div>
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-4 gap-4">
              <div className="relative">
                {user.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-2xl border-4 border-white shadow-md bg-white object-cover"/>
                ) : (
                    <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-md bg-white flex items-center justify-center text-3xl font-bold text-slate-300">
                       {user.name.charAt(0)}
                    </div>
                )}
              </div>
              
              <div className="flex-1 pt-2">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <span className={`px-3 py-0.5 text-xs font-semibold rounded-full border ${getRoleBadgeColor(user.role)}`}>
                    {user.role}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><BadgeCheck size={14} /> {user.id}</span>
                  <span className="flex items-center gap-1"><Smartphone size={14} /> {user.phone}</span>
                </div>
              </div>

              <button onClick={() => setShowResetModal(true)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2">
                <Lock size={16} /> Reset Password
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* School Details */}
          <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
              <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                <School className="text-slate-500" size={20} />
                <h2 className="font-semibold text-gray-900">School Details</h2>
              </div>
              <div className="h-32 w-full bg-gray-200 relative">
                 {school.image ? (
                    <img src={school.image} className="w-full h-full object-cover" alt="School" />
                 ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white/20"><School size={40} /></div>
                 )}
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase">Institution</label>
                  <p className="text-sm font-medium text-gray-900">{school.name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase">Code</label>
                  <p className="text-sm font-medium font-mono bg-gray-50 inline-block px-2 py-1 rounded border">{school.code}</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="text-gray-400 mt-0.5" size={16} />
                  <p className="text-sm text-gray-600">{school.address}</p>
                </div>
              </div>
          </div>

          {/* Device History */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 h-fit">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Shield className="text-slate-500" size={20} />
                  <h2 className="font-semibold text-gray-900">Device History</h2>
                </div>
              </div>

              <div className="p-2">
                {devices.length === 0 && <p className="p-4 text-center text-gray-400">No device history found.</p>}
                
                {devices.map((session) => (
                  <div key={session.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                    <div className="p-2 rounded-lg bg-gray-100 text-gray-500">
                      {session.type === 'mobile' ? <Smartphone size={20} /> : <Laptop size={20} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{session.device}</p>
                      <p className="text-xs text-gray-500">{session.os} • {session.date}</p>
                    </div>
                    {/* DELETE DEVICE BUTTON */}
                    <button 
                        onClick={() => handleRemoveDevice(session.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all" 
                        title="Sign out this device"
                    >
                        <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>

      {/* 5. RESET PASSWORD MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg">Reset Password</h3>
              <button onClick={() => setShowResetModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <form onSubmit={handlePasswordReset} className="p-6 space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                For security, entering a new password will invalidate your current session token after update.
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-[#2AA5A3] focus:ring-2 focus:ring-[#2AA5A3]/20"
                  placeholder="Enter new password"
                  required
                />
              </div>

              {resetStatus.message && (
                 <div className={`text-sm p-2 rounded ${resetStatus.error ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                   {resetStatus.message}
                 </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowResetModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={resetStatus.loading}
                  className="flex-1 px-4 py-2 bg-[#2AA5A3] text-white rounded-lg font-medium hover:bg-[#238b89] flex justify-center items-center gap-2"
                >
                   {resetStatus.loading && <RefreshCw className="animate-spin" size={16} />}
                   Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}