const axios = require('axios');

const BASE_URL = `http://${process.env.URL_MS_POST}:8080/api/v1`;

const getAll = async function() {
  const res = await axios.get(`${BASE_URL}/posts`);
  return res.data;
}

const getById = async function(id) {
  const res = await axios.get(`${BASE_URL}/posts/${id}`)
  .catch((err) => handleErrors(err));
  return res.data;
}

const getByCommentId = async function(id) {
  const res = await axios.get(`${BASE_URL}/comments/${id}/post`)
  .catch((err) => handleErrors(err));
  return res.data || null;
}

const handleErrors = function(err) {
  throw new Error(err.response.data.message);
}

module.exports = {
  getAll,
  getById,
  getByCommentId,
}
