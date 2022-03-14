const { AuthenticationError } = require("apollo-server-express");
const { User, Cards } = require("../models");
const { signToken } = require("../utils/auth");
const { startGame } = require("../controllers/game-controller");

const resolvers = {
  Query: {
    player: async () => {
      const data = await startGame();
      console.log(data);
      return {
        player: data,
      };
    },
  },
  Mutation: {
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
    saveCards: async (parent, args, context) => {
      if (context.user) {
        try {
        } catch (err) {
          console.log(err);
          //return res.status(400).json(err);
        }
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeCards: async (parent, args, context) => {
      if (context.user) {
      }
      throw new AuthenticationError("need to be logged in!");
    },
  },
};

module.exports = resolvers;
