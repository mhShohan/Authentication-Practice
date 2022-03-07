const express = require('express');
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postsRoute');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Homepage');
});

app.use('/auth', authRoute);
app.use('/posts', postRoute);

app.listen(5000, () => {
  console.log(`http://localhost:5000`);
});
