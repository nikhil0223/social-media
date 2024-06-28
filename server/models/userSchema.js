import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    posts:[{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

const User = mongoose.model("User",userSchema);

export default User;