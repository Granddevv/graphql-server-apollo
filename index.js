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
    listGroup: Group
  }

  type User {
    id: ID!
    username: String!
  }

  type Group {
    id: ID!
    groupName: String!
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

const resolvers = {
  Query: {
    listUser: () => {
      return Object.values(users);
    },

    listGroup: () => {
      return {
        groupName: "Test Group",
      };
    },

    getUser: (parent, { id }) => {
      return users[id];
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: "/graphql" });

app.use(cors());

app.listen({ port: 8000 }, () => {
  console.log("server is started");
});
