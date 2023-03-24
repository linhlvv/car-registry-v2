const http = require('http');

const server = http.createServer((req, res) => {
  console.log("Run request")
  res.write("Car regist server")
  res.end()
})

server.listen(1111, 'localhost', () => {
  console.log("Server is running")
})