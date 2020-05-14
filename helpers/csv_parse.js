const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const async = require("async");
const phcases = require("./schema.js");

const csvpath1 = `${__dirname}/../csv/cases.csv`;
const csvpath2 = `${__dirname}/../csv/deaths.csv`;
const csvpath3 = `${__dirname}/../csv/recovered.csv`;
var temp = [];

// UPDATE LOCAL CSV DATA
files = [csvpath1, csvpath2, csvpath3];
for (var i=0; i<files.length; i++)
{
    var data = fs.readFileSync(files[i], "UTF-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line)=>{
        if(line.includes("Philippines") || line.includes("Province/State") && i==0){
            temp.push(line);
        }
    }); 
}

// STORE GATHERED DATA FROM CSV
var header = temp[0].split(",");
var cases = temp[1].split(",");
var deaths = temp[2].split(",");
var recoveries = temp[3].split(",");
var dp = [];
var dd = [];
var dr = [];
var toSave = [];

// TIMESTAMP OF DB UPDATE
const format = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year:'numeric', 
hour:'numeric', minute:'numeric', hour12:false, timeZoneName:'long', timeZone:'Asia/Manila' });
const date = format.format(new Date());

// MONGODB UPLOAD DATA
dotenv.config({path: "var.env"});
const url = process.env.MONGOLAB_URI;
const opt = {useUnifiedTopology: true, useNewUrlParser: true}; 

// PROCESS GATHERERED DATA FROM CSV
function toStore(){
    for(var i=4; i < header.length; i++){
        if(i!=4){
            dp.push(parseInt(cases[i])-parseInt(cases[i-1]));
            dd.push(parseInt(deaths[i])-parseInt(deaths[i-1]));
            dr.push(parseInt(recoveries[i])-parseInt(recoveries[i-1]));
        }
        else{
            dp.push(parseInt(cases[i]));
            dd.push(parseInt(deaths[i]));
            dr.push(parseInt(recoveries[i]));
        }
    }
    for(var i=4; i < header.length; i++){
        var finalave = 0;
        if(i>12){
            var aver = 0;
            for(var k=i; k > i-10; k--){
                aver += dp[k-4];   
            }
            finalave = aver/10;
        }
        else{
            finalave = null;
        }
        var toIns = {datelog: header[i], pcaseph: cases[i], dcaseph: deaths[i], 
            rcaseph: recoveries[i], diffp: dp[i-4], diffd: dd[i-4], diffr: dr[i-4], average: finalave,
            tstamp: date};  
        toSave.push(toIns);
    }   
    console.log("Stored");
}

// DELETE ALL FROM DB
function toDelete(){
    phcases.deleteMany({}, (err) => {
        console.log("Deleted");
    });
}

// INSERT PROCESSED DATA TO DB
function toInsert(){
    phcases.insertMany(toSave, (err) => {
        console.log("Saved");
    });
}

// CONNECT TO MONGODB USING MONGOOSE
function toConnect(){
    mongoose.connect(url, opt);
    console.log("Connect");
}

// CLOSE CONNECTION FROM MONGODB
function toDC(){
    mongoose.connection.close();
    console.log("DC");
}

// PRIORITY QUEUE TO MAINTAIN ORDERED EXECUTION OF TASKS 
var q = async.priorityQueue(function(task, callback) {
    callback();
}, 1);

q.push({name: 'Store'}, 1, function(err) {
    setTimeout(() => {
        toStore();
    }, 5000);
});

q.push({name: 'Connect'}, 2, function(err) {
    setTimeout(() => {
        toConnect();
    }, 500);
});

q.push({name: 'Delete'}, 3, function(err) {
    setTimeout(() => {
        toDelete();
    }, 5000);
});

q.push({name: 'Insert'}, 4, function(err) {
    setTimeout(() => {
        toInsert();
    }, 5000);
});

q.push({name: 'DC'}, 5, function(err) {
    setTimeout(() => {
        toDC();
    }, 10000);
});
