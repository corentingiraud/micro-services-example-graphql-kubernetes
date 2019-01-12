'use strict';

const express = require('express');
const asyncHandler = require('express-async-handler')
const check = require('./check');

// Constants
const PORT = process.env.PORT || 8080;

// App
const app = express();

app.get('/', asyncHandler(async (req, res) => {
  console.log('Get req');

  const MSAuthStatus = await check.checkMSAuth().then(() => "OK").catch(() => "ERROR");
  const MSCommentStatus = await check.checkMSComment().then(() => "OK").catch(() => "ERROR");
  const MSUserStatus = await check.checkMSUser().then(() => "OK").catch(() => "ERROR");
  const MSPostStatus = await check.checkMSPost().then(() => "OK").catch(() => "ERROR");

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Check MS</title>
  </head>
  <body>

    <h1>Api-Gateway</h1>
    <h2>Check MS contact</h2>
    <ul>
      <li>Auth: ${MSAuthStatus}</li>
      <li>Comment: ${MSCommentStatus}</li>
      <li>User: ${MSUserStatus}</li>
      <li>Post: ${MSPostStatus}</li>
    </ul>
  </body>
  </html>

  `);
}));

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
