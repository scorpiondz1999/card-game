const { Schema, model } = require("mongoose");

const cardsSchema = new Schema({
  suit: {
    type: String,
  },
  type_card: {
    type: String,
  },
  value: {
    type: String,
  },
  type_player: {
    type: String, // player or computer
  },
});

const Cards = model("Cards", cardsSchema);

module.exports = Cards;
