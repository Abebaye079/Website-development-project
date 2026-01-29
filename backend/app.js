const connectDB = require('./db');
const http = require("http");
const { URL } = require("url");
const bcrypt = require('bcryptjs'); // Added for security

// Helper to parse JSON data from requests
function parseJSON(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try { resolve(JSON.parse(body || "{}")); } catch { reject(); }
    });
  });
}

const server = http.createServer(async (req, res) => {
  // CORS & Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  const { url, method } = req;
  const db = await connectDB();

  console.log(`Incoming: ${method} ${url}`);

  // ====== 1. SIGNUP (WITH PASSWORD HASHING) ======
  if (url === "/signup" && method === "POST") {
    try {
      const { fullname, email, password } = await parseJSON(req);
      
      const existingUser = await db.users.findOne({ email });
      if (existingUser) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: "User already exists" }));
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.users.insertOne({ 
        fullname, 
        email, 
        password: hashedPassword, 
        enrolledCourses: [] 
      });

      console.log(`✅ User created with hashed password: ${email}`);
      res.writeHead(201);
      return res.end(JSON.stringify({ message: "Success" }));
    } catch (err) {
      res.writeHead(500);
      return res.end(JSON.stringify({ error: "Signup error" }));
    }
  }

  // ====== 2. LOGIN (WITH HASH COMPARISON) ======
  if (url === "/login" && method === "POST") {
    try {
      const { email, password } = await parseJSON(req);
      const user = await db.users.findOne({ email });

      if (!user) {
        res.writeHead(401);
        return res.end(JSON.stringify({ error: "Invalid email or password" }));
      }

      // Compare the typed password with the hashed password in DB
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.writeHead(401);
        return res.end(JSON.stringify({ error: "Invalid email or password" }));
      }

      console.log(`🔓 User logged in: ${email}`);
      return res.end(JSON.stringify({ user: { fullname: user.fullname, email: user.email } }));
    } catch (err) {
      res.writeHead(500);
      return res.end(JSON.stringify({ error: "Login error" }));
    }
  }

  // ====== 3. PROFILE (GET & UPDATE) ======
  if (url.startsWith("/profile") && method === "GET") {
    const fullUrl = new URL(req.url, `http://${req.headers.host}`);
    const email = fullUrl.searchParams.get("email");
    const user = await db.users.findOne({ email });
    return res.end(JSON.stringify(user));
  }

  if (url === "/profile" && method === "PUT") {
    const { oldEmail, email, fullname } = await parseJSON(req);
    await db.users.updateOne({ email: oldEmail }, { $set: { fullname, email } });
    return res.end(JSON.stringify({ message: "Updated" }));
  }

  // ====== 4. ENROLLMENT ======
  if (url === "/enroll" && method === "POST") {
    const { email, courseDetails } = await parseJSON(req);
    await db.users.updateOne(
        { email: email },
        { $push: { enrolledCourses: courseDetails } } 
    );
    return res.end(JSON.stringify({ message: "Enrolled" }));
  }

  // ====== 5. UNENROLL ======
  if (url === "/unenroll" && method === "POST") {
    const { email, courseDetails } = await parseJSON(req);
    await db.users.updateOne(
      { email: email },
      { $pull: { enrolledCourses: { name: courseDetails.name, level: courseDetails.level } } }
    );
    return res.end(JSON.stringify({ message: "Removed" }));
  }

  // 404 Route
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});