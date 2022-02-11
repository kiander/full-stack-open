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

  const title = response.body.map(r => r.title)
  expect(title).toContain(
    'Janne Kalastaa & lumen'  )
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'uusi blogi',
    important: true,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const title = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(title).toContain(
    'uusi blogi'
  )
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const title = blogsAtEnd.map(r => r.title)

  expect(title).not.toContain(blogToDelete.title)
})

afterAll(() =>
{
  mongoose.connection.close()
})