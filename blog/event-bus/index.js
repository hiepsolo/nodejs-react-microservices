const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
const port = 4005;

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);
    axios.post('http://localhost:4003/events', event);

    res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
