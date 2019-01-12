'use strict';

const express = require('express');

// Constantss
const PORT = process.env.PORT || 8080;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Comment micro-service');
});

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
