const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Janne Kalastaa & lumen",
        author: "Janne",
        url: "www.jannen-kala-blogi.fi",
        likes: 1
    },
    {
        title: "Pertin luontokävelyblogi",
        author: "Pertti",
        url: "www.luontokävelijä.fi",
        likes: 3
    },
]

const nonExistingId = async () =>
{
    const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () =>
{
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () =>
{
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
}