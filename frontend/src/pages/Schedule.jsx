import React, { useState } from 'react';
import { scheduleData } from '../data/scheduleData';

function Schedule() {
    const [isExpanded, setIsExpanded] = useState(false);

    // Filter data: Show only first 3 courses if not expanded
    const visibleSchedule = isExpanded ? scheduleData : scheduleData.slice(0, 3);

    return (
        <main>
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1>Schedule and Pricing</h1>
                    <p>Find the perfect class time for you and explore our affordable pricing plans. Flexible schedules for all time zones with expert native tutors.</p>
                </div>
            </section>

            <section className="content-section">
                <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Available Classes & Pricing</h2>
                <p className="section-description" style={{ textAlign: 'center' }}>Check out the available times and prices for each language and level.</p>

                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Level</th>
                            <th>Day</th>
                            <th>Time</th>
                            <th>Duration</th>
                            <th>Price</th>
                            <th>Enroll</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleSchedule.map((courseGroup, groupIndex) => (
                            <React.Fragment key={groupIndex}>
                                {courseGroup.levels.map((row, rowIndex) => (
                                    <tr key={`${groupIndex}-${rowIndex}`} className="show">
                                        {/* Only show the Course Name cell for the first level in the group */}
                                        {rowIndex === 0 && (
                                            <td rowSpan={courseGroup.levels.length} style={{ fontWeight: 'bold', color: '#007E3A' }}>
                                                {courseGroup.course}
                                            </td>
                                        )}
                                        <td>{row.level}</td>
                                        <td>{row.day}</td>
                                        <td>{row.time}</td>
                                        <td>{row.duration}</td>
                                        <td style={{ fontWeight: 'bold' }}>{row.price}</td>
                                        <td>
                                            <button className="btn-secondary" style={{ padding: '5px 15px', fontSize: '0.8rem' }}>Enroll</button>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                <button 
                    className="btn-details-yellow" 
                    style={{ margin: '30px auto', display: 'block' }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? "Show Less" : "Show Full Table"}
                </button>
            </section>

            {/* PACKAGE DEALS SECTION */}
            <section className="content-section light-bg" style={{ padding: '60px 10%' }}>
                <h2 style={{ textAlign: 'center' }}>Promotions & Package Deals</h2>
                <div className="package-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
                    <div className="package-card">
                        <h3>Starter Package</h3>
                        <p><b>Includes:</b> 3 sessions</p>
                        <p><b>Price:</b> 1500 ETB</p>
                        <button className="btn-secondary">Enroll</button>
                    </div>
                    <div className="package-card">
                        <h3>Monthly Plan</h3>
                        <p><b>Includes:</b> 12 sessions</p>
                        <p><b>Price:</b> 5500 ETB</p>
                        <button className="btn-secondary">Enroll</button>
                    </div>
                    <div className="package-card">
                        <h3>Intensive</h3>
                        <p><b>Includes:</b> 20 sessions</p>
                        <p><b>Price:</b> 8500 ETB</p>
                        <button className="btn-secondary">Enroll</button>
                    </div>
                    <div className="package-card">
                        <h3>Family Discount</h3>
                        <p><b>Includes:</b> 2+ People</p>
                        <p><b>Discount:</b> 10% Off</p>
                        <button className="btn-secondary">Enroll</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Schedule;