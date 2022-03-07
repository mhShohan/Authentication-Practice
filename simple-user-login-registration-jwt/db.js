const users = [
  {
    email: 'shohan@gmail.com',
    password: 'test123',
  },
];

const publicPost = [
  { id: 1, title: 'Public Post 1', content: 'Public Post Content 1' },
  { id: 2, title: 'Public Post 2', content: 'Public Post Content 2' },
  { id: 3, title: 'Public Post 3', content: 'Public Post Content 3' },
  { id: 4, title: 'Public Post 4', content: 'Public Post Content 3' },
];

const privatePost = [
  { id: 1, title: 'private Post 1', content: 'private Post Content 1' },
  { id: 2, title: 'private Post 2', content: 'private Post Content 2' },
  { id: 3, title: 'private Post 3', content: 'private Post Content 3' },
  { id: 4, title: 'private Post 4', content: 'private Post Content 3' },
];

module.exports = { users, publicPost, privatePost };
