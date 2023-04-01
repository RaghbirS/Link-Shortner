const mongoose = require("mongoose");

// const connection = mongoose.connect("mongodb://localhost:27017/ceoitbox");
const connection = mongoose.connect("mongodb+srv://apiglobal37:apiglobal37@cluster0.h3reutl.mongodb.net/linkShortner");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    domain:String
})

const allLinksSchema = mongoose.Schema({
    longURL: String,
    alias: String,
    shortURL: String,
    remarks: String,
    clicks: Number,
    domain:String,
    userID:String
})

const UserModel = mongoose.model("user", userSchema);
const AllLinksModel = mongoose.model("AllLinks", allLinksSchema);

module.exports = {
    connection,
    UserModel,
    AllLinksModel
}