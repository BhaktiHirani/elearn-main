import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './about.css';

const AboutUs = () => {
  return (
    
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="about-us-content animate__animated animate__fadeInLeft">
            <h2 className="display-4">Welcome to Learners</h2>
            <p>
          Welcome to E-Learning, where we are dedicated to providing high-quality educational resources and courses. Our mission is to empower learners of all ages by offering a diverse range of learning materials and expert instruction.
        </p>
        <p>
          At E-Learning, we believe that education should be accessible, engaging, and effective. Our team of experienced educators and industry professionals is committed to delivering top-notch content that helps you achieve your learning goals.
        </p>
        
            <div className="row">
              <div className="col-md-6">
                <h5 className="mb-3"><i className="bi bi-arrow-right-circle-fill"></i> Skilled Instructors</h5>
                <h5 className="mb-3"><i className="bi bi-arrow-right-circle-fill"></i> International Certificate</h5>
              </div>
              <div className="col-md-6">
                <h5 className="mb-3"><i className="bi bi-arrow-right-circle-fill"></i> Flexible Learning Options</h5>
                <h5 className="mb-3"><i className="bi bi-arrow-right-circle-fill"></i> Interactive Learning</h5>
              </div>
            </div>
            <Link to="/instructors" className="btn btn-primary mt-4">Meet Our Instructors</Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="about-us-image animate__animated animate__fadeInRight">
            <img src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" className="img-fluid rounded" alt="Learning Environment" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
