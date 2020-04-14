const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const phSchema = new Schema({
    datelog: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    pcaseph: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    rcaseph: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    dcaseph: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    }
})

const phcases = mongoose.model("phcases", phSchema);
module.exports = phcases;