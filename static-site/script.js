// ==========================
// Hamburger Menu Toggle
// ==========================
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// ==========================
// Highlight the active nav link
// ==========================
const navLinks = document.querySelectorAll('.nav-link');
const currentPath = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});

// ==========================
// Scroll-to-top Button
// ==========================
const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================
// Hero Slider Logic (Revised)
// ==========================
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".slider-dots");
    const slider = document.querySelector(".hero-section");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    
    if (!slides.length || !dotsContainer) return;

    let currentSlide = 0;
    let slideInterval;

    // 1. Clear and Build Dots
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => { 
            goToSlide(i);
            resetTimer(); 
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll("span");

    // 2. Main Navigation Logic
    function goToSlide(index) {
        slides.forEach(s => {
            s.classList.remove("active");

            // Remove animations from previous slide
            const heading = s.querySelector("h1");
            const paragraph = s.querySelector("p");
            const button = s.querySelector(".cta-button.large-cta");
            if (heading) heading.classList.remove("fade-in-up");
            if (paragraph) paragraph.classList.remove("fade-in-up-delay");
            if (button) button.classList.remove("pulse");
        });

        dots.forEach(d => d.classList.remove("active"));

        currentSlide = index;
        const activeSlide = slides[currentSlide];
        activeSlide.classList.add("active");
        dots[currentSlide].classList.add("active");

        // Add animations for active slide
        const heading = activeSlide.querySelector("h1");
        const paragraph = activeSlide.querySelector("p");
        const button = activeSlide.querySelector(".cta-button.large-cta");
        if (heading) heading.classList.add("fade-in-up");
        if (paragraph) paragraph.classList.add("fade-in-up-delay");
        if (button) button.classList.add("pulse");
    }

    function moveNext() {
        let next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function movePrev() {
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    // 3. Event Listeners for Buttons
    nextBtn?.addEventListener("click", () => {
        moveNext();
        resetTimer();
    });

    prevBtn?.addEventListener("click", () => {
        movePrev();
        resetTimer();
    });

    // 4. Auto-slide Management
    function startAutoSlide() { 
        stopAutoSlide(); 
        slideInterval = setInterval(moveNext, 5000); 
    }
    
    function stopAutoSlide() { 
        if (slideInterval) clearInterval(slideInterval); 
    }

    function resetTimer() {
        stopAutoSlide();
        startAutoSlide();
    }

    // 5. Interaction Listeners
    if (slider) {
        slider.addEventListener("mouseenter", stopAutoSlide);
        slider.addEventListener("mouseleave", startAutoSlide);
    }

    // Initialize
    startAutoSlide();
    goToSlide(0); // Ensure first slide animations run on load
});

// ==========================
// Dynamic Courses + Modal with Filter
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    const courses = [
        {
            id: "amharic",
            title: "Amharic",
            description: "Beginner to Advanced courses focusing on grammar & everyday communication.",
            levels: ["Beginner Level", "Intermediate Level", "Advanced Level"]
        },
        {
            id: "afan-oromoo",
            title: "Afan Oromoo",
            description: "Strengthen your Afan Oromoo skills with structured lessons and pronunciation practice.",
            levels: ["Beginner Level", "Intermediate Level", "Conversation Practice"]
        },
        {
            id: "tigrigna",
            title: "Tigrigna",
            description: "Ideal for students wanting to master essential vocabulary and communicate confidently.",
            levels: ["Reading & Writing", "Speaking Lessons", "Cultural Insights"]
        },
        {
            id: "somali",
            title: "Somali",
            description: "A culture and conversational course that helps you speak Somali in real life situations.",
            levels: ["Beginner to Advanced", "Pronunciation Training", "Culture & Traditions"]
        },
        {
            id: "ge'ez",
            title: "Ge'ez (ግዕዝ)",
            description: "A classical Ethiopian language useful for Orthodox Church services, ancient manuscripts, and liturgy.",
            levels: ["Vocabulary", "Conversation Practice", "Grammar Foundations"]
        },
        {
            id: "afar",
            title: "Afar",
            description: "Learn Afar essentials for communication and cultural understanding.",
            levels: ["Conversational Afar", "Vocabulary Building", "Cultural Traditions"]
        },
        {
            id: "nuer",
            title: "Nuer",
            description: "Learn Nuer language basics with an emphasis on conversational skills and cultural knowledge.",
            levels: ["Conversational Nuer", "Pronunciation and Basic Grammar", "Cultural Traditions & Customs"]
        },
        {
            id: "hadiyya",
            title: "Hadiyya",
            description: "Build Hadiyya fluency through immersive lessons and interaction.",
            levels: ["Basic to Intermediate Levels", "Pronunciation Practice", "Local Customs & Culture"]
        },
        {
            id: "gurage",
            title: "Gurage",
            description: "Learn Gurage through practical conversation and cultural lessons.",
            levels: ["Conversational Gurage", "Grammar Essentials", "Cultural Practices"]
        },
        {
            id: "sidamo",
            title: "Sidamo",
            description: "Master Sidamo for effective communication in daily life.",
            levels: ["Beginner Level", "Intermediate Level", "Advanced Level"]
        }
    ];

    const courseContainer = document.getElementById("courseContainer");
    const modal = document.getElementById("courseModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalLevels = document.getElementById("modalLevels");
    const modalClose = modal?.querySelector(".close");
    const filterSelect = document.getElementById("levelFilter");

    if (!courseContainer || !modal || !modalTitle || !modalDescription || !modalLevels || !modalClose) return;

    // 1. Function to Render Cards
    function renderCourses(filterValue = "all") {
        // Clear container
        courseContainer.innerHTML = "";

        // Filter the array
        const filtered = courses.filter(course => {
            if (filterValue === "all") return true;
            // Check if any of the levels string contains the filter word (case insensitive)
            return course.levels.some(level => 
                level.toLowerCase().includes(filterValue.toLowerCase())
            );
        });

        // Generate HTML
        filtered.forEach(course => {
            const card = document.createElement("div");
            card.className = "course-card";
            card.innerHTML = `
                <div class="course-content">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                </div>
                <a href="#" class="btn-secondary view-details" data-id="${course.id}">View Details</a>
            `;
            courseContainer.appendChild(card);

            // Add Modal Listener
            const viewBtn = card.querySelector(".view-details");
            viewBtn.addEventListener("click", e => {
                e.preventDefault();
                modalTitle.textContent = course.title;
                modalDescription.textContent = course.description;
                modalLevels.innerHTML = course.levels.map(l => `<li>${l}</li>`).join("");
                modal.style.display = "flex";
            });
        });
    }

    // 2. Listen for Filter Changes
    filterSelect?.addEventListener("change", (e) => {
        renderCourses(e.target.value);
    });

    // 3. Close Modal Logic (Unchanged)
    modalClose.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", e => {
        if (e.target === modal) modal.style.display = "none";
    });

    // Initial Render
    renderCourses();
});

// ==========================
// Dynamic Schedule Table & Show/Hide
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    const scheduleData = [
        {
            course: "Amharic",
            levels: [
                { level: "Beginner", day: "Monday & Wednesday", time: "10:00 AM ET / 7:00 AM PST", duration: "8 weeks", price: "1500 ETB" },
                { level: "Intermediate", day: "Tuesday & Thursday", time: "2:00 PM ET / 10:00 AM PST", duration: "10 weeks", price: "2000 ETB" },
                { level: "Advanced", day: "Saturday", time: "10:00 AM ET / 6:00 AM PST", duration: "6 weeks", price: "3000 ETB" }
            ]
        },
        {
            course: "Afaan Oromoo",
            levels: [
                { level: "Beginner", day: "Monday & Thursday", time: "11:00 AM ET / 7:00 AM PST", duration: "8 weeks", price: "1500 ETB" },
                { level: "Intermediate", day: "Tuesday & Friday", time: "3:00 PM ET / 11:00 AM PST", duration: "10 weeks", price: "2000 ETB" },
                { level: "Conversation", day: "Saturday", time: "1:00 PM ET / 9:00 AM PST", duration: "6 weeks", price: "2500 ETB" }
            ]
        },
        {
            course: "Tigrigna",
            levels: [
                { level: "Reading & Writing", day: "Monday & Wednesday", time: "2:00 PM ET / 10:00 AM PST", duration: "8 weeks", price: "1400 ETB" },
                { level: "Speaking Lessons", day: "Tuesday & Thursday", time: "10:00 AM ET / 6:00 AM PST", duration: "8 weeks", price: "2000 ETB" },
                { level: "Cultural Insights", day: "Saturday", time: "3:00 PM ET / 11:00 AM PST", duration: "6 weeks", price: "2200 ETB" }
            ]
        },
        {
            course: "Somali",
            levels: [
                { level: "Beginner to Advanced", day: "Monday & Wednesday", time: "4:00 PM ET / 12:00 PM PST", duration: "10 weeks", price: "3000 ETB" },
                {level: "Pronunciation Training", day: "Tuesday & Thursday", time: "1:00 PM ET / 9:00 AM PST", duration: "6 weeks", price: "1500 ETB" },
                {level: "Culture & Traditions", day: "Saturday", time: "11:00 AM ET / 7:00 AM PST", duration: "6 weeks", price: "1800 ETB" }
            ]
        },
        {
            course: "Ge'ez",
            levels: [
                { level: "Vocabulary", day: "Monday & Friday", time: "9:00 AM ET / 5:00 AM PST", duration: "6 weeks", price: "1400 ETB" },
                {level: "Conversation Practice", day: "Tuesday & Thursday", time: "11:00 AM ET / 7:00 AM PST", duration: "10 weeks", price: "2000 ETB" },
                {level: "Grammar Foundations", day: "Wednesday & Saturday", time: "2:00 PM ET / 10:00 AM PST", duration: "6 weeks", price: "2200 ETB" },
            ]
        },
        {
            course: "Afar",
            levels: [
                {level:"Conversational Afar", day: "Monday & Wednesday", time: "10:00 AM ET / 7:00 AM PST", duration: "8 weeks", price: "1500 ETB" },
                {level: "Vocabulary Building", day: "Tuesday & Thursday", time: "2:00 PM ET / 11:00 AM PST", duration: "6 weeks", price: "1800 ETB" },
                { level: "Cultural Traditions", day: "Saturday", time: "12:00 PM ET / 9:00 AM PST", duration: "4 weeks", price: "1200 ETB" },
            ]
        },
        {
            course: "Nuer",
            levels: [
                {level: "Conversational Nuer", day: "Monday & Thursday", time: "1:00 PM ET / 10:00 AM PST", duration: "8 weeks", price: "1500 ETB" },
                {level: "Pronunciation & Basic Grammar", day: "Tuesday & Friday", time: "3:00 PM ET / 12:00 PM PST", duration: "6 weeks", price: "1800 ETB" },
                {level: "Cultural Traditions & Customs", day: "Saturday", time: "1:00 PM ET / 10:00 AM PST", duration: "4 weeks", price: "1200 ETB" },
            ]
        },
        {
            course: "Hadiyya",
            levels: [
                {level: "Basic to Intermediate Levels", day: "Monday & Wednesday", time: "2:00 PM ET / 11:00 AM PST", duration: "8 weeks", price: "1500 ETB" },
                {level: "Pronunciation Practice", day: "Tuesday & Thursday", time: "10:00 AM ET / 7:00 AM PST", duration: "6 weeks", price: "2000 ETB" },
                { level: "Local Customs & Culture", day: "Saturday", time: "3:00 PM ET / 12:00 PM PST", duration: "4 weeks", price: "1500 ETB" },
            ]
        },
        {
            course: "Gurage",
            levels: [
                {level: "Conversational Gurage", day: "Monday & Friday", time: "11:00 AM ET / 8:00 AM PST", duration: "8 weeks", price: "1500 ETB" },
                {level: "Grammar Essentials", day: "Tuesday & Friday", time: "11:00 AM ET / 8:00 AM PST", duration: "6 weeks", price: "1900 ETB" },
                { level: "Cultural Practices", day: "Saturday", time: "12:00 PM ET / 9:00 AM PST", duration: "4 weeks", price: "1200 ETB" },
            ]
        },
        {
            course: "Sidamo",
            levels: [
                { level: "Beginner Level", day: "Monday & Wednesday", time: "9:00 AM ET / 6:00 AM PST", duration: "8 weeks", price: "1500 ETB" },
                { level: "Intermediate Level", day: "Tuesday & Thursday", time: "11:00 AM ET / 8:00 AM PST", duration: "8 weeks", price: "2000 ETB" },
                { level: "Advanced Level", day: "Saturday", time: "12:00 PM ET / 9:00 AM PST", duration: "4 weeks", price: "2500 ETB" },
            ]
        }
    ];

    const scheduleBody = document.getElementById("scheduleBody");
    if (!scheduleBody) return;

    let courseIndex = 0;

    scheduleData.forEach((course) => {
        courseIndex++;
        course.levels.forEach((levelObj, index) => {
            const row = document.createElement("tr");
            
            // Apply hidden class to any course after the first 3
            if (courseIndex > 3) {
                row.classList.add("hidden-row");
                row.style.display = "none"; 
            } else {
                row.classList.add("show"); // Show the first 3 courses immediately
            }

            if (index === 0) {
                const courseCell = document.createElement("td");
                courseCell.rowSpan = course.levels.length;
                courseCell.textContent = course.course;
                row.appendChild(courseCell);
            }

            Object.keys(levelObj).forEach(key => {
                const cell = document.createElement("td");
                cell.textContent = levelObj[key];
                row.appendChild(cell);
            });

            const enrollCell = document.createElement("td");
            const enrollBtn = document.createElement("a");
            enrollBtn.href = "schedule.html";
            enrollBtn.className = "btn-secondary";
            enrollBtn.textContent = "Enroll";
            enrollCell.appendChild(enrollBtn);
            row.appendChild(enrollCell);

            scheduleBody.appendChild(row);
        });
    });

    // ==========================
    // Toggle Button Logic
    // ==========================
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Show Full Table";
    toggleBtn.className = "btn-secondary";
    toggleBtn.style.margin = "20px auto";
    toggleBtn.style.display = "block";

    const tableElement = scheduleBody.parentElement;
    tableElement.parentElement.insertBefore(toggleBtn, tableElement.nextSibling);

    let isExpanded = false;

    toggleBtn.addEventListener("click", () => {
        isExpanded = !isExpanded;
        const hiddenRows = scheduleBody.querySelectorAll(".hidden-row");

        if (isExpanded) {
            hiddenRows.forEach((row, i) => {
                // Change display first so it exists in the layout
                row.style.display = "table-row"; 
                // Small delay to allow 'display' change to register before animating opacity
                setTimeout(() => {
                    row.classList.add("show");
                }, i * 30); 
            });
            toggleBtn.textContent = "Show Less";
        } else {
            hiddenRows.forEach((row) => {
                row.classList.remove("show");
                // Set to none so it takes up ZERO vertical space
                row.style.display = "none"; 
            });
            toggleBtn.textContent = "Show Full Table";
            
            // Optional: Keeps the user focused on the table instead of jumping down
            tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});