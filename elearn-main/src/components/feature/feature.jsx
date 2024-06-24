import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './feature.css';

const Feature = () => {

  const featureData = [
    {
      title: 'Quick Learning',
      desc: 'We are a dedicated team committed to delivering top-notch projects that meet the highest standards of quality and excellence.',
      icon: 'ri-draft-line'
    },
    {
      title: 'Certification',
      desc: 'We are a dedicated team committed to delivering top-notch projects that meet the highest standards of quality and excellence.',
      icon: 'ri-contacts-book-line'
    },
    {
      title: 'Learn from experts',
      desc: 'We are a dedicated team committed to delivering top-notch projects that meet the highest standards of quality and excellence.',
      icon: 'ri-contacts-book-line'
    },
    {
      title: 'Flexible schedule',
      desc: 'We are a dedicated team committed to delivering top-notch projects that meet the highest standards of quality and excellence.',
      icon: 'ri-contacts-book-line'
    }
  ];

  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center mb-4">What are the benefits?</h2>
        <Row xs="1" md="2" lg="4" className="g-4">
          {
            featureData.map((item, index) => (
              <Col key={index} className="text-center">
                <div className='single_feature animate__animated animate__fadeIn'>
                  <h2 className='mb-3'><i className={item.icon}></i></h2>
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))
          }
        </Row>
      </Container>
    </section>
  );
}

export default Feature;
