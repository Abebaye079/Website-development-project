import React from 'react';
import { Link } from 'react-router-dom';

function About() {
    const teachers = [
        { name: "Misrak Gebeyehu", role: "Amharic Instructor", desc: "Specialist in conversational Amharic and grammar foundations.", img: "/images/photo_2025-12-02_23-11-32.png" },
        { name: "Galma Diba", role: "Afaan Oromoo Instructor", desc: "Experienced in pronunciation training and cultural insights.", img: "/images/photo_2025-12002_23-13-54.png" },
        { name: "Samrawit Hagos", role: "Tigrigna Instructor", desc: "Focuses on reading and writing Tigrigna script.", img: "/images/photo_2025-12-02_23-15-67.png" },
        { name: "Moalim Abdi", role: "Somali Instructor", desc: "Teaches conversational Somali and cultural expressions.", img: "images/photo_2025-12-02_23-19-89.png" },
        { name: "Abune Tesfaye", role: "Ge'ez Instructor", desc: "Expert in classical Ge'ez and liturgical readings.", img: "images/photo_2025-12-02_23-16-56.png" }
    ];

    const languages = ["Amharic", "Afaan Oromoo", "Tigrigna", "Somali", "Ge'ez", "Afar", "Nuer", "Hadiyya", "Gurage", "Sidamo"];

    const achievements = [
        { title: "500+ Students Graduated", desc: "Successfully helped over 500 students master Ethiopian languages.", icon: "/images/grad_icon.jpg" },
        { title: "10+ Years of Teaching", desc: "Providing quality language education for over a decade.", icon: "/images/years_icon.png" },
        { title: "Native Language Experts", desc: "Expert teachers for each major Ethiopian language we teach.", icon: "/images/native_icon.jpg" },
        { title: "Interactive Online Classes", desc: "Flexible, live online sessions accessible worldwide.", icon: "/images/online_icon.png" }
    ];

    return (
        <main>
            {/* HERO */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1>About Lissan Language School</h1>
                    <p>Lissan online language school was created to make Ethiopian languages accessible to learners around the world.</p>
                    <Link to="/courses" className="btn-details-yellow" style={{textDecoration:'none'}}>Explore our courses</Link>
                </div>
            </section>

            {/* MISSION */}
            <section id="mission" className="content-section">
                <div className="mission-wrapper">
                    <img src="images/photo_2025-12-02_23-16-89.png" className="mission-image" alt="Our Mission" />
                    <div className="mission-text">
                        <h2>Our Mission</h2>
                        <p>At Lissan, our mission is simple: <b>to preserve, celebrate, and teach Ethiopia's diverse languages through accessible, high-quality online education.</b></p>
                        <p>We believe language is identity. Our experience focuses on practical speaking and cultural immersion.</p>
                    </div>
                </div>
            </section>

            {/* TEACHERS */}
            <section className="content-section light-bg">
                <h2 style={{textAlign: 'center'}}>Meet Our Teachers</h2>
                <div className="teachers-grid">
                    {teachers.map((t, i) => (
                        <div key={i} className="teacher-card">
                            <img src={t.img} alt={t.name} />
                            <h3>{t.name}</h3>
                            <p className="teacher-role">{t.role}</p>
                            <p>{t.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* TWO COLUMN APPROACH & LANGUAGES */}
            <section className="two-column-wrapper">
                <div className="left-section">
                    <h2>Our Teaching Approach</h2>
                    <ul className="approach-list">
                        <li>Live online classes with interactive speaking</li>
                        <li>Culturally immersive lessons (music, traditions)</li>
                        <li>Beginner to advanced levels</li>
                        <li>Supportive expert tutors</li>
                    </ul>
                </div>
                <div className="right-section">
                    <h2>Languages We Teach</h2>
                    <div className="language-grid">
                        {languages.map(lang => <span key={lang} className="lang-tag">{lang}</span>)}
                    </div>
                </div>
            </section>

            {/* ACHIEVEMENTS SECTION - Matching image_cf2f13.png */}
            <section id="achievements" className="content-section">
                <h2 style={{ textAlign: 'center', color: '#007E3A' }}>Our Achievements</h2>
                <div className="achievements-grid">
                    {achievements.map((item, index) => (
                        <div key={index} className="achievement-item">
                            <img src={item.icon} alt={item.title} className="achievement-icon" />
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="final-cta-banner">
                <h2>Start Your Language Journey Today!</h2>
                <p>Join Lissan Language school and unlock the culture of Ethiopia.</p>
                <Link to="/schedule" className="btn-details-yellow">
                    View Schedule & Register
                </Link>
            </section>
        </main>
    );
}

export default About;