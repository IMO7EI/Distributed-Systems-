const http = require('http');
const handleRoutes = require('./routes/movieRoutes');

const server = http.createServer((req, res) => {
  handleRoutes(req, res);
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
