const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });

        return userData;
      }

      throw new AuthenticationError("Not logged in");
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
