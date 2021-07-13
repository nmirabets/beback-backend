const createError = require('http-errors');

const checkIfLoggedIn = (req, res, next) => {
	if (req.session.currentUser) {
		next();
	} else {
		next(createError(401));
	}
};

const checkUsernameAndPasswordNotEmpty = (req, res, next) => {
	const { username, password } = req.body;

	if (username !== '' && password !== '') {
		res.locals.auth = req.body;
		next();
	} else {
		next(createError(422));
	}
};

module.exports = {
	checkIfLoggedIn,
	checkUsernameAndPasswordNotEmpty,
};
