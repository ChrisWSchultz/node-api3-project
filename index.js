// code away!
const server = require('./server');

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`\n running on http://localhost:${port} \n`);
});
