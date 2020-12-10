const express = require('express')
const Users = require('./userDb')
const Posts = require('../posts/postDb')

const router = express.Router()

router.post('/', validateUser(), async (request, response) => {
    try {
        let data = {
            name: request.body.name
        }

        let user = await Users.insert(data)

        return response.status(200).json(user)
    } catch (error) {
        return response.status(500).json({"message": "error"})
    }
})

router.post('/:id/posts', validateUserId(), validatePost(), async (request, response) => {
    try {
        let data = {
            text: request.body.text,
            user_id: request.user.id
        }

        let post = await Posts.insert(data)

        return response.status(200).json(post)
    } catch (error) {
        return response.status(500).json({"message": "error"})
    }
})

router.get('/', async (request, response) => {
    try {
        let users = await Users.get()

        if (users) {
            return response.status(200).json(users)
        }
    } catch (error) {
        return response.status(500).json({"message": "error"})
    }
})

router.get('/:id', validateUserId(), async (request, response) => {
    return response.status(200).json(request.user)
})

router.get('/:id/posts', validateUserId(), async (request, response) => {
    try {
        let id = request.user.id

        let posts = await Users.getUserPosts(id)

        return response.status(200).json(posts)
    } catch (error) {
        return response.status(500).json({"message": "error"})
    }
})

router.delete('/:id', validateUserId(), async (request, response) => {
    try {
        let id = request.user.id

        let result = await Users.remove(id)

        return response.status(200).json(result)
    } catch (error) {
        return response.status(500).json({"message": "error"})
    }
})

router.put('/:id', validateUserId(), async (request, response) => {
    try {
        let id = request.user.id
        let data = {
            name: request.body.name
        }

        let result = await Users.update(id, data)

        return response.status(200).json(result)
    } catch (error) {
        return response.status(500).json({"message": "error"})
    }
})

//custom middleware
function validateUserId() {
    return async (request, response, next) => {
        let id = request.params.id
        let user = await Users.getById(id)

        if (user) {
            request.user = user
            next()
        } else {
            response.status(400).json({"message": "invalid user id"})
        }
    }
}

function validateUser() {
    return (request, response, next) => {
        let body = request.body
        let name = request.body.name

        if(!body) {
            response.status(400).json({"message": "missing user data"})
        } else if (!name) {
            response.status(400).json({"message": "missing required name"})
        } else {
            next()
        }
    }
}

function validatePost() {
    return (request, response, next) => {
        let body = request.body
        let name = request.body.text

        if(!body) {
            response.status(400).json({"message": "missing post data"})
        } else if (!name) {
            response.status(400).json({"message": "missing required text"})
        } else {
            next()
        }
    }
}

module.exports = router
