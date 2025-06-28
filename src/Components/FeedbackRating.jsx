// File: src/components/FeedbackRating.jsx
import React, { useState, useCallback } from 'react';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

export default function FeedbackRating({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleStarClick = useCallback((value) => {
    setRating(value);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send rating and comment
    if (onSubmit) {
      await onSubmit({ rating, comment });
    }
    // reset
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Your Feedback Matters</h2>
        <p className="text-gray-600 mb-4 text-sm">
          How satisfied are you after using the Munim application?
        </p>

        {/* Star Rating */}
        <div className="flex space-x-1 mb-4 border border-gray-200 rounded-lg px-3 py-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => handleStarClick(star)}
              className="focus:outline-none"
            >
              {rating >= star ? (
                <StarSolid className="w-6 h-6 text-yellow-400" />
              ) : (
                <StarOutline className="w-6 h-6 text-gray-300 hover:text-gray-400" />
              )}
            </button>
          ))}
        </div>

        {/* Comment Box and Submit */}
        {rating > 0 && (
          <>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 1000))}
              placeholder="Let us know your valuable feedback that how we can improve!"
              className="w-full h-24 p-2 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 resize-none mb-1"
            />
            <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
              <span>{comment.length}/1000</span>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}
