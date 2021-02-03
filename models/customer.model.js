const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: String,
  address: String,
  contactno: Number,
  familydetails: String,
  moredetails: String,
  premiumterm: String,
  premium: Number,
  agent: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Customer", customerSchema);
