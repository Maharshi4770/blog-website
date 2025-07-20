const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String, 
});


const postSchema = new Schema({
    title: String,
    content: String,
    author: String,
    creatorId : ObjectId
})


const userModel = mongoose.model("user",userSchema);
const postModel = mongoose.model("post",postSchema);

module.exports = {
    userModel,
    postModel
}
