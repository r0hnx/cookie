import pkg from 'faker';
const { internet } = pkg;
import { hash } from "bcrypt";
import { encrypt, decrypt } from '../../utils/encryption.mjs';
export default {
    Query: {
        hashPassword(_, { }, context) {
            try {
                return hash(internet.password(), 10);
            } catch (error) {
                throw new Error(error);
            }
        },
        encPass(_, { }, context) {
            try {
                return encrypt(internet.password()).password;
            } catch (error) {
                throw new Error(error);
            }
        }
    },
};