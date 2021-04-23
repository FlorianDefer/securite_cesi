const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const Role = require('_helpers/role');
const sanitize = require('mongo-sanitize');

module.exports = {
    authenticate,
    refreshToken,
    revokeToken,
    register,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password, ipAddress }) {
    // The sanitize function will strip out any keys that start with '$' in the input,
    // so you can pass it to MongoDB without worrying about malicious users overwriting
    // query selectors.
    const cleanEmail = sanitize(email);
    const account = await db.Account.findOne({ email });
    //const account = await db.Account.findOne({ cleanEmail });
    
    if (!account || !bcrypt.compareSync(password, account.passwordHash)) {
        throw 'Email or password is incorrect';
    }

    // authentication successful so generate jwt and refresh tokens
    const jwtToken = generateJwtToken(account);
    const refreshToken = generateRefreshToken(account, ipAddress);

    // save refresh token
    await refreshToken.save();

    // return basic details and tokens
    return {
        ...basicDetails(account),
        jwtToken,
        refreshToken: refreshToken.token
    };
}

async function refreshToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);
    const { account } = refreshToken;

    // replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(account, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    await newRefreshToken.save();

    // generate new jwt
    const jwtToken = generateJwtToken(account);

    // return basic details and tokens
    return {
        ...basicDetails(account),
        jwtToken,
        refreshToken: newRefreshToken.token
    };
}

async function revokeToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);

    // revoke token and save
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    await refreshToken.save();
}

async function register(params, origin = 'origin') {
    // The sanitize function will strip out any keys that start with '$' in the input,
    // so you can pass it to MongoDB without worrying about malicious users overwriting
    // query selectors.
    const cleanEmail = sanitize(params.email);
    // validate
    if (await db.Account.findOne({ email: cleanEmail })) {
        throw 'Email "' + params.email + '" is already registered';
        // send already registered error in email to prevent account enumeration //

        // return await sendAlreadyRegisteredEmail(params.email, origin);
    }

    // Validate For **Strong Password**
    let intendedPassword = params.password;
    let intendedPasswordLength = intendedPassword.length;

    if (intendedPasswordLength <= 10) {
      throw 'The Input Password is less than or equal to 10 characters long. ' + 
      'Please choose a password of more than 10 characters.';
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{11,}$/g;
    // Test to see if intendedPassword follows the regex pattern
    if (intendedPassword.match(regex) != null) {
    } else {
        throw 'The Input Password does not have: a minimum of eleven characters, at least one uppercase letter, '
        + 'at least one lowercase letter, at least one number and at least one special character. ' + 
        'Please choose a password that fulfills the above criteria for maximum password protection.';;
    }
    // create account object
    const account = new db.Account(params);
    // first registered account is a superadmin //

    // account.role = Role.SuperAdmin;

    // const isFirstAccount = (await db.Account.countDocuments({})) === 0;
    // if (isFirstAccount) {account.role = Role.SuperAdmin;}
    // account.verificationToken = randomTokenString();

    // salt and hash password
    account.passwordHash = saltAndHash(params.password);
    // save account
    await account.save();
    // send email //

    // await sendVerificationEmail(account, origin);
}

async function verifyEmail({ token }) {
    // The sanitize function will strip out any keys that start with '$' in the input,
    // so you can pass it to MongoDB without worrying about malicious users overwriting
    // query selectors.
    const cleanToken = sanitize(token);

    const account = await db.Account.findOne({ verificationToken: cleanToken });

    if (!account) throw 'Verification failed';

    account.verified = Date.now();
    account.verificationToken = undefined;
    await account.save();
}

async function forgotPassword({ email }, origin) {

    // The sanitize function will strip out any keys that start with '$' in the input,
    // so you can pass it to MongoDB without worrying about malicious users overwriting
    // query selectors.
    const cleanEmail = sanitize({ email });

    const account = await db.Account.findOne(cleanEmail);

    // always return ok response to prevent email enumeration
    if (!account) return;

    // create reset token that expires after 24 hours
    account.resetToken = {
        token: randomTokenString(),
        expires: new Date(Date.now() + 24*60*60*1000)
    };
    await account.save();

    // send email
    await sendPasswordResetEmail(account, origin);
}

async function validateResetToken({ token }) {
    // The sanitize function will strip out any keys that start with '$' in the input,
    // so you can pass it to MongoDB without worrying about malicious users overwriting
    // query selectors.
    const cleanToken = sanitize(token);

    const account = await db.Account.findOne({
        'resetToken.token': cleanToken,
        'resetToken.expires': { $gt: Date.now() }
    });

    if (!account) throw 'Invalid token';
}

async function resetPassword({ token, password }) {
    // The sanitize function will strip out any keys that start with '$' in the input,
    // so you can pass it to MongoDB without worrying about malicious users overwriting
    // query selectors.
    const cleanToken = sanitize(token);

    const account = await db.Account.findOne({
        'resetToken.token': cleanToken,
        'resetToken.expires': { $gt: Date.now() }
    });

    if (!account) throw 'Invalid token';

    // update password and remove reset token
    account.passwordHash = saltAndHash(password);
    account.passwordReset = Date.now();
    account.resetToken = undefined;
    await account.save();
}

async function getAll() {
    const accounts = await db.Account.find();
    return accounts.map(x => basicDetails(x));
}

async function getById(id) {
    const account = await getAccount(id);
    return basicDetails(account);
}

async function create(params) {
    // The sanitize function will strip out any keys that start with '$' in the input,
    // so you can pass it to MongoDB without worrying about malicious users overwriting
    // query selectors.
    const cleanEmail = sanitize(params.email);

    // validate
    if (await db.Account.findOne({ email: cleanEmail })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const account = new db.Account(params);
    account.verified = Date.now();

    // salt and hash password
    account.passwordHash = saltAndHash(params.password);

    // save account
    await account.save();

    return basicDetails(account);
}

async function update(id, params) {
    const account = await getAccount(id);

    // The sanitize function will strip out any keys that start with '$' in the input,
    // so you can pass it to MongoDB without worrying about malicious users overwriting
    // query selectors.
    const cleanEmail = sanitize(params.email);

    // validate (if email was changed)
    if (params.email && account.email !== params.email && await db.Account.findOne({ email: cleanEmail })) {
        throw 'Email "' + params.email + '" is already taken';
    }

    // salt and hash password if it was entered
    if (params.password) {
        params.passwordHash = saltAndHash(params.password);
    }

    // copy params to account and save
    Object.assign(account, params);
    account.updated = Date.now();
    await account.save();

    return basicDetails(account);
}

async function _delete(id) {
    const account = await getAccount(id);
    await account.remove();
}

// helper functions

async function getAccount(id) {
    // The sanitize function will strip out any keys that start with '$' in the input,
    // so you can pass it to MongoDB without worrying about malicious users overwriting
    // query selectors.
    const cleanId = sanitize(id);


    if (!db.isValidId(cleanId)) throw 'Account not found';
    const account = await db.Account.findById(cleanId);
    if (!account) throw 'Account not found';
    return account;
}

async function getRefreshToken(token) {
    // The sanitize function will strip out any keys that start with '$' in the input,
    // so you can pass it to MongoDB without worrying about malicious users overwriting
    // query selectors.
    const cleanToken = sanitize(token);

    const refreshToken = await db.RefreshToken.findOne({ cleanToken }).populate('account');
    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
    return refreshToken;
}

/**
 * Function which salts and hashes a string input
 * @see https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/
 * @param {string} password 
 * @returns        A salted hash (with the length of the salt being equal to 30) of the input string
 */
function saltAndHash(password) {
    return bcrypt.hashSync(password, 12);
}

function generateJwtToken(account) {
    // create a jwt token containing the account id that expires in 15 minutes
    return jwt.sign({ sub: account.id, id: account.id }, config.secret, { expiresIn: '20h' });
}

function generateRefreshToken(account, ipAddress) {
    // create a refresh token that expires in 7 days
    return new db.RefreshToken({
        account: account.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7*24*60*60*1000),
        createdByIp: ipAddress
    });
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

function basicDetails(account) {
    const { id, title, firstName, lastName, email, role, created, updated, isVerified } = account;
    return { id, title, firstName, lastName, email, role, created, updated, isVerified };
}

async function sendVerificationEmail(account, origin) {
    let message;
    if (origin) {
        const verifyUrl = `${origin}/account/verify-email?token=${account.verificationToken}`;
        message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>
                   <p><code>${account.verificationToken}</code></p>`;
    }

    await sendEmail({
        to: account.email,
        subject: 'Sign-up Verification API - Verify Email',
        html: `<h4>Verify Email</h4>
               <p>Thanks for registering!</p>
               ${message}`
    });
}

async function sendAlreadyRegisteredEmail(email, origin) {
    let message;
    if (origin) {
        message = `<p>If you don't know your password please visit the <a href="${origin}/account/forgot-password">forgot password</a> page.</p>`;
    } else {
        message = `<p>If you don't know your password you can reset it via the <code>/account/forgot-password</code> api route.</p>`;
    }

    await sendEmail({
        to: email,
        subject: 'Sign-up Verification API - Email Already Registered',
        html: `<h4>Email Already Registered</h4>
               <p>Your email <strong>${email}</strong> is already registered.</p>
               ${message}`
    });
}

async function sendPasswordResetEmail(account, origin) {
    let message;
    if (origin) {
        const resetUrl = `${origin}/reset-password.html?token=${account.resetToken.token}`;
        message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/account/reset-password</code> api route:</p>
                   <p><code>${account.resetToken.token}</code></p>`;
    }

    await sendEmail({
        to: account.email,
        subject: 'Sign-up Verification API - Reset Password',
        html: `<h4>Reset Password Email</h4>
               ${message}`
    });
}