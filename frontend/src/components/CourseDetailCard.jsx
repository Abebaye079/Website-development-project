import React from 'react';

function CourseDetailCard({ course, onOpenModal }) {
    return (
        <div className="course-card">
            <div className="course-content">
                <h3 className="course-title-green">{course.title}</h3>
                <p className="course-desc">{course.description}</p>
            </div>
            <button
                className="btn-details-yellow"
                onClick={() => onOpenModal(course)}
            >
                View Details
            </button>
        </div>
    );
}

export default CourseDetailCard;