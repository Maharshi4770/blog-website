const { Router } = require('express');
const { postModel } = require('../db');
const {userMiddleware} = require('../Middleware/user')

const postRouter = Router()

postRouter.post("/add",userMiddleware,async (req,res)=>{
    const userId =  req.userId;

    const {title, content, author} = req.body;

    const post = await postModel.create({
        title,
        content,
        author,
        creatorId: userId
    })

    res.json({
        msg: 'Blog created Successfully',
        postid: post._id
    })
})

postRouter.put("/update",userMiddleware,async (req,res)=>{
    const userId = req.userId;
    const {title, content, author, postid} = req.body;

    try{
        const post = await postModel.findById(postid);

        if(!post || post.creatorId != userId){
            return res.status(403).json({msg: 'Not allowed to update blog.'})
        }

        post.title = title,
        post.content = content,
        post.author = author,

        await post.save();

        res.json({
            msg: 'Blog update successfully'
        })
    }catch(error){
        res.status(500).json({msg: 'Something went wrong'})
    }
})

postRouter.delete("/delete", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const { postid } = req.body;

    try {
        const post = await postModel.findById(postid);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        if (post.creatorId != userId) {
            return res.status(403).json({ msg: "You are not authorized to delete this blog" });
        }

        await postModel.findOneAndDelete({ _id: postid });

        res.json({
            msg: 'Blog deleted successfully'
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Something went wrong' })
    }
});

postRouter.get("/blogs", userMiddleware, async function(req, res) {
    const userId = req.userId;

    try {
        const blogs = await postModel.find({ creatorId: userId });

        res.json({
            msg: 'Fetched all posts created by the user',
            blogs
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error while fetching posts',
            error: error.message
        });
    }
});

module.exports = {
    postRouter
}