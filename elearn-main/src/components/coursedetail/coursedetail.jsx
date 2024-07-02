// CourseDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import 'bootstrap/dist/css/bootstrap.min.css';
import './coursedetail.css';

import CourseDescription from './components/CourseDescription';
import InstructorDetails from './components/InstructorDetails';
import Reviews from './components/Reviews';
import ModuleNavigation from './components/ModuleNavigation';
import VideoPlayer from './components/VideoPlayer'; // Import VideoPlayer component

const CourseDetail = ({ userName, userEmail }) => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [error, setError] = useState(null); // State for error feedback

  useEffect(() => {
    const fetchCourse = () => {
      const db = getDatabase();
      const courseRef = ref(db, `user/courses/${id}`);
      onValue(courseRef, (snapshot) => {
        const data = snapshot.val();
        setCourse(data);
      }, (error) => {
        console.error('Error fetching course:', error);
      });
    };

    const fetchReviews = () => {
      const db = getDatabase();
      const reviewsRef = ref(db, `user/courses/${id}/reviews`);
      onValue(reviewsRef, (snapshot) => {
        const reviewsData = snapshot.val();
        if (reviewsData) {
          const reviewsArray = Object.values(reviewsData);
          setReviews(reviewsArray);
        } else {
          setReviews([]);
        }
      }, (error) => {
        console.error('Error fetching reviews:', error);
      });
    };

    fetchCourse();
    fetchReviews();
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    if (rating && comment && userEmail && id) {
      const db = getDatabase();
      const reviewsRef = ref(db, `user/courses/${id}/reviews`);
      const newReviewRef = push(reviewsRef);
      set(newReviewRef, {
        rating,
        comment,
        reviewerName: userName || "Anonymous",
        reviewerEmail: userEmail || "anonymous@example.com"
      })
      .then(() => {
        console.log('Review submitted successfully');
        setRating(0); // Reset rating after submission
        setError(null);
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
        setError('Error submitting review. Please try again later.'); // Set error message for UI feedback
      });
      e.target.reset();
    } else {
      console.error('Missing required fields for review submission');
      setError('Please fill in all required fields.'); // Set error message for UI feedback
    }
  };

  const handleModuleChange = (index) => {
    setCurrentModuleIndex(index);
  };

  const handleEnroll = (userId, courseId) => {
    const db = getDatabase();
    const enrolledUsersRef = ref(db, `user/${courseId}/enrolled_users`);
    set(enrolledUsersRef, {
      [userId]: true
    })
      .then(() => {
        console.log('User enrolled successfully');
      })
      .catch((error) => {
        console.error("Error enrolling user:", error);
      });
  };

  if (!course) {
    return <div className="error">Course not found</div>;
  }

  const { title, ImgUrl, rating: courseRating, price, mediaUrl, description, modules, instructor } = course;
  const currentModule = modules && modules[currentModuleIndex];
  const totalModules = modules ? modules.length : 0;

  return (
    <div className="container py-5">
      <div className="row align-items-center mb-4">
        <div className="col-md-6 animate__animated animate__fadeInLeft">
          <img src={ImgUrl} alt={title} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6 animate__animated animate__fadeInRight">
          <h1 className="display-4">{title}</h1>
          <p className="lead">Rating: {courseRating}</p>
          <p className='lead'>Total Modules: {totalModules}</p>
          <p className="h4">{price ? `$${price}` : 'Free'}</p>
          <div className="button-container mt-3">
            <Link
              to={{
                pathname: `/enroll/${id}`,
                state: {
                  userName,
                  userEmail,
                  courseId: id,
                  handleEnroll: handleEnroll
                }
              }}
              className="btn btn-primary enroll-button"
            >
              Enroll Now
            </Link>
            <Link
              to={{
                pathname: `/quiz/${id}`,
                state: {
                  userName,
                  userEmail,
                  courseId: id,
                }
              }}
              className="btn btn-primary enroll-button"
            >
              Quiz
            </Link>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12 animate__animated animate__fadeInUp">
          <VideoPlayer mediaUrl={mediaUrl} title={title} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 animate__animated animate__fadeInUp">
          <CourseDescription title={title} description={description} modules={modules} />
          <ModuleNavigation
            currentModule={currentModule}
            currentModuleIndex={currentModuleIndex}
            handleModuleChange={handleModuleChange}
            modules={modules}
          />
        </div>
        <div className="col-md-4 animate__animated animate__fadeInUp">
          <InstructorDetails instructor={instructor} />
          <Reviews
            reviews={reviews}
            handleReviewSubmit={handleReviewSubmit}
            rating={rating}
            setRating={setRating}
            hover={hover}
            setHover={setHover}
            userName={userName}
            userEmail={userEmail}
            courseId={id}
          />
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
