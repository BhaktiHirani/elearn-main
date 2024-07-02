import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Reviews = ({ reviews, handleReviewSubmit, rating, setRating, hover, setHover }) => {
  return (
    <div className="bg-light p-4 rounded shadow">
      <h2>Student Reviews</h2>
      {reviews.length > 0 ? reviews.map((review, index) => (
        <div key={index} className="mb-3">
          <div className="d-flex justify-content-between">
            <span className="text-warning">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
            <span>{review.reviewerName}</span>
          </div>
          <p>{review.comment}</p>
        </div>
      )) : <p>No reviews yet.</p>}
      <h3>Leave a Review</h3>
      <form onSubmit={handleReviewSubmit}>
        <label htmlFor="rating">Rating:</label>
        <div className="star-rating">
          {Array.from({ length: 5 }, (_, i) => (
            <button
              type="button"
              key={i}
              className={`btn btn-link p-0 ${i < (hover || rating) ? 'text-warning' : 'text-muted'}`}
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHover(i + 1)}
              onMouseLeave={() => setHover(rating)}
            >
              <FontAwesomeIcon icon={faStar} />
            </button>
          ))}
        </div>
        <label htmlFor="comment">Comment:</label>
        <textarea id="comment" name="comment" rows="4"></textarea>
        <button type="submit" className="btn btn-primary">Submit Review</button>
      </form>
    </div>
  );
};

export default Reviews;
