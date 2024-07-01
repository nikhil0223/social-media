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
import 'dotenv/config';


const app = express();


// app.use(cors());

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

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({  extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images' , express.static(path.join(__dirname,'images')));
app.use(multer({storage:storage,fileFilter:fileFilter}).single('selectedFile'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(postRoutes);
app.use(authRoutes);



const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL).then(() => app.listen(PORT, () => console.log("server is running on port:" + PORT))).catch(err => console.log(err));
