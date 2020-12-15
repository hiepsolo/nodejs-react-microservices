const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4002;

const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, comment, postId } = data;

        const post = posts[postId];
        post.comments.push({ id, content });
    }

    console.log(posts);

    res.send({});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
