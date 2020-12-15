const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4002;

const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {

});

app.post('/events', (req, res) => {
    const {type, data} = req.body;

    if(type === 'PostCreated') {
        const {id, title} = data;

        posts[id] = {id, title, comments: []};
    }

    if (type === 'CommnetCreated') {
        
    }
})

app.listen(port, () => console.log(`Example app listening on port port!`));
