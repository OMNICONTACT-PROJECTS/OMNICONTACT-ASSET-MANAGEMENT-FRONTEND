import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/omni-logos/omnicontact-logo-white.png';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center mt-2">
              <img src={logo} className='w-28 h-12 mt-2 transition-colors duration-300' alt="logo" />
              {/* <span className={`ml-2 text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                OmniContact AMS
              </span> */}
            </div>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 
                       transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 mix-blend-multiply" />
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10" />
          </div>
        </div>

        <div className="relative px-4 py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-fade-in-up">
            OmniContact Asset Management
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
            Intelligent Asset Management System for transforming asset tracking,
            streamlining operations, reducing costs and boosting efficiency
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold 
                     hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 
                     hover:shadow-xl inline-flex items-center group"
          >
            Get Started Now
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};