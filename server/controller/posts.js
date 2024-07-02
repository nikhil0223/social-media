import path from 'path';
import PostMessage from "../models/postMessage.js";
import User from "../models/userSchema.js";

export const getPosts = async (req, res, next) => {
    try {
        const postMessages = await PostMessage.find().populate('creator');
        res.status(201).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const tags = req.body.tags;
    const creator = req.body.creator;
    const imageUrl = req.file.path.replace("\\", "/");
    console.log(req.id);
    const post = new PostMessage({
        title: title,
        description: description,
        tags: tags,
        selectedFile: imageUrl,
        creator: req.id
    });
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        const user = await User.findById(creator);
        user.posts.push(newPost);
        await user.save();
        res.status(201).json({ message: "Post succesfully created", post: newPost , author :{name : user.userName }});
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deletePost = async (req, res, next) => {
    const postId = req.params._id;
    try {
        const post = await PostMessage.findById(postId);
        if (!post) {
            throw new Error('post doesnot exist');
        }
        
        if (post.creator._id.toString() !== req.id) {
            const error = new Error(`${post.creator._id.toString()} Not authorized! ${req.id}`);
            error.statusCode = 403;
            throw error;
        }
        await PostMessage.findByIdAndDelete(postId);
        const user = await User.findById(req.id);
        user.posts.pull(postId);
        await user.save();
        res.status(200).json({ message: 'Deletion Successfull' });
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const getPost = async (req,res,next) => {
    const postId = req.params._id;
    try{
        const post = await PostMessage.findById(postId);
        if (!post) {
            throw new Error('post doesnot exist');
        }
        res.status(200).json({post:post,message: "Post Fetched"});
    }
    catch(err){
        res.status(409).json({ message: err.message });
    }
};
