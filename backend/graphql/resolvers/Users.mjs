import ase from 'apollo-server-errors';
const { UserInputError } = ase;
import bcrypt from 'bcrypt';
const { hash, compare } = bcrypt;
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import { User } from "../../models/User.mjs";
import { RegInputValidator, LoginValidator } from '../../utils/validators.mjs';

const generateToken = (user) => sign({
    id: user.id,
    email: user.email,
    username: user.username
}, process.env.SECRET_KEY, { expiresIn: '6h' });

export default {
    Mutation: {
        async login(_, { identifier, password }) {
            const { errors, valid } = LoginValidator({ email: identifier, password });
            if (!valid)
                throw new UserInputError('invalid credentials', { errors });
            const user = await User.findOne({ email: identifier });
            const match = await compare(password, user.password);

            if (!user || !match) {
                errors.general = 'username/password incorrect';
                throw new UserInputError('username/password incorrect', { errors });
            }

            const token = generateToken(user);
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(
            _,
            { _register: { username, email, password, confirmPassword }, },
            context,
            info
        ) {
            // Validate Users Inputs
            const { errors, valid } = RegInputValidator({ username, email, password, confirmPassword });
            if (!valid) {
                throw new UserInputError('Something went wrong', { errors });
            }

            // Check if username/email is already registered
            const user = await User.findOne({ email });
            if (user) {
                throw new UserInputError('This email/username is already registered', {
                    errors: {
                        email: 'This username is already registered',
                    }
                });
            }

            // hash password
            password = await hash(password, 8);
            const _user = new User({
                email, username, password,
                createdAt: new Date().toISOString()
            });

            const res = await _user.save();

            // create auth token
            const token = generateToken(res);

            // return saved data
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
};