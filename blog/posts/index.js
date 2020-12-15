const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const port = 4000;

const app = express();
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => {});
app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id,
        title,
    };

    res.status(201).send(posts[id]);
});
app.listen(port, () => console.log(`Listening on ${port}!`));
