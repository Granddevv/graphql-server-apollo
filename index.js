// import * as express from "express";
const express = require("express");
// import { ApolloServer, gql } from "apollo-server-express";
const { ApolloServer, gql } = require("apollo-server-express");
const app = express();
const cors = require("cors");

const schema = gql`
  type Query {
    listUser: [User]
    getUser(id: ID!): User
    listGroup: [Group]
    getDefaultUser: User
  }

  type User {
    id: ID!
    username: String!
  }

  type Group {
    id: ID!
    groupName: String!
    user: User!
  }
`;

let users = {
  1: {
    id: "1",
    username: "AAA",
  },
  2: {
    id: "2",
    username: "BBB",
  },
  3: {
    id: "3",
    username: "CCC",
  },
  4: {
    id: "4",
    username: "DDD",
  },
};

let groups = {
  1: {
    id: "1",
    groupName: "Group 1",
    userId: "2",
  },
  2: {
    id: "2",
    groupName: "Group 1",
    userId: "3",
  },
  3: {
    id: "3",
    groupName: "Group 1",
    userId: "4",
  },
};

const resolvers = {
  Query: {
    listUser: () => {
      return Object.values(users);
    },

    listGroup: () => {
      return Object.values(groups);
    },

    getUser: (parent, { id }) => {
      return users[id];
    },

    getDefaultUser: (parent, args, { defaultUser }, info) => {
      return defaultUser;
    },
  },

  User: {
    username: (user) => {
      return user.username;
    },
  },

  Group: {
    user: (parent, args, { defaultUser }) => {
      return users[parent.userId];
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    defaultUser: users[1],
  },
});

server.applyMiddleware({ app, path: "/graphql" });

app.use(cors());

app.listen({ port: 8000 }, () => {
  console.log("server is started");
});
