const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const phSchema = new Schema({
    datelog: String,
    pcaseph: Number,
    dcaseph: Number,
    rcaseph: Number,
    diff: Number
    // datelog: {
    //     type: mongoose.Schema.Types.Mixed,
    //     required: true,
    // },
    // pcaseph: {
    //     type: mongoose.Schema.Types.Mixed,
    //     required: true,
    // },
    // rcaseph: {
    //     type: mongoose.Schema.Types.Mixed,
    //     required: true,
    // },
    // dcaseph: {
    //     type: mongoose.Schema.Types.Mixed,
    //     required: true,
    // }
}, { versionKey: false });

const phcase = mongoose.model("phcases", phSchema);
module.exports = phcase;