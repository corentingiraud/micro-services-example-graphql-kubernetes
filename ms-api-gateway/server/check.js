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

module.exports = {
  checkMSAuth,
  checkMSComment,
  checkMSPost,
  checkMSUser
}
