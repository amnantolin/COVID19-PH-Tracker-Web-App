const fs = require("fs");
const request = require("request");
const path = require("path");
const parse  = require("csv-parse")
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
        console.log("content-type:", res.headers["content-type"]);
        console.log("content-length:", res.headers["content-length"]);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    })
}

//READ CSV AND TRANSFER PH DATA TO NEW CSV FILE
var parser = parse({delimiter: ','}, function (err, data) {
    async.eachSeries(data, function (line, callback) {
        console.log(line);
        if(line.indexOf("Philippines") > -1)
        {
            fs.appendFile(path.join(csvdir + '/_phdata.csv'), '\r\n'+line, (err) => {
                if (err) throw err;
                console.log("Saved!");
            });
        }
        callback();
    })
});

download(site1, path.join(csvdir + '/cases.csv'), () =>
{
    console.log("CSV-1 Download Complete");
    // fs.createReadStream(path.join(csvdir + '/cases.csv')).pipe(parser);
});

download(site2, path.join(csvdir + '/deaths.csv'), () =>
{
    console.log("CSV-2 Download Complete");
    // fs.createReadStream(path.join(csvdir + '/deaths.csv')).pipe(parser);
});

download(site3, path.join(csvdir + '/recovered.csv'), () =>
{
    console.log("CSV-3 Download Complete");
    // fs.createReadStream(path.join(csvdir + '/recovered.csv')).pipe(parser);
});



fs.createReadStream(path.join(csvdir + '/cases.csv')).pipe(parser);
fs.createReadStream(path.join(csvdir + '/deaths.csv')).pipe(parser);
fs.createReadStream(path.join(csvdir + '/recovered.csv')).pipe(parser);

