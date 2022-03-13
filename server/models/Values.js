const { Schema, model } = require("mongoose");

const valuesSchema = new Schema({
  value: {
    //The id of the schema
    type: String,
    required: true,
  },
});

const Values = model("Values", valuesSchema);

module.exports = Values;
