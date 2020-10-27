const mongoose = require('mongoose');
const tblRecordSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    address: String,
    age: Number
})

const tblRecord = mongoose.model("tblRecord",tblRecordSchema);

module.exports = tblRecord;