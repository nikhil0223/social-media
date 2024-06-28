import express from 'express';
import { getPosts,createPost, deletePost } from '../controller/posts.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

router.post('/post', createPost);
router.get('/posts', getPosts);
router.delete('/post/:_id',isAuth,deletePost);
router.put('/post/:_id');

export default router;