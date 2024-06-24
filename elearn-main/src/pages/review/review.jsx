import React from 'react';
import './review.css';
import Carousel from './carousel';

const CourseReview = () => {
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

  return (
    <div className="course-page">
      <h1>Our Students Say</h1>
      <div>

<Carousel reviews={reviews} />

</div>
        
    </div>
  );
};

export default CourseReview;
