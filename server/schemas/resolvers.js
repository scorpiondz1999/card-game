const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        login: async ({ email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (args) => {
            const user = await User.create(args);
            const token = signToken(user);
            console.log(token);
            return { token, user };
        }
    }
}

module.exports = resolvers;