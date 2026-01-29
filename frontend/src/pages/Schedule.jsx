import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { scheduleData } from '../data/scheduleData';

function Schedule() {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    // Get current user from storage
    const user = JSON.parse(localStorage.getItem("user"));

    // --- ENROLLMENT LOGIC ---
    const handleEnroll = async (courseName, rowData) => {
        // 1. Check if user is logged in
        if (!user || !user.email) {
            alert("Please login to enroll in a course!");
            navigate("/login");
            return;
        }

        // 2. Prepare the full detail object from the table row
        const enrollmentInfo = {
            name: courseName,
            level: rowData.level,
            day: rowData.day,
            time: rowData.time,
            duration: rowData.duration,
            price: rowData.price
        };

        console.log("Enrolling user:", user.email, "in:", enrollmentInfo);

        try {
            const response = await fetch("http://localhost:5000/enroll", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    email: user.email, 
                    courseDetails: enrollmentInfo 
                }),
            });

            // 3. Handle the response from app.js
            if (response.ok) {
                alert(`Successfully enrolled in ${courseName} (${rowData.level})!`);
                navigate("/profile"); // Redirect to show the new table entry
            } else {
                const errorData = await response.json();
                console.error("Enrollment failed:", errorData.error);
                alert(`Enrollment failed: ${errorData.error || "Please try again."}`);
            }
        } catch (err) {
            console.error("Connection Error:", err);
            alert("Could not connect to the server. Is your backend running?");
        }
    };

    const visibleSchedule = isExpanded ? scheduleData : scheduleData.slice(0, 3);

    return (
        <main>
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1>Schedule and Pricing</h1>
                    <p>Find the perfect class time for you and explore our affordable pricing plans.</p>
                </div>
            </section>

            <section className="content-section">
                <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Available Classes & Pricing</h2>
                
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
                                            <button 
                                                className="btn-secondary" 
                                                style={{ padding: '5px 15px', fontSize: '0.8rem', cursor: 'pointer' }}
                                                onClick={() => handleEnroll(courseGroup.course, row)}
                                            >
                                                Enroll
                                            </button>
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
        </main>
    );
}

export default Schedule;