import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, Form, FormControl } from 'react-bootstrap';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Link, useNavigate } from 'react-router-dom';
import './course.css';

const Courses = ({ limit, showSearchBar }) => {
  const [courseData, setCourseData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      const db = getDatabase();
      const coursesRef = ref(db, 'user/courses');
      onValue(coursesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setCourseData(formattedData);
        } else {
          setCourseData([]);
        }
      }, (error) => {
        console.error('Error fetching data:', error);
      });
    };

    fetchData();
  }, []);

  const limitedCourses = limit ? courseData.slice(0, limit) : courseData;

  // Filter courses based on search query
  const filteredCourses = limitedCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleShowAllCourses = () => {
    navigate('/courses');
    console.log("Show all courses");
  };

  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center mb-4">Our Popular Courses</h2>
        {showSearchBar ? (
          <Form className="mb-4">
            <Row className="align-items-center">
              <Col xs={12} md={6}>
                <FormControl
                  type="text"
                  placeholder="Search for courses"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </Col>
            </Row>
          </Form>
        ) : (
          <div className="text-end mb-4">  {/* Add mb-4 to add margin-bottom */}
 
              <Button variant="outline" className="show-all-courses-btn" onClick={handleShowAllCourses}>
                Show All Courses
              </Button>         
                </div>
        )}
        <Row xs="1" md="2" lg="3" className="g-4">
          {filteredCourses.map((item) => (
            <Col key={item.id}>
              <Link to={`/course/${item.id}`} className="text-decoration-none">
                <Card className="h-100 border-0 shadow-sm animate__animated animate__fadeIn">
                  <CardImg top="true" width="100%" height="100%" src={item.ImgUrl} alt={item.title} className="rounded-top" />
                  <CardBody>
                  <CardTitle tag="h5" className="mb-3">
                      {truncateTitle(item.title, 15)}
                    </CardTitle>
                    <CardText className="mb-3">
                      {item.modules ? `${item.modules.length} Modules | ` : ''}
                      {item.student}K Students | {item.rating}K Ratings
                    </CardText>
                    <div className="d-flex justify-content-end">
                    <Button color="primary" className="me-2">
  <Link to={`/enroll/${item.id}`} className="text-decoration-none text-light">
    Enroll Now
  </Link>
</Button>                     
                      <Button color="secondary">
  <Link to={`/course/${item.id}`} className="text-decoration-none text-light">
    Read More
  </Link>
</Button>                  </div>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

const truncateTitle = (title, maxLength) => {
  if (title.length <= maxLength) {
    return title;
  }
  const truncated = title.slice(0, maxLength - 3) + '...';
  return truncated;
};


export default Courses;
