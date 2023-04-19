const express = require('express');
const app = express();

const cors = require("cors")
const geoip = require("geoip-lite");
const os_ = require("os");
const platform = require("platform");
const nodemailer = require('nodemailer');
const server = require('http').createServer(app);
const got = require('got');
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
const expressIp = require('express-ip');
app.use(expressIp().getIpInfoMiddleware);
const url = require('url');
const { uid } = require("uid")
const port = 3001;
const { connection,
    UserModel,
    AllLinksModel, ClickDataModel, MessagesDataModel } = require("./db");

app.use(express.json({ limit: '50mb' }))
app.use(cors())
io.on('connection', (socket) => {
    console.log('a user connected');
});
app.post("/shortenLink/:id", async (req, res) => {
    let data = req.body;
    if (!data.longURL) return res.send("Error Incorrect URL")
    let postData = {
        longURL: data.longURL,
        alias: data.alias || uid(5),
        remarks: data.remarks || "",
        userID: req.params.id,
        favourite: false,
        dateCreated: new Date(),
        clicks: 0,
    }
    try {
        const userData = UserModel.findById(req.params.id);
        if (!userData.domain) {
            postData.shortURL = "http://localhost:3001/" + postData.alias;
        }
        else postData.shortURL = `http://${userData.domain}/` + postData.alias;
        const allLinksOfUser = await AllLinksModel.find({ userID: req.params.id });
        console.log(allLinksOfUser)
        for (let i of allLinksOfUser) {
            if (i.shortURL == postData.shortURL) {
                return {
                    error: "Link with same alias and domain already exists"
                }
            }
        }
        postData.domain == userData.domain || "";
        const database = new AllLinksModel(postData);
        await database.save()
        res.send(data)
    }
    catch (err) {
        console.log(err)
    }
})



// _id: uid(24),
//     longURL: longURL,
//         alias: alias,
//             shortURL: shortLink,
//                 remarks: remarks,
//                     clicks: 0,
//                         domain: domainValue || "ceoitbox",
//                             userID: userDetails._id,
//                                 favourite: false,
//                                     dateCreated: new Date()







app.get("/:alias", async (req, res) => {
    try {
        const alias = req.params.alias;
        const data = await AllLinksModel.find();
        let longURL = "";
        // const domain = `${url.parse(req.protocol + '://' + req.get('host')).hostname}`;
        // const domain = `http://${req.get("Host")}/${alias}`;
        const domain = `https://${req.get("Host")}/${alias}`;
        // console.log(domain)
        let ipAddress = req.ipInfo.ip.split(",")
        let geo = geoip.lookup(ipAddress[0]);
        console.log(ipAddress[0])
        console.log(geo)
        let info = platform.parse(req.headers["user-agent"]);
        let country = geo ? geo.country : "Unknown";
        let region = geo ? geo.region : "Unknown";
        let city = geo ? geo.city : "Unknown";
        let timezone = geo ? geo.timezone : "Unknown";
        let latitude = geo ? geo.ll[0] : "Unknown";
        let logitude = geo ? geo.ll[1] : "Unknown";

        let result = {
            city: city,
            country: country,
            latitude: latitude,
            longitude: logitude,
            browser: info.name + " " + info.version,
            os: info.os.family + " " + info.os.version,
            userID: "",
            shortURL: domain
        };
        for (let i of data) {
            if (i.shortURL == domain) {
                longURL = i.longURL;
                let obj = {
                    clicks: i.clicks + 1
                }
                await AllLinksModel.findOneAndUpdate({ _id: i._id }, obj);
                result.userID = i.userID;
                let newData = new ClickDataModel(result);
                await newData.save()

                io.emit('newClick', { result, obj });
                res.redirect(longURL)
                return
            }
        }
        res.send({ domain })

    } catch (err) {
        console.log(err)
    }
})

// UserModel EndPoint
app.get("/shorten/users", async (req, res) => {
    try {
        const query = req.query;
        const data = await UserModel.find(query)
        res.send(data)
    }
    catch (err) {
        console.log(err)
    }

})
app.get("/shorten/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await UserModel.findById(id);
        res.send(data);
    }
    catch (err) {
        console.log(err)
    }

})
app.post("/shorten/users", async (req, res) => {
    try {
        const data = req.body;
        const database = new UserModel(data);
        await database.save()
        res.send(data)
    }
    catch (err) {
        console.log(err)
    }

})
app.delete("/shorten/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedObject = await UserModel.findByIdAndDelete(id);
        res.send(`Object with ID:${id} has been deleted`);
    }
    catch (err) {
        console.log(err)
    }

})
app.patch("/shorten/users/:id", async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const updatedObjet = await UserModel.findOneAndUpdate({ _id: id }, data);
        res.send(`Object with ID:${id} has been deleted`);
    }
    catch (err) {
        console.log(err)
    }

})

// AllDataModel EndPoint

app.get("/shorten/AllData", async (req, res) => {
    try {
        const query = req.query;
        const data = await AllLinksModel.find(query)
        res.send(data)
    }
    catch (err) {
        console.log(err)
    }

})
app.get("/shorten/AllData/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await AllLinksModel.findById(id);
        res.send(data);
    }
    catch (err) {
        console.log(err)
    }

})
app.post("/shorten/AllData", async (req, res) => {
    try {
        const data = req.body;
        const database = new AllLinksModel(data);
        await database.save()
        res.send(data)
    }
    catch (err) {
        console.log(err)
    }

})
app.delete("/shorten/AllData/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedObject = await AllLinksModel.findByIdAndDelete(id);
        res.send(`Object with ID:${id} has been deleted`);
    }
    catch (err) {
        console.log(err)
    }

})
app.patch("/shorten/AllData/:id", async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const updatedObjet = await AllLinksModel.findOneAndUpdate({ _id: id }, data);
        res.send(`Object with ID:${id} has been deleted`);
    }
    catch (err) {
        console.log(err)
    }

})

// messages EndPoint

app.get("/shorten/messages", async (req, res) => {
    try {
        const query = req.query;
        const data = await MessagesDataModel.find(query)
        res.send(data)
    }
    catch (err) {
        console.log(err)
    }

})
app.get("/shorten/messages/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await MessagesDataModel.findById(id);
        res.send(data);
    }
    catch (err) {
        console.log(err)
    }

})
app.post("/shorten/messages", async (req, res) => {
    try {
        const data = req.body;
        const database = new MessagesDataModel(data);
        await database.save()
        res.send(data)
    }
    catch (err) {
        console.log(err)
    }

})


//clicks

app.get("/shorten/clicks", async (req, res) => {
    try {
        const query = req.query;
        const data = await ClickDataModel.find(query)
        res.send(data)
    } catch (err) {
        console.log(err)
    }

})
app.patch("/shorten/clicks/:id", async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const updatedObjet = await ClickDataModel.findOneAndUpdate({ _id: id }, data);
        res.send(`Object with ID:${id} has been deleted`);
    }
    catch (err) {
        console.log(err)
    }

})

app.get("/shorten/licenceCheck", async (req, res) => {
    const { email } = req.body;
    const response = await got(
        "http://auth.ceoitbox.com/checkauth/CBX1221SURL01/" +
        email +
        "/CBX1221SURL01-SHORTURLSITE/NA/NA"
    );
    const body_ = JSON.parse(response.body);
    let limit = 0;
    if (body_.valid == "Active") {
        if (body_.version == "basic") {
            limit = 500;
        }

        if (body_.version == "pro") {
            limit = 5000;
        }
    } else {
        limit = 500;
    }
    res.send({ limit })
})

app.delete("/shorten/clicks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedObject = await ClickDataModel.findByIdAndDelete(id);
        res.send(`Object with ID:${id} has been deleted`);
    } catch (err) {
        console.log(err)
    }

})

function generateOTP(length) {
    try {
        const chars = '0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    } catch (err) {
        console.log(err)
    }

}

app.post("/shorten/sendOtp", async (req, res) => {
    try {
        const { email } = req.body;
        const OTP = generateOTP(6);
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                // user: 'apps@ceoitbox.in',
                // pass: 'xnhrwhxmpkamzawt'
                user: 'raghbir@ceoitbox.in',
                pass: 'wzqjqigcjndowund'
            }
        });
        const mailOptions = {
            from: 'apps@ceoitbox.in',
            to: email,
            subject: 'OTP',
            text: 'Your CBXITBOX OTP is ' + OTP
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.send(OTP)
    } catch (err) {
        console.log(err)
    }
})
app.post("/shorten/send/email", async (req, res) => {

    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'raghbir@ceoitbox.in',
            pass: 'wzqjqigcjndowund'
            // user: 'apps@ceoitbox.in',
            // pass: 'xnhrwhxmpkamzawt'
        }
    });
    const mailOptions1 = {
        from: 'apps@ceoitbox.in',
        to: email,
        subject: 'Confirmation Message',
        text: `You contacted with CBX it BOX. Your details are : 
            Name:${name},
            Email:${email},
            Message( Your Sent ) : ${message}
            `
    };

    transporter.sendMail(mailOptions1, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send({ message })

})











server.listen(port, async () => {
    try {
        await connection
        console.log("Connected to db")
    } catch (err) {
        console.log(err)
    }
    console.log("Server Started at PORT", port)
})




