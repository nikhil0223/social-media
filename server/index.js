import path from 'path';
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import authRoutes from './routes/auth.js';
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from 'url';

const app = express();


app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage= multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4());
    }
});

const fileFilter= (req,file,cb)=>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === 'image/jpg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};


app.use(cors());
app.use(postRoutes);
app.use(authRoutes);
app.use(multer({storage:storage,fileFilter:fileFilter}).single('file'));

app.use('/images' , express.static(path.join(__dirname,'images')));


const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://nikhil2306:5ZeDaj6D-UeGnjj@cluster0.cgowcit.mongodb.net/social-media?retryWrites=true&w=majority&appName=Cluster0').then(() => app.listen(PORT, () => console.log("server is running on port:" + PORT))).catch(err => console.log(err));
