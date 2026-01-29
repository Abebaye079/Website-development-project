import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { coursesData } from '../data/coursesData';

import CourseDetailCard from '../components/CourseDetailCard';



function Course() {

    const [filter, setFilter] = useState('all');

    const [selectedCourse, setSelectedCourse] = useState(null);



    //FILTER LOGIC

    const filteredCourses = coursesData.filter(course => {

        if (filter === 'all') return true;

        return course.levels.some(level =>

            level.toLowerCase().includes(filter.toLowerCase())

        );

    });



    const handleOpenModal = (course) => {

        setSelectedCourse(course);

    };



    const handleCloseModal = () => {

        setSelectedCourse(null);

    };



    return (

        <main>

            {/* HERO SECTION */}

            <section className="about-hero">

                <div className="about-hero-content">

                    <h1>Lissan Course Catalog</h1>

                    <p>Ethiopia's most widely spoken and culturally rich languages.</p>

                </div>

            </section>



            {/* FILTER SECTION */}

            <section className="filter-container" style={{ textAlign: 'center', margin: '30px 0' }}>

                <label htmlFor="levelFilter" style={{ fontWeight: 'bold', marginRight: '10px' }}>

                    Filter by level:

                </label>

                <select

                    id="levelFilter"

                    value={filter}

                    onChange={(e) => setFilter(e.target.value)}

                    style={{ padding: '8px', borderRadius: '5px' }}

                >

                    <option value="all">All Levels</option>

                    <option value="beginner">Beginner</option>

                    <option value="intermediate">Intermediate</option>

                    <option value="advanced">Advanced</option>

                </select>

            </section>



            {/* COURSES GRID */}

            <section className="courses-section">

                <div className="course-container" style={{

                    display: 'grid',

                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',

                    gap: '20px',

                    padding: '20px'

                }}>

                    {filteredCourses.map(course => (

                        <CourseDetailCard

                            key={course.id}

                            course={course}

                            onOpenModal={handleOpenModal}

                        />

                    ))}

                </div>

            </section>



            {/* MODAL POPUP */}

            {selectedCourse && (

                <div className="modal active">

                    <div className="modal-content">

                        <span className="close" onClick={handleCloseModal}>&times;</span>

                       

                        <h2 className="modal-title-green">{selectedCourse.title}</h2>

                        <p className="modal-desc">{selectedCourse.description}</p>

                       

                        <ul className="modal-levels-list">

                            {selectedCourse.levels.map((lvl, index) => (

                                <li key={index} className="level-item-box">

                                    {lvl}

                                </li>

                            ))}

                        </ul>

                       

                        <Link

                            to="/schedule"

                            className="btn-schedule-yellow"

                            onClick={handleCloseModal}

                        >

                            View Schedule

                        </Link>

                    </div>

                </div>

            )}

        </main>

    );

}



export default Course;