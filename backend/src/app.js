// src/app.js
const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

// Paths to JSON files
const USERS_FILE = path.join(__dirname, "../data/users.json");
const COURSES_FILE = path.join(__dirname, "../data/courses.json");
const ENROLLMENTS_FILE = path.join(__dirname, "../data/enrollments.json");

// Helper: Load JSON from file
function loadJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return [];
  }
}

// Helper: Save JSON to file
function saveJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Load initial data
let users = loadJSON(USERS_FILE);
console.log("Loaded Users:", users);

// Helper: parse JSON body
function parseJSON(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject();
      }
    });
  });
}

// Create server
const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  const { url, method } = req;

  // ====== Backend Test ======
  if (url === "/test" && method === "GET") {
    return res.end(JSON.stringify({ message: "Backend is running!" }));
  }

  // ====== SIGNUP ======
  if (url === "/signup" && method === "POST") {
    const { username, email, password } = await parseJSON(req);
    if (!username || !email || !password) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "All fields are required" }));
    }
    if (users.some(u => u.email === email)) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "User already exists" }));
    }
    const newUser = { id: users.length + 1, username, email, password };
    users.push(newUser);
    saveJSON(USERS_FILE, users);
    return res.end(JSON.stringify({ message: "Signup successful" }));
  }

  // ====== LOGIN ======
  if (url === "/login" && method === "POST") {
    const { email, password } = await parseJSON(req);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      res.writeHead(401);
      return res.end(JSON.stringify({ error: "Invalid credentials" }));
    }
    return res.end(JSON.stringify({
      message: "Login successful",
      user: { id: user.id, username: user.username, email: user.email }
    }));
  }

  // ====== GET PROFILE ======
  if (url.startsWith("/profile") && method === "GET") {
    const fullUrl = new URL(req.url, `http://${req.headers.host}`);
    const email = fullUrl.searchParams.get("email");
    if (!email) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Email query parameter required" }));
    }
    const user = users.find(u => u.email === email);
    if (!user) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "User not found" }));
    }
    return res.end(JSON.stringify({ id: user.id, username: user.username, email: user.email }));
  }

  // ====== UPDATE PROFILE ======
  if (url === "/profile" && method === "PUT") {
    const { email, username, password } = await parseJSON(req);
    const user = users.find(u => u.email === email);
    if (!user) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "User not found" }));
    }
    if (username) user.username = username;
    if (password) user.password = password;
    saveJSON(USERS_FILE, users);
    return res.end(JSON.stringify({
      message: "Profile updated",
      user: { id: user.id, username: user.username, email: user.email }
    }));
  }

  // ====== GET COURSES ======
  if (url === "/api/courses" && method === "GET") {
    const courses = loadJSON(COURSES_FILE);
    res.writeHead(200);
    return res.end(JSON.stringify(courses));
  }

  // ====== ENROLL IN COURSE ======
  if (url === "/api/enrollments" && method === "POST") {
    try {
      const { email, courseId } = await parseJSON(req);
      if (!email || !courseId) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: "Email and courseId are required" }));
      }

      const user = users.find(u => u.email === email);
      if (!user) {
        res.writeHead(404);
        return res.end(JSON.stringify({ error: "User not found" }));
      }

      const courses = loadJSON(COURSES_FILE);
      const course = courses.find(c => c.id === courseId);
      if (!course) {
        res.writeHead(404);
        return res.end(JSON.stringify({ error: "Course not found" }));
      }

      let enrollments = loadJSON(ENROLLMENTS_FILE);
      if (enrollments.some(e => e.email === email && e.courseId === courseId)) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: "Already enrolled in this course" }));
      }

      const newEnrollment = { id: enrollments.length + 1, email, courseId };
      enrollments.push(newEnrollment);
      saveJSON(ENROLLMENTS_FILE, enrollments);

      res.writeHead(200);
      return res.end(JSON.stringify({ message: "Enrollment successful", enrollment: newEnrollment }));
    } catch {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  }

  // ====== DELETE ENROLLMENT ======
  if (url.startsWith("/api/enrollments/") && method === "DELETE") {
    const parts = url.split("/");
    const id = parseInt(parts[parts.length - 1], 10);
    if (isNaN(id)) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Invalid enrollment ID" }));
    }

    let enrollments = loadJSON(ENROLLMENTS_FILE);
    const index = enrollments.findIndex(e => e.id === id);
    if (index === -1) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "Enrollment not found" }));
    }

    const removed = enrollments.splice(index, 1)[0];
    saveJSON(ENROLLMENTS_FILE, enrollments);

    res.writeHead(200);
    return res.end(JSON.stringify({ message: "Enrollment removed", enrollment: removed }));
  }

  // ====== 404 ======
  res.writeHead(404);
  return res.end(JSON.stringify({ error: "Route not found" }));
});

// Start server
server.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
