const mongoose = require("mongoose");

// const connection = mongoose.connect("mongodb://localhost:27017/ceoitbox");
const connection = mongoose.connect("mongodb+srv://ceoitbox:ceoitbox@slm.dlakl.mongodb.net/linkShortner");
// const connection = mongoose.connect("mongodb+srv://apiglobal37:apiglobal37@cluster0.h3reutl.mongodb.net/linkShortner");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    domain: String,
    isAdmin: Boolean,
    googleSheetDeployLink: String
})

const allLinksSchema = mongoose.Schema({
    longURL: String,
    alias: String,
    shortURL: String,
    remarks: String,
    clicks: Number,
    userID: String,
    favourite: Boolean,
    dateCreated: Object
})

const clickDataSchema = mongoose.Schema({
    city: String,
    country: String,
    latitude: String,
    longitude: String,
    browser: String,
    os: String,
    userID: String,
    shortURL: String
})
const messagesData = mongoose.Schema({
    name: String,
    email: String,
    message: String,
})

const UserModel = mongoose.model("user", userSchema);
const AllLinksModel = mongoose.model("AllLinks", allLinksSchema);
const ClickDataModel = mongoose.model("clicks", clickDataSchema);
const MessagesDataModel = mongoose.model("messages", messagesData);

module.exports = {
    connection,
    UserModel,
    AllLinksModel,
    ClickDataModel,
    MessagesDataModel
}