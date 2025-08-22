const mongoose = require("mongoose");

const mongodbConnectString = process.env.MONGOOSE_CONNECTION_STRING;

const db = mongoose.connect(mongodbConnectString, { useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true });

module.exports.db = db;