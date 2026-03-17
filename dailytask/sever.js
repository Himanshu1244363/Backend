const http = require('http');

const server = http.createServer((req, res) => {
    
    if (req.url === "/") {
        res.write("{}");
        res.end();
    }
    else if (req.url === "/about") {
        res.write("This is About Page");
        res.end();
    }
    else if (req.url === "/contact") {
        res.write("Contact page");
        res.end();
    }
    else {
        res.write("404 Page Not Found");
        res.end();
    }

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});