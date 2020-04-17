const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const phSchema = new Schema({
<<<<<<< HEAD
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
=======
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
>>>>>>> 5fc23bae37fb2f07e47a8297bd50cf4c68910e3b
