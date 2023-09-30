const mongoose = require("mongoose");

const venderSchema = new mongoose.Schema({
    name: { type: String, required:true },
    account_number: { type: Number, required:true },
    bank_name: { type: String, required:true },
    address_line_1: { type: String },
    address_line_2: { type: String },
    city: { type: String },
    country: { type: String },
    zip_code: { type: String }
})

const Vendor = mongoose.model("vendor",venderSchema);

module.exports = Vendor;