const express = require('express')

const server = express()

//  import routers
const users = require('./users/userRouter')
const posts = require('./posts/postRouter')

// this belongs in a router
server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
});

// custom middleware
function logger() {
    return (request, response, next) => {
        let time = new Date().toISOString()
        console.log(`${time} ${request.ip} ${request.method} ${request.url}`)
        next()
    }
}

// modules
server.use(express.json())

// middleware
server.use(logger())

// routes
server.use('/api/users', users)
server.use('/api/posts', posts)


module.exports = server;
