const http = require("http");
const fs = require("fs");
const url = require("url");

const PORT = 3000;
const FILE = "students.json";

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

 
  const readData = () => {
    const data = fs.readFileSync(FILE);
    return JSON.parse(data);
  };

  
  const writeData = (data) => {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  };



 
  if (method === "GET" && path === "/students") {
    const students = readData();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(students));
  }

  
  else if (method === "GET" && path.startsWith("/students/")) {
    const id = parseInt(path.split("/")[2]);
    const students = readData();
    const student = students.find(s => s.id === id);

    if (student) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(student));
    } else {
      res.writeHead(404);
      res.end("Student not found");
    }
  }

  
  else if (method === "POST" && path === "/students") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const newStudent = JSON.parse(body);
      const students = readData();

      newStudent.id = students.length
        ? students[students.length - 1].id + 1
        : 1;

      students.push(newStudent);
      writeData(students);

      res.writeHead(201);
      res.end("Student added");
    });
  }

 
  else if (method === "PUT" && path.startsWith("/students/")) {

    const id = parseInt(path.split("/")[2]);
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const updatedData = JSON.parse(body);
      const students = readData();

      const index = students.findIndex(s => s.id === id);

      if (index !== -1) {
        students[index] = { ...students[index], ...updatedData };
        writeData(students);
        res.writeHead(200);
        res.end("Student updated");
      } else {
        res.writeHead(404);
        res.end("Student not found");
      }
    });
  }

  
  else if (method === "DELETE" && path.startsWith("/students/")) {
    const id = parseInt(path.split("/")[2]);
    const students = readData();

    const filtered = students.filter(s => s.id !== id);

    if (students.length !== filtered.length) {
      writeData(filtered);
      res.writeHead(200);
      res.end("Student deleted");
    } else {
      res.writeHead(404);
      res.end("Student not found");
    }
  }

  else {
    res.writeHead(404);
    res.end("Route not found");
  }

});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});