const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const childProcess = require("child_process");
const schedule = require("node-schedule");
const fs = require("fs");
const phcases = require("./helpers/schema.js");

const app = express();

dotenv.config({path: "var.env"});
const url = process.env.MONGOLAB_URI;       

// RUN SCHEDULED UPDATES (EVERY 12 HRS)
const runup = schedule.scheduleJob("0 */12 * * *", () =>
{
    const cp = childProcess.fork(path.join(__dirname, "helpers/csv_dl.js"));
    cp.on("exit", (code, signal) => {
        console.log("Download Done!", {code: code, signal: signal});
        const cp2 = childProcess.fork(path.join(__dirname, "helpers/csv_parse.js"));
        cp2.on("exit", (code, signal) => {
            console.log("CSV Update Done!", {code: code, signal: signal});
        });
        cp2.on("error2", console.error.bind(console));
    });
    cp.on("error1", console.error.bind(console));
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug"); 
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.get('/', (req, res) => 
{   
    res.render("app", { title: "Welcome" })
});

app.get('/home', (req, res) => 
{
    res.render("homepage", { title: "Home" })
});

// ROUTES FOR GETTING SPECIFIC FIELD
app.get('/api/all', (req, res) =>
{
    phcases.find({}).then(eachOne => {
        res.json(eachOne);
    })
});

app.get('/api/datelog', (req, res) =>
{
    phcases.find({}, { _id:0, pcaseph:0, rcaseph:0, dcaseph:0 }).then(eachOne => {
        res.json(eachOne);
    })
});

app.get('/api/pcasesph', (req, res) =>
{
    phcases.find({}, { _id:0, datelog:0, rcaseph:0, dcaseph:0 }).then(eachOne => {
        res.json(eachOne);
    })
});

app.get('/api/rcasesph', (req, res) =>
{
    phcases.find({}, { _id:0, datelog:0, pcaseph:0, dcaseph:0 }).then(eachOne => {
        res.json(eachOne);
    })
});

app.get('/api/dcasesph', (req, res) =>
{
    phcases.find({}, { _id:0, datelog:0, rcaseph:0, pcaseph:0 }).then(eachOne => {
        res.json(eachOne);
    })
});

app.post('/api/phcases', (req, res) =>
{
    phcases.create({
        id: req.body.iddata,
        datelog: req.body.datelogdata,
        pcaseph: req.body.pcasephdata,
        rcaseph: req.body.rcasephdata,
        dcaseph: req.body.dcasephdata,
    }).then(covid19 => {
        res.json(covid19)
    });
});

mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, (err, db) => 
{
    if(err){
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } 
    else{
        console.log('Connection established to MORI-1 Database');
    }
});
