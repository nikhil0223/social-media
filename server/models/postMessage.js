import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema =new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    tags: {
        type: [String]
    },
    selectedFile: {
        type: String,
        // required: true 
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;