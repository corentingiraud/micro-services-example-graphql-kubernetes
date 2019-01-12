'use strict';

const express = require('express');

// Constantss
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Auth micro-services');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
