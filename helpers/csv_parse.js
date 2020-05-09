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

// STORE GATHERED DATA
var header = temp[0].split(",");
var cases = temp[1].split(",");
var deaths = temp[2].split(",");
var recoveries = temp[3].split(",");
var toSave = [];

// MONGODB UPLOAD DATA
dotenv.config({path: "var.env"});
const url = process.env.MONGOLAB_URI;
const opt = {useUnifiedTopology: true, useNewUrlParser: true}; 

function toStore(){
    for(var i=4; i < header.length; i++){
        var toIns = {datelog: header[i], pcaseph: cases[i], dcaseph: deaths[i], 
            rcaseph: recoveries[i], diffp: parseInt(cases[i])-parseInt(cases[i-1]), 
            diffd: parseInt(deaths[i])-parseInt(deaths[i-1]), 
            diffr: parseInt(recoveries[i])-parseInt(recoveries[i-1])};
        var toInsOpt = {datelog: header[i], pcaseph: cases[i], dcaseph: deaths[i], 
            rcaseph: recoveries[i], diffp: parseInt(cases[i]), diffd: parseInt(deaths[i]),
            diffr: parseInt(recoveries[i])};
        if(i==4) { toSave.push(toInsOpt); }
        else { toSave.push(toIns); }  
    }
    console.log("Stored");
}

function toDelete(){
    phcases.deleteMany({}, (err) => {
        console.log("Deleted");
    });
}

function toInsert(){
    phcases.insertMany(toSave, (err) => {
        console.log("Done!");
    });
}

function toConnect(){
    mongoose.connect(url, opt);
    console.log("Connect");
}

function toDC(){
    mongoose.connection.close();
    console.log("DC");
}


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



