const fs = require("fs");

const csvpath1 = `${__dirname}/../csv/cases.csv`;
const csvpath2 = `${__dirname}/../csv/deaths.csv`;
const csvpath3 = `${__dirname}/../csv/recovered.csv`;
const datapath = `${__dirname}/../csv/_phdata.csv`;

// UPDATE LOCAL CSV DATA
files = [csvpath1, csvpath2, csvpath3];
for (var i=0; i<files.length; i++)
{
    var data = fs.readFileSync(files[i], "UTF-8");
    const lines = data.split(/\r?\n/);
    lines.forEach((line)=>{
        if(line.includes("Philippines")){
            fs.appendFile(datapath, '\r\n'+line, (err) => {
                if (err) throw err;
                console.log("Saved!");
            });
        }
    });
}
// fs.unlink(datapath, (err) => {
//     if (err) throw err;
//     console.log("Deleted!");
// });