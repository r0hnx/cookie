import apollo from 'apollo-server';
const { ApolloServer } = apollo;
import mongoose from 'mongoose';
const { connect } = mongoose;
import dotenv from "dotenv";
import resolvers from './graphql/resolvers/index.mjs';
import typeDefs from './graphql/typeDefs.mjs';
dotenv.config();

try {
    const server = new ApolloServer({
        cors: {
            origin: 'http://localhost:3000',
            credentials: true
        },
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req }),
    });
    const db = await connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    db.connection.on('error', () => { throw new Error("⛔ Database Error") })
    console.log(`✅ Database Connected`);
    const { url } = await server.listen({ port: process.env.PORT });
    console.log(`✅ Server Running`);
    console.log(`✅ ${url}`);
} catch (error) {
    throw error;
}


