import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AiFillStar } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';

const Feedback = ({ reportId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would integrate with your backend
      const feedbackData = {
        userId: user.uid,
        reportId,
        rating,
        comment,
        timestamp: new Date().toISOString()
      };
      
      console.log('Feedback submitted:', feedbackData);
      // Add your API call here
      
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#006992] mb-4">
          How was your experience?
        </h2>
        
        {/* Star Rating */}
        <div className="flex justify-center space-x-2 mb-6">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <button
                key={ratingValue}
                type="button"
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <AiFillStar
                  className={`text-3xl ${
                    ratingValue <= (hover || rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your feedback helps us improve
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you think about the report summarization..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#03e9f4] focus:ring-1 focus:ring-[#03e9f4] min-h-[100px]"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !rating}
              className={`px-6 py-2 bg-[#03e9f4] text-white rounded-lg transition-all
                ${loading || !rating 
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-[#02c4d3] hover:scale-[1.02]'
                }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </div>
              ) : (
                'Submit Feedback'
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Feedback; 