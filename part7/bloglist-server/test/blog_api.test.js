const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')


const api = supertest(app)

const initialUser = {
  "username": "siilii",
  "name": "Siili",
  "password": "meimei"
}

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,

  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: 'http://www.example.com/edsger',
    likes: 12
  }
]

let userId = null
let auth = null

beforeEach(async () => {

  await User.deleteMany({})

  let userObject = await api
    .post('/api/users')
    .send(initialUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const loginResponse = await api
    .post('/api/login')
    .set('Content-Type', 'application/json')
    .send({ username: initialUser.username, password: initialUser.password })
    .expect(200)
  auth = loginResponse.body.token

  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  blogObject.userId = userId
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  blogObject.userId = userId
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('Verify blog with ID', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    author: 'kissa ja koira',
    likes: 100,
    title: 'suomi elämä',
    url: 'example.com',
    user: userId
  }
  console.log("First")
  console.log(`Bearer ${auth}`)
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${auth}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  console.log("Second")
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.author)

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(contents).toContain(
    'kissa ja koira'
  )
})

test('default blog likes are zero', async () => {
  const newBlog = {
    author: 'siili',
    title: 'talviuni',
    url: 'example.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.filter(r => r.author === 'siili')
  expect(contents[0].likes).toBe(0)
})

test('blog title and url are required', async () => {
  const newBlog = {
    url: 'www.example.com',
    author: 'siili'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('delete blog by ID', async () => {
  const blogs = await api.get('/api/blogs')


  await api.delete(`/api/blogs/${blogs.body[0].id}`)
    .expect(204)
  const newBlogs = await api.get('/api/blogs')

  expect(blogs.body.length).toBe(newBlogs.body.length + 1)
})

test('update blog by ID', async () => {
  const blogs = await api.get('/api/blogs')
  const newBlog = {
    url: 'www.siiliconValley.com',
    author: 'siili suomi',
    title: 'siilicon valley'
  }
  const updatedblog = await api
    .put(`/api/blogs/${blogs.body[0].id}`)
    .send(newBlog)
    .expect(200)

  expect(updatedblog.body.url).toBe(newBlog.url)
  expect(updatedblog.body.title).toBe(newBlog.title)
  expect(updatedblog.body.author).toBe(newBlog.author)

})
afterAll(() => {
  mongoose.connection.close()
})

