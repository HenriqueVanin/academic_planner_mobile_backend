const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    return res.json({ message: req.body })
});

require('./controllers/authController')(app);
require('./controllers/projectController')(app);

app.listen(3000);