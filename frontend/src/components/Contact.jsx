import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
import { BsClipboardPulse } from 'react-icons/bs';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    message: '',
    userType: 'patient'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/upload');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password, formData.userType);
      } else {
        const userData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          userType: formData.userType,
          medicalHistory: formData.message,
          licenseNumber: formData.licenseNumber,
          specialization: formData.specialization,
          createdAt: new Date().toISOString()
        };
        await signup(formData.email, formData.password, userData);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message || (isLogin ? 'Failed to login' : 'Failed to create account'));
    } finally {
      setLoading(false);
    }
  };

  const UserTypeSelector = () => (
    <div className="mb-6">
      <label className="text-gray-700 font-medium mb-2 block">Login as:</label>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setFormData({ ...formData, userType: 'patient' })}
          className={`p-4 rounded-lg border-2 transition-all ${
            formData.userType === 'patient'
              ? 'border-[#03e9f4] bg-[#03e9f4]/10 text-[#006992]'
              : 'border-gray-200 hover:border-[#03e9f4]/50'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
            <span className="font-medium">Patient</span>
            <span className="text-xs text-gray-500">
              Access your medical reports
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setFormData({ ...formData, userType: 'doctor' })}
          className={`p-4 rounded-lg border-2 transition-all ${
            formData.userType === 'doctor'
              ? 'border-[#03e9f4] bg-[#03e9f4]/10 text-[#006992]'
              : 'border-gray-200 hover:border-[#03e9f4]/50'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
              />
            </svg>
            <span className="font-medium">Doctor</span>
            <span className="text-xs text-gray-500">
              Analyze medical reports
            </span>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F0F7FF] to-white px-4 pt-24 pb-12">
      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <BsClipboardPulse className="text-3xl text-[#006992]" />
            <h1 className="text-3xl font-bold text-[#006992]">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h1>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Selection for both Login and Register */}
            <UserTypeSelector />

            {!isLogin && (
              <>
                <div className="relative">
                  <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#03e9f4] focus:ring-1 focus:ring-[#03e9f4] transition-colors"
                    required={!isLogin}
                  />
                </div>

                <div className="relative">
                  <AiOutlinePhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#03e9f4] focus:ring-1 focus:ring-[#03e9f4] transition-colors"
                    required={!isLogin}
                  />
                </div>
              </>
            )}

            <div className="relative">
              <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#03e9f4] focus:ring-1 focus:ring-[#03e9f4] transition-colors"
                required
              />
            </div>

            <div className="relative">
              <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#03e9f4] focus:ring-1 focus:ring-[#03e9f4] transition-colors"
                required
                minLength="6"
              />
            </div>

            {/* Additional fields based on user type for registration */}
            {!isLogin && formData.userType === 'doctor' && (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Medical License Number"
                    value={formData.licenseNumber || ''}
                    onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                    className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#03e9f4] focus:ring-1 focus:ring-[#03e9f4] transition-colors"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Specialization"
                    value={formData.specialization || ''}
                    onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                    className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#03e9f4] focus:ring-1 focus:ring-[#03e9f4] transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            {!isLogin && formData.userType === 'patient' && (
              <div className="relative">
                <textarea
                  placeholder="Medical History or Additional Information"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#03e9f4] focus:ring-1 focus:ring-[#03e9f4] transition-colors"
                  rows="4"
                />
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                className="text-sm text-[#03e9f4] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#03e9f4] text-white py-3 rounded-lg hover:bg-[#02c4d3] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Please wait...
                </div>
              ) : (
                isLogin ? 'Login' : 'Create Account'
              )}
            </button>

            <p className="text-center mt-4 text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phone: '',
                    message: '',
                    userType: 'patient'
                  });
                }}
                className="text-[#03e9f4] hover:underline font-medium"
              >
                {isLogin ? 'Register here' : 'Login here'}
              </button>
            </p>
          </form>
        </motion.div>

        {/* Image Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          clssName="hidden lg:block"
        >
          <div className="max-w-md mx-auto">
            <img 
              src="/src/assets/img/contact.png" 
              alt="Healthcare" 
              className="w-full h-[400px] rounded-2xl shadow-2xl object-cover"
            />
            <div className="mt-6 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-[#006992] mb-2">
                {isLogin ? 'Access Your Health Records' : 'Join HealthEase Today'}
              </h2>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Securely access your medical reports and health information in one place.'
                  : 'Create an account to manage your health records, upload reports, and track your medical history.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact; 