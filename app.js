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

// RUN SCHEDULED UPDATES (EVERY 8 HRS)
const runup = schedule.scheduleJob("0 */6 * * *", () =>
{
    getDateTime();
    const cp = childProcess.fork(path.join(__dirname, "helpers/csv_dl.js"));
    cp.on("exit", (code, signal) => {
        console.log("Download Done!", {code: code, signal: signal});
        const cp2 = childProcess.fork(path.join(__dirname, "helpers/csv_parse.js"));
        cp2.on("exit", (code, signal) => {
            console.log("Database Update Done!", {code: code, signal: signal});
        });
        cp2.on("error2", console.error.bind(console));
    });
    cp.on("error1", console.error.bind(console));
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug"); 
app.use(express.static(path.join(__dirname, "views")));

// ROUTES
app.get('/home', (req, res) => 
{
    var plist = [];
    var rlist = [];
    var dlist = [];
    var datelog = [];
    var diffp = [];
    var diffd = [];
    var diffr = [];
    phcases.find({}).then(eachOne => {
        for(var i=0; i < eachOne.length; i++){
            datelog.push(eachOne[i]["datelog"])
            plist.push(eachOne[i]["pcaseph"]);
            rlist.push(eachOne[i]["rcaseph"]);
            dlist.push(eachOne[i]["dcaseph"]);
            diffp.push(eachOne[i]["diffp"]);
            diffd.push(eachOne[i]["diffd"]);
            diffr.push(eachOne[i]["diffr"]);
        }
        const p = plist[plist.length-1];
        const d = dlist[dlist.length-1];
        const r = rlist[rlist.length-1];
        const datetime = fs.readFileSync(path.join(__dirname, "csv", "date.txt")).toString();
        res.render("home", { pos: JSON.stringify(p), rec: JSON.stringify(r), dea: JSON.stringify(d), 
            date: JSON.stringify(datetime), dl: JSON.stringify(datelog), dp: JSON.stringify(diffp),
            dd: JSON.stringify(diffd), dr: JSON.stringify(diffr) });
    })
}) 

app.get('/aboutus', (req, res) => 
{
    res.render("aboutus", {});
})

function getDateTime()
{
    const format = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year:'numeric', 
    hour:'numeric', minute:'numeric', hour12:false, timeZoneName:'long', timeZone:'Asia/Manila' });
    const date = format.format(new Date());
    fs.writeFile(path.join(__dirname, "csv", "date.txt"), date, (err) => {
        if (err) throw err;
    })
}

// ROUTES FOR GETTING SPECIFIC FIELD
app.get('/api/all', (req, res) =>
{
    phcases.find({}).then(eachOne => {
        res.json(eachOne);
    })
});

app.get('/api/datelog', (req, res) =>
{
    phcases.find({}, { _id:0, pcaseph:0, rcaseph:0, dcaseph:0, diff: 0 }).then(eachOne => {
        res.json(eachOne);
    })
});

app.get('/api/pcasesph', (req, res) =>
{
    phcases.find({}, { _id:0, datelog:0, rcaseph:0, dcaseph:0, diff: 0 }).then(eachOne => {
        res.json(eachOne);
    })
});

app.get('/api/rcasesph', (req, res) =>
{
    phcases.find({}, { _id:0, datelog:0, pcaseph:0, dcaseph:0, diff: 0 }).then(eachOne => {
        res.json(eachOne);
    })
});

app.get('/api/dcasesph', (req, res) =>
{
    phcases.find({}, { _id:0, datelog:0, rcaseph:0, pcaseph:0, diff: 0 }).then(eachOne => {
        res.json(eachOne);
    })
});

app.get('/api/diff', (req, res) =>
{
    phcases.find({}, { _id:0, datelog:0, rcaseph:0, pcaseph:0, dcaseph: 0 }).then(eachOne => {
        res.json(eachOne);
    })
});

mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, (err, db) => 
{
    if(err){
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } 
    else{
        console.log('Connection established to mongoDB server');
    }
});
