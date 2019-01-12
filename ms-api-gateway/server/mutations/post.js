const axios = require('axios');

const BASE_URL = `http://${process.env.URL_MS_POST}:8080/api/v1`;

const create = async function(args) {
  const res = await axios.post(`${BASE_URL}/posts`, args)
  .catch((err) => handleErrors(err));
  return res.data;
}

const deleteById = async function(id) {
  const res = await axios.delete(`${BASE_URL}/posts/${id}`)
  .catch((err) => handleErrors(err));
  return true;
}

const handleErrors = function(err) {
  throw new Error(err.response.data.message);
}

module.exports = {
  create,
  deleteById
}
