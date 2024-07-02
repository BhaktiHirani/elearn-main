import React from 'react';

const CourseDescription = ({ title, description, modules }) => {
  return (
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
  );
};

export default CourseDescription;
