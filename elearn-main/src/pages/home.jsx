import Courses from '../components/coursessection/courses';
import Feature from '../components/feature/feature';
import Herosection from '../components/herosection/herosection';
import Instruction from '../components/instruction/instruction';
import React, { Fragment, useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import AboutUs from './about/about';
const Home = () => {
  const [topRatedCourses, setTopRatedCourses] = useState([]);

  useEffect(() => {
    const fetchTopRatedCourses = async () => {
      try {
        const db = getDatabase();
        const coursesRef = ref(db, 'user/courses');

        onValue(coursesRef, (snapshot) => {
          const data = snapshot.val();
          console.log('Fetched courses data:', data); // Log fetched data

          if (data) {
            // Convert courses object into an array
            const coursesArray = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            }));
            console.log('Courses array:', coursesArray); // Log courses array

            // Sort courses by rating in descending order
            const sortedCourses = coursesArray.sort((a, b) => b.rating - a.rating);
            console.log('Sorted courses:', sortedCourses); // Log sorted courses

            // Limit to top 3 courses
            const top3Courses = sortedCourses.slice(0, 3);
            console.log('Top 3 courses:', top3Courses); // Log top 3 courses


            // Set the top-rated courses state
            setTopRatedCourses(top3Courses);
          }
        });
      } catch (error) {
        console.error('Error fetching top-rated courses:', error);
      }
    };

    fetchTopRatedCourses();
  }, []);

  return (
    <Fragment>
      <Herosection />
      <AboutUs />
      <Courses courses={topRatedCourses} limit={3} showSearchBar={false}/>
      <Feature />
      <Instruction />
    </Fragment>
  );
};

export default Home;