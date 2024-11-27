import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import logo from '../../assets/images/omni-logos/omnicontact-logo-white.png';
import authService from '../../services/auth.service';
// import PropTypes from 'prop-types';
import useToken from '../../hooks/useToken';

export const LoginPage = () => {
  const { setToken } = useToken();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { username, password };
    try {
      const response = await authService.login(data);

      if (response.status === 200) {
        message.success("User logged in successfully")
        setToken(response?.data);
        window.location.replace('/')
      } else {
        message.error('Account with given credentials not found');
      }
    } catch (error) {
      console.error('Error during login:', error);
      message.error('Account with given credentials not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-8 w-full max-w-md transform transition-all duration-300 hover:shadow-2xl">
        <div className="text-center py-5">
          <div className="flex items-center justify-center mb-2">
            <img src={logo} className='w-48 h-20 transition-colors duration-300' alt="logo" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-300">Login to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-3">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent transition-all duration-300"
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white 
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded 
                           transition-all duration-300"
              />
              <label className="ml-2 block text-sm text-white">Remember me</label>
            </div>
            <a href="#" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} 
                       font-medium transform transition-all duration-300 hover:scale-105 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/landing-page')}
            className="w-full text-center text-sm text-gray-300 hover:text-white transition-colors mt-4 pb-3"
          >
            ← Back to home
          </button>
        </form>
      </div>
    </div>
  );
};
// LoginPage.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };
