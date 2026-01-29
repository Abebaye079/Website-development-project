import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeCard from '../components/HomeCard';

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            img: "/images/slider1.jpg",
            h1: "Speak the Heart of Ethiopia.",
            p: "Master Amharic, Afan Oromoo, Tigrigna, and more with Lissan Language School's expert-led, culturally rich courses in person.",
            btnText: "Create Account",
            link: "/signup"
        },
        {
            img: "/images/slider2.png",
            h1: "Learn Languages in Person",
            p: "Join our immersive in-class sessions and practice speaking with expert Ethiopian tutors.",
            btnText: "View Courses",
            link: "/course"
        },
        {
            img: "/images/slider3.png",
            h1: "Experience Ethiopia’s Culture Firsthand",
            p: "Our courses combine language learning with Ethiopian traditions, music, and history.",
            btnText: "Learn More",
            link: "/about"
        }
    ];
    const benefits = [
        { title: "Native Ethiopian Tutors", desc: "Learn from teachers who are native speakers and steeped in cultural context." },
        { title: "Flexible Online Scheduling", desc: "Classes available in all time zones to fit your busy global life." },
        { title: "Focus On Culture", desc: "Lessons integrate history, music, and traditions for immersive learning." },
        { title: "Affordable Prices", desc: "Study any language at a student-friendly cost." }
    ];

    const steps = [
        { step: "1. Choose your Language", desc: "Select your language and preferred proficiency level." },
        { step: "2. Pick a Time", desc: "Select a class time that fits your time zone." },
        { step: "3. Connect & Communicate!", desc: "Join your live class and immediately begin practicing." }
    ];

    const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    return (
        <main>
            {/* HERO SLIDER */}
            <section id="hero" className="hero-section">
                <div className="slider">
                    <div className="slides">
                        {slides.map((slide, index) => (
                            <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`} 
                                style={{ display: index === currentSlide ? 'block' : 'none' }}>
                                <img src={slide.img} alt={slide.h1} />
                                <div className="hero-content">
                                    <h1>{slide.h1}</h1>
                                    <p>{slide.p}</p>
                                    <Link to={slide.link} className="cta-button large-cta">{slide.btnText}</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="prev" onClick={prevSlide}>&#10094;</button>
                    <button className="next" onClick={nextSlide}>&#10095;</button>
                </div>
            </section>

            {/* COURSE HIGHLIGHTS */}
            <section id="course-highlights" className="content-section">
                <h2>Start Your Journey: Popular Ethiopian Languages</h2>
                <div className="course-container">
                    <HomeCard 
                        image="/images/photo_2025-12-01_12-31-28.jpg" 
                        title="Amharic fundamentals" 
                        description="Begin reading and speaking the official working language of Ethiopia with confidence."
                    />
                    <HomeCard 
                        image="/images/photo_2025-12-01_22-31-35.jpg" 
                        title="Afan Oromoo" 
                        description="Focus on fluid conversational skills for interacting with the largest ethnic group."
                    />
                    <HomeCard
                        image="/images/photo_2025-12-01_22-33-48.jpg" 
                        title="Tigrigna for Travelers" 
                        description="Learn essential phrases and cultural context for travel in the Tigray region."
                    />
                    <HomeCard
                        image="/images/photo_2025-12-01_23-11-21.jpg"
                        title="Somali"
                        description="Learn culturally rich and conversational Somali."
                    />
                    <HomeCard
                        image="/images/photo_2025-12-01_22-44-41.jpg"
                        title=" Ethiopic Script (Ge'ez)"
                        description="A specialized course on the beautiful and ancient script used for Amharic and Tigrigna."
                    />
                </div>
            </section>

            <section id="info-sections">
                <div className="info-sections-wrapper">

                    {/* Benefits Card */}
                    <div className="info-card">
                        <h2 className="section-title">Why Choose Lissan Language School?</h2>
                        <div className="lists">
                            {benefits.map((item, index) => (
                                <div className="list-item" key={index}>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Process Card */}
                    <div className="info-card">
                        <h2 className="section-title">Learning Is Simple: How It Works?</h2>
                        <div className="lists">
                            {steps.map((item, index) => (
                                <div className="list-item" key={index}>
                                    <h3>{item.step}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* TESTIMONIALS */}
            <section id="testimonials" className="content-section light-bg">
                <h2>What Our Students Say</h2>
                <div className="testimonial-container">
                    <div className="testimonial-card">
                        <img src="/images/photo_2025-12-01_22-54-33.jpg" alt="Student" className="testimonial-img" />
                        <p className="quote">"The Amharic Course helped me connect with my family's heritage."</p>
                        <p className="source">Hana Mogess, Amharic Student</p>
                    </div>
                    <div className="testimonial-card">
                        <img src="images/photo_2025-12-01_23-05-53.jpg" alt="Selam Kefyalew" className="testimonial-img"/>
                        <p className="quote"> "I can now confidently speak Afan Oromoo with my coworkers thanks to the conversational focus of these classes. </p>
                        <p className="source">Selam Kefyalew, Afan Oromoo Student</p>
                    </div>
                    <div className="testimonial-card">
                        <img src="images/photo_2025-12-01_23-05-34.jpg" alt="Tesfaye Ayanaw" className="testimonial-img"/>
                        <p className="quote"> "The Ge'ez course helped me improve my participation in the Orthodox Church and Understand ancient texts."</p>
                        <p className="source">Tesfaye Ayanaw, Ge'ez Student</p>
                    </div>
                </div>
            </section>

            <section id="final-cta" className="final-cta-banner">
                <h2> Ready to Learn the languages of Ethiopia? </h2>
                <p> Your journey to multilingual mastery begins now. Don't wait connect with us today.</p>
                <Link to="/schedule" className="btn-details-yellow" style={{textDecoration:'none'}}>View Schedule & register</Link>
            </section>

        </main>
    );
}

export default Home;