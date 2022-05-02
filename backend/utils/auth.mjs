import ase from 'apollo-server-errors';
const { AuthenticationError } = ase;
import jwt from 'jsonwebtoken';
const { verify } = jwt;

export default (context) => {
    const authHeader = context.req.headers.authorization
    if (authHeader) {
        const token = String(authHeader).split('Bearer ')[1];
        if (token) {
            try {
                const user = verify(token, process.env.SECRET_KEY);
                return user;
            } catch (err) {
                throw new AuthenticationError('invalid token');
            }
        }
        throw new AuthenticationError('use auth token format : \'Bearer [token]\'');
    }
    throw new AuthenticationError('missing authentication headers');
}