import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Col } from 'reactstrap';
import './course.css';

const CoursesCard = ({ item, history }) => {
  const { ImgUrl, title, lesson, student, rating, id } = item;

  const handleEnrollClick = () => {
    history.push(`/enroll/${id}`);
  };

  const handleReadMoreClick = () => {
    history.push(`/course/${id}`);
  };

  return (
    <Col lg="4" md="6" className="mb-4">
      <Card className="h-100 course-card animate__animated animate__fadeIn">
        <CardImg top width="100%" src={ImgUrl} alt={title} className="card-img-top" />
        <CardBody className="d-flex flex-column">
          <CardTitle tag="h5" className="mb-4">{title}</CardTitle>
          <CardText className="d-flex justify-content-between align-items-center mb-2">
            <span className="lesson"><i className="bi bi-book me-1"></i>{lesson} Lessons</span>
            <span className="students"><i className="bi bi-person me-1"></i>{student}K</span>
          </CardText>
          <CardText className="d-flex justify-content-between align-items-center mb-4">
            <span className="rating"><i className="bi bi-star-fill me-1"></i>{rating}K</span>
          </CardText>
          <div className="mt-auto d-flex justify-content-between">
            <Button color="primary" className="me-2 animate__animated animate__fadeIn" onClick={handleEnrollClick}>Enroll Now</Button>
            <Button color="secondary" className="animate__animated animate__fadeIn" onClick={handleReadMoreClick}>Read More</Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CoursesCard;
