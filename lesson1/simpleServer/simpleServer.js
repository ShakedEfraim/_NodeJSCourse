//Insert http module
const http = require("http");

//Create a server
const server = http.createServer((request, response)=>{
//Create a response
//
response.end("Hello world");
});

//Start the server
const PORT = 3000;
server.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});