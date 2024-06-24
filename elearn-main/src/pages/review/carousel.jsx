// Carousel.js
import React, { useState, useEffect } from 'react';

const reviews = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
    name: "Student Name 1",
    caption:
      '"This course completely changed my perspective on [subject].  The instructors were amazing, and I made lifelong friends."'
  },
  {
    id: 2,
    image: "https://media.istockphoto.com/id/661799106/photo/portrait-of-a-young-french-man.jpg?s=612x612&w=0&k=20&c=M-8ccbYQZCvQWmKLLyDF5mYjF3KaBTQwX6HDdzvw_pk=",
    name: "Student Name 2",
    caption:
      '"This course completely changed my perspective on [subject].  The instructors were amazing, and I made lifelong friends.This course completely changed my perspective on [subject].  The instructors were amazing, and I made lifelong friends.This course completely changed my perspective on [subject].  The instructors were amazing, and I made lifelong friends."'
  },
  {
    id: 3,
    image: "https://media.istockphoto.com/id/1365601848/photo/portrait-of-a-young-woman-carrying-her-schoolbooks-outside-at-college.jpg?s=612x612&w=0&k=20&c=EVxLUZsL0ueYFF1Nixit6hg-DkiV52ddGw_orw9BSJA=",
    name: "Student Name 3",
    caption:
      '"This course completely changed my perspective on [subject].  This course completely changed my perspective on [subject].  The instructors were amazing, and I made lifelong friends.The instructors were amazing, and I made lifelong friends."'
  },
  {
    id: 4,
    image: "https://img.freepik.com/free-photo/happiness-wellbeing-confidence-concept-cheerful-attractive-african-american-woman-curly-haircut-cross-arms-chest-self-assured-powerful-pose-smiling-determined-wear-yellow-sweater_176420-35063.jpg",
    name: "Student Name 4",
    caption:
      '"This course completely changed my perspective on [subject].  The instructors were amazing, and I made lifelong friends.This course completely changed my perspective on [subject].  The instructors were amazing, and I made lifelong friends."'
  },
  {
    id: 5,
    image: "https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg",
    name: "Student Name 5",
    caption:
      '"This course completely changed my perspective on [subject].  The instructors were amazing, and I made lifelong friends."'
  }
];

function CarouselView() {
  const [index, setIndex] = useState(0);
  const timeoutRef = React.useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        ),
      2500
    );
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [index]);

  const handleDotClick = (idx) => {
    setIndex(idx);
    clearTimeout(timeoutRef.current);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-wrapper"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {reviews.map((review, idx) => (
          <div className="carousel-item" key={review.id}>
            <img src={review.image} alt={review.name} />
            <div className="carousel-caption">
              <h3>{review.name}</h3>
              <p>{review.caption}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="slideshowDots">
        {reviews.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => handleDotClick(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default CarouselView;
