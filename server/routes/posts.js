import express from 'express';
import { getPosts,createPost, deletePost, getPost } from '../controller/posts.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

router.post('/post', createPost);
router.get('/posts', getPosts);
router.delete('/post/:_id',isAuth,deletePost);
router.get('/view/:_id',getPost);

export default router;