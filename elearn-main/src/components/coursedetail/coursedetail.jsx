  import React, { useEffect, useState } from 'react';
  import { useParams, Link } from 'react-router-dom';
  import { getDatabase, ref,set,push, onValue } from "firebase/database";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import './coursedetail.css';
  import { faStar } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

  const CourseDetail = ({ userName, userEmail,courseId  }) => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [enrolled, setEnrolled] = useState(false); // State to track enrollment status

    useEffect(() => {
      const fetchCourse = () => {
        const db = getDatabase();
        const courseRef = ref(db, `user/courses/${id}`);
        onValue(courseRef, (snapshot) => {
          const data = snapshot.val();
          console.log("Course data:", data);
          console.log("Modules data:", data.modules); // Add this line to log modules data
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

    const handleRating = (rate) => {
      setRating(rate);
    };

    const handleReviewSubmit = (e) => {
      e.preventDefault();
      const comment = e.target.comment.value;
      const db = getDatabase();
      const reviewsRef = ref(db, `user/courses/${id}/reviews`);
      const newReviewRef = push(reviewsRef);
      set(newReviewRef, {
        rating: rating,
        comment: comment,
        reviewerName: userName || "Anonymous",
        reviewerEmail: userEmail || "anonymous@example.com"
      });
      setRating(0);
      e.target.reset();
    };

    const handleModuleChange = (index) => {
      setCurrentModuleIndex(index);
    };
    const handleEnroll = (userId, courseId) => {
      // Get a reference to the Firebase Realtime Database
      const db = getDatabase();
    
      // Reference to the enrolled_users node of the specific course
      const enrolledUsersRef = ref(db, `user/${courseId}/enrolled_users`);
    
      // Set the user's enrollment status to true
      set(enrolledUsersRef, {
        [userId]: true
      })
        .then(() => {
          // Enrollment successful
          console.log("User enrolled successfully");
          // Update local state or perform any other necessary actions
          setEnrolled(true);
        })
        .catch((error) => {
          // Error handling
          console.error("Error enrolling user:", error);
          // Handle the error appropriately
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
        userName: userName,
        userEmail: userEmail,
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
        userName: userName,
        userEmail: userEmail,
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
          {mediaUrl ? (
  <div className="video-container">
    <iframe
      width="560"
      height="315"
      src={mediaUrl.replace("watch?v=", "embed/")}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
) : (
  <img src={ImgUrl} alt={title} className="img-fluid rounded shadow" />
)}

          </div>
        </div>
        <div className="row">
          <div className="col-md-8 animate__animated animate__fadeInUp">
            <div className="bg-light p-4 rounded shadow">
              <h2>Course Description</h2>
              <p>{description}</p>
              <h2>Syllabus</h2>
              <ul className="list-group list-group-flush">
                {Array.isArray(modules) ? modules.map((module, index) => (
                  <li key={index} className="list-group-item">
                    <h5>{module.title}</h5>
                    <p>{module.content}</p>
                  </li>
                )) : <p>No modules available.</p>}
              </ul>
            </div>
            
          <div className="row mt-4">
            <div className="col-md-12 animate__animated animate__fadeInUp">
              <div className="bg-light p-4 rounded shadow">
                <h2>{currentModule ? currentModule.title : 'No Module Selected'}</h2>
                {currentModule && (
                  <div>
                    <p>{currentModule.content}</p>
                    <div className="d-flex justify-content-between gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleModuleChange(currentModuleIndex - 1)}
                        disabled={currentModuleIndex === 0}
                      >
                        Previous Module
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleModuleChange(currentModuleIndex + 1)}
                        disabled={currentModuleIndex === modules.length - 1}
                      >
                        Next Module
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>
          <div className="col-md-4 animate__animated animate__fadeInUp">
            <div className="bg-light p-4 rounded shadow mb-4">
              <h2>Instructor</h2>
              {instructor && (
                <div className="d-flex align-items-center">
                  <img src={instructor.photoUrl} alt={instructor.name} className="img-thumbnail rounded-circle me-3" style={{ width: '100px', height: '100px' }} />
                  <div>
                    <h5>{instructor.name}</h5>
                    <p>{instructor.bio}</p>
                  </div>
                </div>
              )}
            </div>
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
                      onClick={() => handleRating(i + 1)}
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
              
            </div>
            
          </div>
        </div>
      );
    };
    
    export default CourseDetail;
    
