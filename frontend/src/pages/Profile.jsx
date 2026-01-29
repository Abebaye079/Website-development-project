import React, { useState, useEffect } from 'react';

function Profile() {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            fetch(`http://localhost:5000/profile?email=${storedUser.email}`)
                .then(res => res.json())
                .then(data => {
                    setUserData(data);
                    setFullname(data.fullname);
                    setEmail(data.email);
                })
                .catch(err => console.error("Error fetching profile:", err));
        }
    }, []);

    const handleUpdate = async () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const res = await fetch("http://localhost:5000/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ oldEmail: storedUser.email, fullname, email }),
        });
        if (res.ok) {
            alert("Profile Updated!");
            localStorage.setItem("user", JSON.stringify({ ...storedUser, fullname, email }));
            setIsEditing(false);
        }
    };

    const handleUnenroll = async (course) => {
        if (!window.confirm(`Are you sure you want to unenroll from ${course.name}?`)) return;

        const storedUser = JSON.parse(localStorage.getItem("user"));
        
        try {
            const response = await fetch("http://localhost:5000/unenroll", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    email: storedUser.email, 
                    courseDetails: course 
                }),
            });

            if (response.ok) {
                setUserData({
                    ...userData,
                    enrolledCourses: userData.enrolledCourses.filter(c => 
                        !(c.name === course.name && c.level === course.level)
                    )
                });
                alert("Successfully unenrolled.");
            } else {
                alert("Failed to unenroll.");
            }
        } catch (err) {
            console.error("Unenroll error:", err);
        }
    };

    if (!userData) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading Profile...</p>;

    return (
        <main style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '60px 20px',
            backgroundColor: '#fff',
            minHeight: '80vh'
        }}>
            {/* USER INFO CARD */}
            <div className="auth-card" style={{ 
                width: '100%', 
                maxWidth: '500px', 
                padding: '40px',
                borderRadius: '15px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                marginBottom: '50px',
                backgroundColor: '#f9f9f9'
            }}>
                <h2 className="modal-title-green" style={{ textAlign: 'center', marginBottom: '30px' }}>User Profile</h2>
                <div className="auth-form">
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Full Name:</label>
                        <input type="text" value={fullname} disabled={!isEditing} onChange={(e) => setFullname(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '30px' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Email Address:</label>
                        <input type="email" value={email} disabled={!isEditing} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                    </div>
                    <button onClick={isEditing ? handleUpdate : () => setIsEditing(true)} className="auth-btn" style={{ width: '100%', padding: '12px', cursor: 'pointer' }}>
                        {isEditing ? "Save Changes" : "Edit Profile"}
                    </button>
                </div>
            </div>

            {/* ENROLLMENT TABLE */}
            <div style={{ width: '100%', maxWidth: '1000px' }}>
                <h3 style={{ textAlign: 'center', fontSize: '1.8rem', color: '#333', color:'#007e3a' }}>My Enrolled Courses</h3>
                <div style={{ height: '3px', width: '60px', background: '#007e3a', margin: '15px auto 40px' }}></div>
                
                {userData.enrolledCourses && userData.enrolledCourses.length > 0 ? (
                    <>
                        <div style={{ overflowX: 'auto', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
                                <thead>
                                    <tr style={{ background: '#e6b10e', color: '#fff' }}>
                                        <th style={{ padding: '18px' }}>Course</th>
                                        <th>Level</th>
                                        <th>Day</th>
                                        <th>Time</th>
                                        <th>Duration</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.enrolledCourses.map((course, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid #eee', textAlign: 'center' }}>
                                            <td style={{ padding: '18px', fontWeight: 'bold', color: '#007E3A' }}>{course.name}</td>
                                            <td>{course.level}</td>
                                            <td>{course.day}</td>
                                            <td style={{ color: '#e67e22', fontWeight: 'bold' }}>{course.time}</td>
                                            <td>{course.duration}</td>
                                            <td>
                                                <button onClick={() => handleUnenroll(course)} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                    Unenroll
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* PHYSICAL PAYMENT NOTICE */}
                        <div style={{ 
                            marginTop: '30px', 
                            padding: '25px', 
                            backgroundColor: '#fff9e6', 
                            borderLeft: '5px solid #f1c40f', 
                            borderRadius: '8px',
                            textAlign: 'center',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                        }}>
                            <p style={{ margin: '0 0 10px 0', color: '#856404', fontSize: '1.1rem' }}>
                                <strong>Note:</strong> Course payments and final registration are handled 
                                <strong> physically at the school office</strong>.
                            </p>
                            <div style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                <p style={{ margin: '5px 0' }}>📍 <strong>Address:</strong> 4 Kilo, next to Holy Trinity University, Addis Ababa</p>
                                <p style={{ margin: '5px 0' }}>📞 <strong>Phone:</strong> +251 911000000</p>
                                <p style={{ margin: '5px 0' }}>📞 <strong>Phone:</strong> +251 911 763421</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p style={{ textAlign: 'center', color: '#777', fontSize: '1.1rem' }}>You haven't enrolled in any courses yet.</p>
                )}
            </div>
        </main>
    );
}

export default Profile;