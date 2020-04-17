// const fs = require("fs");
// const request = require("request");
// const path = require("path");
// const parse  = require("csv-parse")
const async = require("async");

// const csvdir = `${__dirname}/../csv`
// const site1 = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
// const site2 = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
// const site3 = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";

// // DOWNLOAD CSV FILE
// const download = (uri, filename, callback) =>
// {
//     request.head(uri, (err, res, body) =>
//     {
//         console.log("content-type:", res.headers["content-type"]);
//         console.log("content-length:", res.headers["content-length"]);
//         request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
//     })
// }

// //READ CSV AND TRANSFER PH DATA TO NEW CSV FILE
// var parser = parse({delimiter: ','}, function (err, data) {
//     async.eachSeries(data, function (line, callback) {
//         console.log(line);
//         if(line.indexOf("Philippines") > -1)
//         {
//             fs.appendFile(path.join(csvdir + '/_phdata.csv'), '\r\n'+line, (err) => {
//                 if (err) throw err;
//                 console.log("Saved!");
//             });
//         }
//         callback();
//     })
// });

// download(site1, path.join(csvdir + '/cases.csv'), () =>
// {
//     console.log("CSV-1 Download Complete");
//     // fs.createReadStream(path.join(csvdir + '/cases.csv')).pipe(parser);
// });

// download(site2, path.join(csvdir + '/deaths.csv'), () =>
// {
//     console.log("CSV-2 Download Complete");
//     // fs.createReadStream(path.join(csvdir + '/deaths.csv')).pipe(parser);
// });

// download(site3, path.join(csvdir + '/recovered.csv'), () =>
// {
//     console.log("CSV-3 Download Complete");
//     // fs.createReadStream(path.join(csvdir + '/recovered.csv')).pipe(parser);
// });



// fs.createReadStream(path.join(csvdir + '/cases.csv')).pipe(parser);
// fs.createReadStream(path.join(csvdir + '/deaths.csv')).pipe(parser);
// fs.createReadStream(path.join(csvdir + '/recovered.csv')).pipe(parser);



// async function run(){
//     await mongoose.connect(url, opt);
//     // UNCOMMENT TO DELETE ALL DOCS
//     phcases.deleteMany({}, (err) => {
//         console.log("Deleted");
//     });
//     for(var i=4; i < header.length-2; i++)
//     {
//         await phcases.findOne({ 'datelog': header[i] }, function (err, res) {
//             // if (err) throw err;
//             // if (!res){
//             //     var toIns = new phcases({datelog: header[i], pcaseph: cases[i], dcaseph: deaths[i], 
//             //         rcaseph: recoveries[i], diff: parseInt(cases[i])-parseInt(cases[i-1])});
//             //     var toInsOpt = new phcases({datelog: header[i], pcaseph: cases[i], dcaseph: deaths[i], 
//             //         rcaseph: recoveries[i], diff: parseInt(cases[i])});
//             //     if(i==4){
//             //         toInsOpt.save((err, doc) => {
//             //             if (err) throw err;
//             //             console.log("Done!",i);
//             //         });
//             //     }
//             //     else{
//             //         toIns.save((err, doc) => {
//             //             if (err) throw err;
//             //             console.log("Done!",i);
//             //         });
//             //     }
//             // }
//             // else{
//             //     console.log("%s is Available Already %s", header[i], i);
//             // }
//         });
//     };
//     return mongoose.connection.close();
// }


// for(var i=4; i < header.length+1; i++)
//     {
//         await phcases.findOne({ 'datelog': header[i] }, function (err, res) {
//             // if (err) throw err;
//             // if (!res){
//             //     var toIns = new phcases({datelog: header[i], pcaseph: cases[i], dcaseph: deaths[i], 
//             //         rcaseph: recoveries[i], diff: parseInt(cases[i])-parseInt(cases[i-1])});
//             //     var toInsOpt = new phcases({datelog: header[i], pcaseph: cases[i], dcaseph: deaths[i], 
//             //         rcaseph: recoveries[i], diff: parseInt(cases[i])});
//             //     if(i==4){
//             //         toInsOpt.save((err, doc) => {
//             //             if (err) throw err;
//             //             console.log("Done!",i);
//             //         });
//             //     }
//             //     else{
//             //         toIns.save((err, doc) => {
//             //             if (err) throw err;
//             //             console.log("Done!",i);
//             //         });
//             //     }
//             // }
//             // else{
//             //     console.log("%s is Available Already %s", header[i], i);
//             // }
//             // var add = {datelog: header[i], pcaseph: cases[i], dcaseph: deaths[i], 
//             //         rcaseph: recoveries[i], diff: parseInt(cases[i])-parseInt(cases[i-1])};
//             // phcases.create(add, (err) => {
//             //     console.log(i);
//             // })
//             // // UNCOMMENT TO DELETE ALL DOCS
//             // phcases.deleteMany({}, (err) => {
//             //     console.log("Deleted");
//             // });
//         });
//     };
//     return mongoose.connection.close();

function resolveAfter2Seconds() {
    console.log("starting slow promise")
    return new Promise(resolve => {
      setTimeout(function() {
        resolve("slow")
        console.log("slow promise is done")
      }, 2000)
    })
}
  
function resolveAfter1Second() {
    console.log("starting fast promise")
    return new Promise(resolve => {
        setTimeout(function() {
        resolve("fast")
        console.log("fast promise is done")
        }, 1000)
    })
}

async function sequentialStart() {
    console.log('==SEQUENTIAL START==')

    // 1. Execution gets here almost instantly
    const slow = await resolveAfter2Seconds()
    console.log(slow) // 2. this runs 2 seconds after 1.

    const fast = await resolveAfter1Second()
    console.log(fast) // 3. this runs 3 seconds after 1.
}
sequentialStart();