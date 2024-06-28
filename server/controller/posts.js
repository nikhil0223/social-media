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
    const {title,description,selectedFile,tags,creator}=req.body;
    // const imageUrl=selectedFile.path.replace("\\","/");
    // console.log(imageUrl);
    const post = {
        title: title,
        description: description,
        selectedFile: selectedFile,
        tags: tags,
        creator: creator
    }
    console.log(post);
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

    console.log(req.body);
    const postId = req.params._id;
    console.log(postId);
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

const updatePost = (req,res,next) => {
    const postId = req.params._id;
    
};