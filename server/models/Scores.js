const { Schema, model } = require("mongoose");

const scoreSchema = new Schema(
  {
    idSession: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    scorePlayer: {
      type: String,
      required: true,
    },
    scoreComputer: {
      type: String,
      required: true,
    },
    setsNumber: {
      type: String,
    },
    timeGame: {
      type: String,
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const Score = model("Score", scoreSchema);

module.exports = Score;
