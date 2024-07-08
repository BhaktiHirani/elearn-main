import React, { useEffect, useState } from 'react';
import { useAuth } from '../authprovider';
import { db } from "../../firebase";
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [joinedDate, setJoinedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const docRef = doc(db, 'Users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log('Fetched User Data:', userData);
            setUserDetails(userData);
            setJoinedDate(currentUser.metadata.creationTime);

            if (userData.enrolledCourses) {
              console.log('Enrolled Courses:', userData.enrolledCourses);
              setEnrolledCourses(userData.enrolledCourses);
            }
            
            if (userData.completedQuizzes) {
              console.log('Completed Quizzes:', userData.completedQuizzes);
              setCompletedQuizzes(userData.completedQuizzes);
            } else {
              setCompletedQuizzes([]);
            }
          } else {
            setError('User data does not exist');
            console.log('User data does not exist');
          }
        } catch (error) {
          setError('Error fetching user data');
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('User is not logged in');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <motion.div
            className="card"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '20px' }}
          >
            <div className="card-header text-center">
              <img
                src={userDetails?.profilePicture || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg'}
                alt="Profile"
                className="rounded-circle"
                style={{ width: 100, height: 100 }}
              />
              <h4 className="mt-3">{userDetails?.fullname}</h4>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <p className="pl-3"><strong>Email:</strong> {userDetails?.email}</p>
                </div>
                <div className="col-md-6">
                  <p className="pl-3"><strong>Joined:</strong> {joinedDate}</p>
                </div>
                <div className="col-md-6">
                  <p className="pl-3"><strong>Total Courses Enrolled:</strong> {enrolledCourses.length}</p>
                </div>
                <div className="col-md-6">
                  <p className="pl-3"><strong>Total Courses Completed:</strong> {userDetails?.completedCourses?.length || 0}</p>
                </div>
              </div>
              <div className="text-center mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn btn-primary mx-2"
                  onClick={() => navigate('/edit-profile')}
                  style={{ width: '120px' }}
                >
                  Edit Profile
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn btn-secondary mx-2"
                  onClick={() => navigate('/change-password')}
                >
                  Change Password
                </motion.button>
              </div>
              <div>
                <h5 className="mb-3">Enrolled Courses:</h5>
                {enrolledCourses.length > 0 ? (
                  <ul className="list-group">
                    {enrolledCourses.map(course => (
                      <li key={course.courseId} className="list-group-item">
                        {course.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No enrolled courses.</p>
                )}
              </div>
              <div className="mt-4">
                <h5 className="mb-3">Completed Quizzes:</h5>
                {completedQuizzes.length > 0 ? (
                  <ul className="list-group">
                    {completedQuizzes.map((quiz, index) => (
                      <li key={index} className="list-group-item">
                        Quiz ID: {quiz.quizId} - Status: {quiz.completed ? 'Completed' : 'Not Completed'} - Date: {quiz.completionDate?.toDate().toLocaleDateString() || 'N/A'}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No completed quizzes.</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
