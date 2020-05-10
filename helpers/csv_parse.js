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
var dp = [];
var dd = [];
var dr = [];
var toSave = [];

// MONGODB UPLOAD DATA
dotenv.config({path: "var.env"});
const url = process.env.MONGOLAB_URI;
const opt = {useUnifiedTopology: true, useNewUrlParser: true}; 

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
            rcaseph: recoveries[i], diffp: dp[i-4], diffd: dd[i-4], diffr: dr[i-4], average: finalave};  
        toSave.push(toIns);
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



