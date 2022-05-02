import ase from 'apollo-server';
const { AuthenticationError } = ase;
import { Website } from "../../models/Website.mjs";
import checkAuth from "../../utils/auth.mjs";
import { encrypt, decrypt } from '../../utils/encryption.mjs';
export default {
    Query: {
        async getWebsites(_, { }, context) {
            try {
                const user = checkAuth(context);
                return await Website.find({ user: user.id }).sort({ createdAt: -1 });
            } catch (error) {
                throw new Error(error);
            }
        },
        async getWebsite(_, { id }, context) {
            try {
                const user = checkAuth(context);
                const website = await Website.findOne({ user: user.id, _id: id });
                if (website) {
                    return website;
                }
                else
                    throw new Error('record not found');
            } catch (error) {
                throw new Error(error);
            }
        },
        async getPassword(_, { id, password, tag }, context) {
            try {
                const user = checkAuth(context);
                const website = await Website.findOne({ user: user.id, _id: id });
                if (website) {
                    password = decrypt({
                        password: password,
                        iv: website.iv,
                        tag: tag
                    })
                    return password;
                } else throw new Error('invalid credentials');
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        async createWebsite(_, { website, username, password, tags }, context) {
            const user = checkAuth(context);
            const hashed = encrypt(password);
            console.log(hashed);
            const _website = new Website({
                website,
                username,
                password: hashed.password,
                iv: hashed.iv,
                tag: hashed.tag,
                tags,
                user: user.id,
                createdAt: new Date().toISOString()
            });

            return await _website.save();
        },
        async deleteWebsite(_, { id }, context) {
            try {
                const user = checkAuth(context);
                const website = await Website.findOne({ user: user.id, _id: id });
                if (website) {
                    website.delete();
                    return `${website.id}`;
                } else {
                    throw new AuthenticationError('illegal action blocked');
                }
            } catch (error) {
                throw new Error(error);
            };
        }
    }
};