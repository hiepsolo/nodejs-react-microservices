const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const port = 4001;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});
app.post('/posts/:id/comments', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;
    if (!commentsByPostId[req.params.id]) {
        commentsByPostId[req.params.id] = [];
    }
    commentsByPostId[req.params.id] = [
        ...commentsByPostId[req.params.id],
        {
            id,
            content
        }
    ];

    res.status(201).send({
        id,
        content
    });
});
app.listen(port, () => console.log(`Listening on ${port}!`));
