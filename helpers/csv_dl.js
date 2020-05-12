const fs = require("fs");
const request = require("request");
const path = require("path");
const async = require("async");

const csvdir = `${__dirname}/../csv`
const site1 = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
const site2 = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
const site3 = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";

// DOWNLOAD CSV FILE
const download = (uri, filename, callback) =>
{
    request.head(uri, (err, res, body) =>
    {
        // console.log("content-type:", res.headers["content-type"]);
        // console.log("content-length:", res.headers["content-length"]);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    })
}

function toDownall(){
    download(site1, path.join(csvdir + '/cases.csv'), () =>
    {
        console.log("CSV-1 Download Complete");
    });

    download(site2, path.join(csvdir + '/deaths.csv'), () =>
    {
        console.log("CSV-2 Download Complete");
    });

    download(site3, path.join(csvdir + '/recovered.csv'), () =>
    {
        console.log("CSV-3 Download Complete");
    });
}

function toGetDateTime()
{
    const format = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year:'numeric', 
    hour:'numeric', minute:'numeric', hour12:false, timeZoneName:'long', timeZone:'Asia/Manila' });
    const date = format.format(new Date());
    fs.writeFile(path.join(csvdir + '/date.txt'), date, (err) => {
        if (err) throw err;
        console.log("Timestamp Saved");
    })
}

var q = async.priorityQueue(function(task, callback) {
    callback();
}, 1);

q.push({name: 'Timestamp'}, 1, function(err) {
    setTimeout(() => {
        toGetDateTime();
    }, 500);
});

q.push({name: 'Download'}, 2, function(err) {
    setTimeout(() => {
        toDownall();
    }, 3000);
});