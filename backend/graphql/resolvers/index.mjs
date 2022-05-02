import websiteResolvers from "./Website.mjs";
import userResolvers from "./Users.mjs";
import test from './Test.mjs';
export default {
    Query: {
        ...websiteResolvers.Query,
        ...test.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...websiteResolvers.Mutation
    }
};