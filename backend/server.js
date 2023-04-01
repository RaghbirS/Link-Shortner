const express = require('express');
const app = express();
const cors = require("cors")
const port = process.env.PORT || 3001;
const { connection,
    UserModel,
    AllLinksModel } = require("./db");

app.use(express.json({ limit: '50mb' }))
app.use(cors())

app.get("/:alias", async (req, res) => {
    const alias = req.params.alias;
    const data = await AllLinksModel.find();
    let longURL = "";
    const domain = `http://${req.get("Host")}/${alias}`;
    for (let i of data) {
        if (i.shortURL == domain) {
            longURL = i.longURL;
            let obj = {
                clicks:i.clicks+1
            }
            await AllLinksModel.findOneAndUpdate({ _id: i._id }, obj);
            res.redirect(longURL)
            return
        }
    }
    // res.end()
})

// UserModel EndPoint
app.get("/shorten/users", async (req, res) => {
    const query = req.query;
    const data = await UserModel.find(query)
    res.send(data)
})
app.get("/shorten/users/:id", async (req, res) => {
    const id = req.params.id;
    const data = await UserModel.findById(id);
    res.send(data);
})
app.post("/shorten/users", async (req, res) => {
    const data = req.body;
    const database = new UserModel(data);
    await database.save()
    res.send(data)
})
app.delete("/shorten/users/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await UserModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/shorten/users/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObjet = await UserModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})

// AllDataModel EndPoint

app.get("/shorten/AllData", async (req, res) => {
    const query = req.query;
    const data = await AllLinksModel.find(query)
    res.send(data)
})
app.get("/shorten/AllData/:id", async (req, res) => {
    const id = req.params.id;
    const data = await AllLinksModel.findById(id);
    res.send(data);
})
app.post("/shorten/AllData", async (req, res) => {
    const data = req.body;
    const database = new AllLinksModel(data);
    await database.save()
    res.send(data)
})
app.delete("/shorten/AllData/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await AllLinksModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/shorten/AllData/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObjet = await AllLinksModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})



app.listen(port, async () => {
    try {
        await connection
        console.log("Connected to db")
    } catch (err) {
        console.log(err)
    }
    console.log("Server Started at PORT", port)
})


