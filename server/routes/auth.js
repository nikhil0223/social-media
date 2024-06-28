import express from 'express';
import { login, signup } from '../controller/auth.js';

const app = express();

app.post('/auth/signup',signup);
app.post('/auth/login',login);

export default app;