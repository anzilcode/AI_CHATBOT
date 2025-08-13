import { UserIcon } from '@heroicons/react/24/outline';
import logo from '../assets/abhinavu_ai_logo.png';

const ChatMessage = ({ message, isAi }) => {
  return (
    <div
      className={`max-w-7xl mx-auto flex items-start space-x-4 p-4 sm:p-6 rounded-2xl transition-colors duration-200
        ${isAi ? 'bg-gray-800' : 'bg-gray-700'} shadow-lg`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 rounded-full overflow-hidden p-1 
          ${isAi ? 'bg-gray-700' : 'bg-gray-600'}`}
      >
        {isAi ? (
          <img
            src={logo}
            alt="Abhinavu AI Logo"
            className="h-10 w-10 object-cover rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-600">
            <UserIcon className="h-6 w-6 text-green-400" />
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-2">
        {/* Sender Name */}
        <div className="flex items-center">
          <p className={`font-medium ${isAi ? 'text-pink-400' : 'text-green-400'}`}>
            {isAi ? 'Abhinavu AI Assistant' : 'You'}
          </p>
        </div>

        {/* Message Text */}
        <div className="max-w-full">
          <p className="text-gray-200 text-base leading-relaxed whitespace-pre-wrap break-words">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
