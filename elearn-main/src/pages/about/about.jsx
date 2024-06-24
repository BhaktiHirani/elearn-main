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
            <p className="lead">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.
            </p>
            <p className="lead">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet.
            </p>
            <div className="row">
              <div className="col-md-6">
                <h5 className="mb-3"><i className="bi bi-arrow-right-circle-fill"></i> Skilled Instructors</h5>
                <h5 className="mb-3"><i className="bi bi-arrow-right-circle-fill"></i> Online Classes</h5>
                <h5 className="mb-3"><i className="bi bi-arrow-right-circle-fill"></i> International Certificate</h5>
              </div>
              <div className="col-md-6">
                <h5 className="mb-3"><i className="bi bi-arrow-right-circle-fill"></i> Skilled Instructors</h5>
                <h5 className="mb-3"><i className="bi bi-arrow-right-circle-fill"></i> Online Classes</h5>
                <h5 className="mb-3"><i className="bi bi-arrow-right-circle-fill"></i> International Certificate</h5>
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
