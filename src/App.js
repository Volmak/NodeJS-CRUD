const express = require('express');
const app = express();

const router = require('./routes/router');
app.use('/', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
