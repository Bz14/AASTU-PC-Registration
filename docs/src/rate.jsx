import { useState } from 'react';

const RateUs = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (rating) => {
    setRating(rating);
  };


  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    // Submit the rating and feedback (e.g., to the backend API)
    console.log('Rating:', rating, 'Feedback:', feedback);
    setSubmitted(true);
  };

  return (
    <dv>Rate us</dv>
    // <div className="rate-us-container">
    //   <h2>Rate Us</h2>
    //   <div className="rating-stars">
    //     {[1, 2, 3, 4, 5].map((star) => (
    //       <span
    //         key={star}
    //         className={star ${rating >= star ? 'filled' : ''}}
    //         onClick={() => handleRating(star)}
    //       >
    //         ★
    //       </span>
    //     ))}
    //   </div>
    //   <textarea
    //     value={feedback}
    //     onChange={handleFeedbackChange}
    //     placeholder="Share your feedback..."
    //     rows="4"
    //     className="feedback-textarea"
    //   />
    //   <button onClick={handleSubmit} className="submit-button">
    //     Submit
    //   </button>
    //   {submitted && <p className="confirmation-message">Thank you for your feedback!</p>}
    // </div>
    //react is javascript library.  we use for our pc registrationn 

  );
};

export default RateUs;