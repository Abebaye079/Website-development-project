import React from 'react';
import { Link } from 'react-router-dom';

function HomeCard({ image, title, description }) {
  return (
    <div className="course-card">
      <div className="course-content">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <Link to="/courses" className="btn-secondary">View Details</Link>
    </div>
  );
}

export default HomeCard;