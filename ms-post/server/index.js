const express = require('express');
const bodyParser = require('body-parser')

// Constants
const PORT = process.env.PORT || 8080;

// In memory data
const posts = [{
  id: 1,
  title: 'Yes 1',
  body: 'Test 1',
  commentIds: [1,2]
},{
  id: 2,
  title: 'Yes 2',
  body: 'Test 2',
  commentIds: []
},{
  id: 3,
  title: 'Yes 3',
  body: 'Test 3',
  commentIds: []
}];

// App
const app = express();
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Post micro-service. REST API');
});

// Post endpoints
app.get('/api/v1/posts', (req, res) => {
  res.json(posts);
});

app.get('/api/v1/posts/:postId(\\d+)', (req, res) => {
  const post = posts.find((p) => p.id === +req.params.postId);
  if (!post) res.status('400').json({ message: 'Unknown post id' });
  else res.json(post);
});

app.post('/api/v1/posts', (req, res) => {
  console.log(req.body);
  const newPost = {
    ...req.body,
    id: posts.length + 1
  }
  posts.push(newPost);
  res.send(newPost)
});

app.delete('/api/v1/posts/:postId(\\d+)', (req, res) => {
  const post = posts.find((p) => p.id === +req.params.postId);
  if (!post) res.status('400').json({ message: 'Unknown post id' });
  else {
    posts.splice(posts.indexOf(post), 1);
    res.send();
  }
});

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
