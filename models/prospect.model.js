const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const prospectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: String,
  address: String,
  contactno: Number,
  familydetails: String,
  moredetails: String,
  agent: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Prospect", prospectSchema);
