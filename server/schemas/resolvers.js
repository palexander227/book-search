const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User,Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, params, context) => {
      const foundUser = await User.findOne({
        $or: [{ _id: context.user ? context.user._id : params.id }, { username: params.username }],
      });
  
      if (!foundUser) {
        throw new UserInputError('Cant find user with this id!');
      }
    
      return foundUser
    },

  },
  Mutation:{
    addUser: async(parent,args) => {
      const user = await User.create(args);
        
      if (!user) {
        throw new UserInputError('Something is Wrong');
      }
      const token = signToken(user);
      return ({ token, user });
    },

    login: async (parent, { email, password }) => {

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
 
    saveBook: async(parent, args, context) =>{
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: args } },
            { new: true, runValidators: true }
          );
          return updatedUser;
        }
  
        throw new AuthenticationError('Not logged in');
        
      } catch (err) {
        console.log(err);
        throw new UserInputError(err);
      }
    },

    deleteBook: async(parent, params, context) =>{
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new UserInputError("Couldn't find user with this id!" );
      }
      return updatedUser;
    },
  },

};

module.exports = resolvers;
