/* Author Srikrishnan Sengottai Kasi */
const blogDB = require('../database/blogDB');

const createBlog = async (blog) => {
    const {payload, message} = await blogDB.createBlog(blog);
    return {payload, message};
}

const getAllBlogs = async () => {
    const {payload, message} = await blogDB.getAllBlogs();
    return {payload, message};
}

const updateBlog = async (id, blogs) => {
    const {payload, message} = await blogDB.updateBlogs(id, blogs);
    return {payload, message};
}

const deleteBlogs = async (id) => {
    const {payload, message} = await blogDB.deleteBlogs(id);
    return {payload, message};
}

module.exports = {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlogs
}