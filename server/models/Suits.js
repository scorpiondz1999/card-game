const { Schema, model } = require("mongoose");

const suitsSchema = new Schema({
  suit: {
    //The id of the schema
    type: String,
    required: true,
  },
  type_card: {
    type_card: String, // red or black
  },
});

const Suits = model("Suits", suitsSchema);

module.exports = Suits;
