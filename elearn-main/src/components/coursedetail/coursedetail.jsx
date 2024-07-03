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
import { useAuth } from '../authprovider'; // Import useAuth hook from AuthProvider

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [error, setError] = useState(null); // State for error feedback
  const { currentUser } = useAuth(); // Get currentUser from useAuth hook

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
    if (rating && comment && currentUser.email && id) {
      const db = getDatabase();
      const reviewsRef = ref(db, `user/courses/${id}/reviews`);
      const newReviewRef = push(reviewsRef);
      const reviewerName = currentUser.displayName;
      const reviewerEmail = currentUser.email;
  
      set(newReviewRef, {
        rating,
        comment,
        reviewerName,
        reviewerEmail,
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
          <h1 className="display-6">{title}</h1>
          <p className="lead">Rating: {courseRating}</p>
          <p className='lead'>Total Modules: {totalModules}</p>
          <p className="h4">{price ? `$${price}` : 'Free'}</p>
          <div className="button-container mt-3">
            <Link
              to={{
                pathname: `/enroll/${id}`,
                state: {
                  courseId: id,
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
          <CourseDescription
            title={title}
            description={description}
            modules={modules}
            handleModuleChange={handleModuleChange}
            currentModuleIndex={currentModuleIndex}
          />
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
            userName={currentUser.displayName}
            userEmail={currentUser.email}
            courseId={id}
          />
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
