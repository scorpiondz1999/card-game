const { AuthenticationError } = require("apollo-server-express");
const { User, Cards, Scores } = require("../models");
const { signToken } = require("../utils/auth");
const { startGame } = require("../controllers/game-controller");

const resolvers = {
  Query: {
    getgames: async (parent, args) => {
      const games = await Scores.find({ username: { $ne: "null" } }).sort({
        scorePlayer: -1,
      });
      return games;
    },
  },
  Mutation: {
    deck: async (parent, { data }) => {
      console.log("start game here : " + data);
      const result = await startGame(data);
      console.log(result.deck);
      const resDeck = result.deck;
      const resPlayer = result.player;
      const resComputer = result.computer;
      return {
        session: result.session,
        deck: resDeck,
        player: resPlayer,
        computer: resComputer,
      };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        console.log("Incorrect credentials");
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    signup: async (parent, args) => {
      console.log("args: " + args);
      const user = await User.create(args);
      const token = signToken(user);
      console.log(token);
      return { token, user };
    },
    savegame: async (parent, args) => {
      try {
        console.log("args: " + args);
        const idSession = args.idSession;
        const score = await Scores.findOneAndUpdate(
          { idSession: idSession },
          args
        );
        console.log(score);
        return { idSession };
      } catch (err) {
        console.log(err);
        //return res.status(400).json(err);
      }
    },
  },
};

module.exports = resolvers;
