const Blog = require('../models/blogPost');

const createBlog = async (blog) => {
    try {
        await Blog.create(blog);
        let response = {};
        response.payload = "Blog successfully created";
        return {status: "success", payload: response['payload'], message: "Blog creation success."}
    } catch (error) {
        console.log(error);
        return {status: "failure", message: error.message};
    }
}

const getAllBlogs = async () => {
    try {
        const blog = await Blog.findAll(({
            raw: true
        }));
        return {status: "success", payload: blog, message: "Blog posts found."}
    } catch (error) {
        console.log(error);
        return {status: "failure", message: error.message};
    }
}

const getBlogById = async (id) => {
    try {
        const blog = await Blog.findOne(({
            where: {
                id: id
            },
            raw: true
        }));
        return {status: "success", payload: blog, message: "Blog found."}
    } catch (error) {
        console.log(error);
        return {status: "failure", message: error.message};
    }
}

const updateBlogs = async (id, blog) => {
    try {
        await Blog.update(blog, {
            where: {
                id: id
            }
        });
        return {status: "success", payload: blog, message: "Blog details updated successfully."}
    } catch (error) {
        console.log(error);
        return {status: "failure", message: error.message};
    }
}

const deleteBlogs = async (id) => {
    try {
        const {payload: blog} = await getBlogById(id);
        if (blog === undefined) {
            return {status: "failure", message: "Blog not found"};
        } else {
            await Blog.destroy({
                where: {
                    id: id
                }
            });
            return {status: "success", message: "Blog deleted successfully."}
        }
    } catch (error) {
        console.log(error);
        return {status: "failure", message: error.message};
    }
}


module.exports = {
    createBlog,
    getAllBlogs,
    updateBlogs,
    deleteBlogs
}