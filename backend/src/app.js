// src/app.js
const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

// Path to JSON file in data folder
const USERS_FILE = path.join(__dirname, "../data/users.json");

// Load users
function loadUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
  } catch {
    return [];
  }
}

// Save users
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

let users = loadUsers();
console.log("Loaded Users:", users);

// Parse JSON body
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

  // TEST
  if (url === "/test" && method === "GET") {
    return res.end(JSON.stringify({ message: "Backend is running!" }));
  }

  // SIGNUP
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

    users.push({ id: users.length + 1, username, email, password });
    saveUsers(users);
    return res.end(JSON.stringify({ message: "Signup successful" }));
  }

  // LOGIN
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

  // GET PROFILE
  if (url.startsWith("/profile") && method === "GET") {
    const fullUrl = new URL(req.url, `http://${req.headers.host}`);
    const email = fullUrl.searchParams.get("email");

    const user = users.find(u => u.email === email);
    if (!user) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "User not found" }));
    }

    return res.end(JSON.stringify({
      id: user.id,
      username: user.username,
      email: user.email
    }));
  }

  // UPDATE PROFILE ✅
  if (url === "/profile" && method === "PUT") {
    const { email, username, password } = await parseJSON(req);

    const user = users.find(u => u.email === email);
    if (!user) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "User not found" }));
    }

    if (username) user.username = username;
    if (password) user.password = password;

    saveUsers(users);

    return res.end(JSON.stringify({
      message: "Profile updated",
      user: { id: user.id, username: user.username, email: user.email }
    }));
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
