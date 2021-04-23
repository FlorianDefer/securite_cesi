const jwt = require('express-jwt');
const { secret } = require('config.json');
const db = require('_helpers/db');
const sanitize = require('mongo-sanitize');

module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret, algorithms: ['HS256'] }),

        // authorize based on user role
        async (req, res, next) => {
            // The sanitize function will strip out any keys that start with '$' in the input,
            // so you can pass it to MongoDB without worrying about malicious users overwriting
            // query selectors.
            const cleanUserId = sanitize(req.user.id);
            

            const account = await db.Account.findById(cleanUserId);

            const cleanAccountId = sanitize(account.id);

            const refreshTokens = await db.RefreshToken.find({ account: cleanAccountId });

            if (!account || (roles.length && !roles.includes(account.role))) {
                // account no longer exists or role not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            req.user.role = account.role;
            req.user.firstName = account.firstName;
            req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);
            next();
        }
    ];
}