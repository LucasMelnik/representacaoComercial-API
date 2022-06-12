const express = require('express');
const corsMiddleware = require('./app/middlewares/corsMiddleware');

const routes = require('./routes');

require('./database');

const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.use(routes);

app.listen(3333, () => console.log('🔥 Server started at http://localhost:3333'));
