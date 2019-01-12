const axios = require('axios');

const checkMSAuth = async () => {
  return axios.get(`http://${process.env.URL_MS_AUTH}:8080`);
}

const checkMSComment = async () => {
  return axios.get(`http://${process.env.URL_MS_COMMENT}:8080`);
}

const checkMSPost = async () => {
  return axios.get(`http://${process.env.URL_MS_POST}:8080`);
}

const checkMSUser = async () => {
  return axios.get(`http://${process.env.URL_MS_USER}:8080`);
}

const checkAll = async (req, res) => {
  const MSAuthStatus = await checkMSAuth().then(() => "OK").catch(() => "ERROR");
  const MSCommentStatus = await checkMSComment().then(() => "OK").catch(() => "ERROR");
  const MSUserStatus = await checkMSUser().then(() => "OK").catch(() => "ERROR");
  const MSPostStatus = await checkMSPost().then(() => "OK").catch(() => "ERROR");

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
}

module.exports = {
  checkAll,
}
