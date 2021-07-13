const express = require('express');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

const { checkUsernameAndPasswordNotEmpty } = require('../middlewares');

const User = require('../models/User');

const bcryptSalt = 10;

const router = express.Router();

router.get('/whoami', (req, res, next) => {
	if (req.session.currentUser) {
		res.status(200).json(req.session.currentUser);
	} else {
		next(createError(401));
	}
});

router.post('/signup', checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
	const { username, password } = res.locals.auth;
	try {
		const user = await User.findOne({ username });
		if (user) {
			return next(createError(422));
		}

		const salt = bcrypt.genSaltSync(bcryptSalt);
		const hashedPassword = bcrypt.hashSync(password, salt);

		const newUser = await User.create({ username, hashedPassword });
		req.session.currentUser = newUser;
		return res.json(newUser);
	} catch (error) {
		return next(error);
	}
});

router.post('/login', checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
	const { username, password } = res.locals.auth;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return next(createError(404));
		}
		if (bcrypt.compareSync(password, user.hashedPassword)) {
			req.session.currentUser = user;
			return res.json(user);
		}
		return next(createError(404));
	} catch (error) {
		return next(error);
	}
});

router.post('/logout', (req, res, next) => {
	req.session.destroy(err => {
		if (err) {
			next(err);
		}

		return res.status(204).send();
	});
});

module.exports = router;
