const http = require("http"); 
 
const server = http.createServer((req, res) => {  
  const method = req.method; 
  const url = req.url; 
 
  if (method === "GET" && url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the Home Page");
    // else if(method ==="POST" && pathname ==="/data"){
    //   let body ="";
    //   req.on("data",(chunk)=>{
    //     body +=chunk;
    //   });
    //   req.on("end",()=>{
    //     fstat.writefile("/todo.json",body,=>{

    //     });
    //   })
    // }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});