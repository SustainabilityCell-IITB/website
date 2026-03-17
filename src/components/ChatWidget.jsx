import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ===========================================
// API Configuration
// ===========================================
const API_BASE_URL = 'https://sustainability-chatbot-api.onrender.com';
// ===========================================

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionId] = useState(() => {
    const stored = localStorage.getItem('chatSessionId');
    if (stored) return stored;
    const newId = 'sess_' + Math.random().toString(36).substr(2, 16);
    localStorage.setItem('chatSessionId', newId);
    return newId;
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check API health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
          setIsConnected(true);
        }
      } catch (error) {
        console.error('API health check failed:', error);
        setTimeout(checkHealth, 5000);
      }
    };
    checkHealth();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text = inputValue) => {
    const message = text.trim();
    if (!message || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: message, session_id: sessionId })
      });

      const data = await response.json();

      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'The server is waking up. Please wait a moment and try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    setMessages([]);
    try {
      await fetch(`${API_BASE_URL}/api/clear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId })
      });
    } catch (e) {
      // Ignore errors
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestions = [
    'What is the Sustainability Cell?',
    'What events do you organize?',
    'How can I join?',
    'What is Green Cup?'
  ];

  // Determine window classes based on state
  const getWindowClasses = () => {
    if (isMaximized) {
      // Fullscreen on all devices
      return 'inset-2 sm:inset-4 rounded-2xl sm:rounded-3xl';
    }
    // Mobile: nearly full screen, Desktop: fixed size popup
    return 'inset-2 sm:bottom-24 sm:right-6 sm:left-auto sm:top-auto sm:w-[420px] sm:h-[600px] rounded-2xl';
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed z-50 bg-white shadow-2xl flex flex-col overflow-hidden border border-gray-200 ${getWindowClasses()}`}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r from-green-700 to-green-600 text-white ${isMaximized ? 'p-4 sm:p-6' : 'p-3 sm:p-4'}`}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`bg-white/20 rounded-xl flex items-center justify-center ${isMaximized ? 'w-12 h-12 sm:w-14 sm:h-14 text-2xl sm:text-3xl' : 'w-9 h-9 sm:w-10 sm:h-10 text-lg sm:text-xl'}`}>
                  🌱
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate ${isMaximized ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}>Sustainability Cell</h3>
                  <div className={`flex items-center gap-2 text-green-100 ${isMaximized ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
                    <span className={`rounded-full flex-shrink-0 ${isConnected ? 'bg-green-300' : 'bg-yellow-400'} ${isMaximized ? 'w-2.5 h-2.5 sm:w-3 sm:h-3' : 'w-2 h-2'}`}></span>
                    <span className="truncate">{isConnected ? 'AI Assistant Online' : 'Connecting...'}</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className={`hover:bg-white/10 rounded-lg transition-colors flex-shrink-0 ${isMaximized ? 'p-2 sm:p-3' : 'p-1.5 sm:p-2'}`}
                  title={isMaximized ? "Minimize" : "Maximize"}
                >
                  {isMaximized ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={clearChat}
                  className={`hover:bg-white/10 rounded-lg transition-colors flex-shrink-0 ${isMaximized ? 'p-2 sm:p-3' : 'p-1.5 sm:p-2'}`}
                  title="Clear chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={isMaximized ? 'h-5 w-5 sm:h-7 sm:w-7' : 'h-4 w-4 sm:h-5 sm:w-5'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto bg-gray-50 ${isMaximized ? 'p-4 sm:p-8 space-y-4 sm:space-y-6' : 'p-3 sm:p-4 space-y-3 sm:space-y-4'}`}>
              {messages.length === 0 ? (
                <div className={`text-center ${isMaximized ? 'py-8 sm:py-16' : 'py-6 sm:py-8'}`}>
                  <div className={isMaximized ? 'text-5xl sm:text-7xl mb-4 sm:mb-6' : 'text-3xl sm:text-4xl mb-3 sm:mb-4'}>🌍</div>
                  <h4 className={`font-semibold text-green-700 ${isMaximized ? 'text-2xl sm:text-3xl mb-3 sm:mb-4' : 'text-base sm:text-lg mb-2'}`}>Welcome!</h4>
                  <p className={`text-gray-500 ${isMaximized ? 'text-base sm:text-xl mb-6 sm:mb-8' : 'text-xs sm:text-sm mb-3 sm:mb-4'}`}>Ask me about sustainability initiatives at IIT Bombay</p>
                  <div className={`flex flex-wrap gap-2 sm:gap-3 justify-center px-2 ${isMaximized ? 'max-w-2xl mx-auto' : ''}`}>
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(suggestion)}
                        className={`bg-white border border-green-200 text-green-700 rounded-full hover:bg-green-50 transition-colors ${
                          isMaximized ? 'text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3' : 'text-xs px-2.5 sm:px-3 py-1 sm:py-1.5'
                        }`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={isMaximized ? 'max-w-4xl mx-auto space-y-4 sm:space-y-6' : 'space-y-3 sm:space-y-4'}>
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`rounded-2xl ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-green-600 to-green-500 text-white rounded-br-md'
                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
                        } ${isMaximized ? 'max-w-[80%] sm:max-w-[70%] p-3 sm:p-5 text-base sm:text-lg' : 'max-w-[85%] p-2.5 sm:p-3 text-sm'}`}
                      >
                        <div
                          className={isMaximized ? 'prose prose-base sm:prose-lg max-w-none' : 'prose prose-sm max-w-none'}
                          dangerouslySetInnerHTML={{
                            __html: msg.role === 'assistant'
                              ? msg.content
                                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                  .replace(/\n/g, '<br>')
                                  .replace(/- (.*?)(?=<br>|$)/g, '• $1')
                              : msg.content
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isLoading && (
                <div className={`flex justify-start ${isMaximized ? 'max-w-4xl mx-auto' : ''}`}>
                  <div className={`bg-white rounded-2xl rounded-bl-md border border-gray-200 shadow-sm ${isMaximized ? 'p-3 sm:p-5' : 'p-2.5 sm:p-3'}`}>
                    <div className={`flex ${isMaximized ? 'gap-1.5 sm:gap-2' : 'gap-1'}`}>
                      <span className={`bg-green-500 rounded-full animate-bounce ${isMaximized ? 'w-2.5 h-2.5 sm:w-3 sm:h-3' : 'w-2 h-2'}`} style={{ animationDelay: '0ms' }}></span>
                      <span className={`bg-green-500 rounded-full animate-bounce ${isMaximized ? 'w-2.5 h-2.5 sm:w-3 sm:h-3' : 'w-2 h-2'}`} style={{ animationDelay: '150ms' }}></span>
                      <span className={`bg-green-500 rounded-full animate-bounce ${isMaximized ? 'w-2.5 h-2.5 sm:w-3 sm:h-3' : 'w-2 h-2'}`} style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`bg-white border-t border-gray-200 ${isMaximized ? 'p-3 sm:p-6' : 'p-2.5 sm:p-4'}`}>
              <div className={`flex gap-2 sm:gap-3 ${isMaximized ? 'max-w-4xl mx-auto' : ''}`}>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className={`flex-1 border border-gray-300 rounded-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 ${
                    isMaximized ? 'px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg' : 'px-3 sm:px-4 py-2 sm:py-2.5 text-sm'
                  }`}
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={isLoading || !inputValue.trim()}
                  className={`bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 ${
                    isMaximized ? 'px-4 sm:px-6 py-3 sm:py-4' : 'px-3 sm:px-4 py-2 sm:py-2.5'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={isMaximized ? 'h-5 w-5 sm:h-7 sm:w-7' : 'h-4 w-4 sm:h-5 sm:w-5'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
