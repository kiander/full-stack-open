const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () =>
{
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => 
{
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('there are two blogs', async () =>
{
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'Janne Kalastaa & lumen'  )
})

afterAll(() =>
{
  mongoose.connection.close()
})