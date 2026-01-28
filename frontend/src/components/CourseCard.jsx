import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ image, title, description, type = "compact", onOpenModal }) {
  return (
    <div className="course-card">
      <div className="course-content">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      
      {type === "compact" ? (
        <Link to="/courses" className="btn-secondary">View Details</Link>
      ) : (
        // Courses Page Version: Triggers the JS Modal/Popup
        <button className="btn-secondary" onClick={onOpenModal}>
          Learn More
        </button>
      )}
    </div>
  );
}

export default CourseCard;