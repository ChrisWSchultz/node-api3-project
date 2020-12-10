const express = require('express');
const db = require('./postDb')

const router = express.Router();

router.get('/', async (request, response) => {
    return response.status(200).json({"message": "hello world"})
});

router.get('/:id', validatePostId(), async (request, response) => {
    return response.status(200).json({"message": "hello world"})
});

router.delete('/:id', validatePostId(), async (request, response) => {
    return response.status(200).json({"message": "hello world"})
});

router.put('/:id', validatePostId(), async (request, response) => {
    return response.status(200).json({"message": "hello world"})
});

// custom middleware

function validatePostId() {
    return async (request, response, next) => {
        let id = request.params.id
        let post = await db.getById(id)

        if (post) {
            request.user = post
            next()
        } else {
            response.status(400).json({"message": "invalid post id"})
        }
    }
}

module.exports = router;
