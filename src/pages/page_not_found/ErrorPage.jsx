import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Home, RefreshCcw, AlertCircle, Ban, Database, ShieldX } from 'lucide-react';

// Common ErrorPage Component
export const ErrorPage = ({
  code,
  title,
  message,
  Icon,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800 flex items-center justify-center p-2">
      <div className="text-center">
        {/* Animated Error Code */}
        <div className="relative mb-3">
          <h1 className="text-[180px] font-bold text-white/5 select-none">
            {code}
          </h1>
          <div className="inset-0 flex items-center justify-center">
            <Icon className="w-24 h-24 text-white animate-bounce" />
          </div>
        </div>

        {/* Error Details */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 mt-3">
          {title}
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-6 py-3 rounded-full bg-white text-blue-600 
                     font-medium hover:bg-blue-50 transition-all duration-300 transform 
                     hover:scale-105 hover:shadow-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white 
                     font-medium hover:bg-blue-700 transition-all duration-300 transform 
                     hover:scale-105 hover:shadow-lg"
          >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  code: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};

// 403 Forbidden Page
export const Error403 = () => (
  <ErrorPage
    code="403"
    title="Access Forbidden"
    message="Sorry, you don't have permission to access this page."
    Icon={Ban}
  />
);

// 404 Not Found Page
export const Error404 = () => (
  <ErrorPage
    code="404"
    title="Page Not Found"
    message="Oops! The page you're looking for doesn't exist."
    Icon={AlertCircle}
  />
);

// 500 Server Error Page
export const Error500 = () => (
  <ErrorPage
    code="500"
    title="Server Error"
    message="Sorry, something went wrong on our servers."
    Icon={Database}
  />
);

// 503 Service Unavailable Page
export const Error503 = () => (
  <ErrorPage
    code="503"
    title="Service Unavailable"
    message="Our service is currently undergoing maintenance."
    Icon={ShieldX}
  />
);

console.clear();
