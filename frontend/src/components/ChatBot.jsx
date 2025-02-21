import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineClose, AiOutlineSend } from 'react-icons/ai';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your HealthEase assistant. I can help you with:\n• Understanding medical reports\n• General health queries\n• Finding doctors\n• Medical terminology",
      isBot: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  const API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userInput) => {
    try {
      const response = await axios.post(
        API_URL,
        {
          inputs: `Answer this health-related question: ${userInput}`,
        },
        {
          headers: {
            'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data[0].generated_text;
    } catch (error) {
      console.error('API Error:', error);
      return "I apologize, but I'm having trouble connecting to the server. Please try again later.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await generateResponse(inputMessage);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, {
        text: "I apologize, but I'm having trouble responding. Please try again.",
        isBot: true
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Simplified toggle function with console log for debugging
  const toggleChat = () => {
    console.log('Current isOpen:', isOpen); // Debug log
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Simplified Chat Button */}
      <button
        onClick={toggleChat}
        className="relative group flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#03e9f4] to-[#02c4d3] rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="absolute inset-0 rounded-full bg-[#03e9f4] animate-ping opacity-25"></div>
        <RiCustomerService2Fill className="text-3xl text-white relative z-10" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-800">Need help?</div>
          <div className="text-xs text-gray-500">Chat with our AI assistant</div>
          <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#03e9f4] to-[#02c4d3] p-4 flex justify-between items-center">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <RiCustomerService2Fill className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="font-semibold">HealthEase Assistant</h3>
                <span className="text-xs text-white/80">Online</span>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <AiOutlineClose className="text-xl text-white" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="h-[calc(500px-140px)] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-[#03e9f4] text-white'
                  }`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form 
            onSubmit={handleSendMessage} 
            className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#03e9f4] focus:ring-2 focus:ring-[#03e9f4]/20 text-gray-700 placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="p-3 bg-[#03e9f4] text-white rounded-xl hover:bg-[#02c4d3] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[44px] shadow-md hover:shadow-lg"
              >
                <AiOutlineSend className="text-xl" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;