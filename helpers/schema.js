const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const phSchema = new Schema({
    datelog: String,
    pcaseph: Number,
    dcaseph: Number,
    rcaseph: Number,
    diffp: Number,
    diffd: Number,
    diffr: Number,
    average: Number
}, { versionKey: false });

const phcase = mongoose.model("phcases", phSchema);
module.exports = phcase;