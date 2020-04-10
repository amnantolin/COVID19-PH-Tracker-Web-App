// DOWNLOAD CSV FILE AND UPDATE DB (USE SCHEDULER)
const fs = require("fs");
const request = require("request");
const path = require("path");

const csvdir = `${__dirname}/csv`

const site1 = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
const site2 = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
const site3 = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";

const download = (uri, filename, callback) =>
{
    request.head(uri, (err, res, body) =>
    {
        console.log("content-type:", res.headers["content-type"]);
        console.log("content-length:", res.headers["content-length"]);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    })
}

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