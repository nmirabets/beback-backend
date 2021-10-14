const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const createError = require('http-errors');

require('dotenv').config();

const authRouter = require('./routes/auth');
const restaurantsRouter = require('./routes/restaurants');
const menusRouter = require('./routes/menus');
const sectionsRouter = require('./routes/sections');
const itemsRouter = require('./routes/items');
const reactionsRouter = require('./routes/reactions');

async function setupApp() {
	const app = express();

	app.use(
		cors({
			credentials: true,
			origin: [process.env.FRONTEND_DOMAIN],
		})
	);
	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(express.static(path.join(__dirname, 'public')));
	app.set('trust proxy', 1);
	app.use(
		session({
			store: MongoStore.create({
				mongoUrl: process.env.MONGODB_URI,
				ttl: 24 * 60 * 60,
			}),
			secret: process.env.SECRET_SESSION, // should be inside .env
			resave: true,
			saveUninitialized: true,
			// cookie: {
			// 	maxAge: 24 * 60 * 60 * 1000,
			// 	httpOnly: false,
			// 	sameSite: process.env.COOKIES_SAMESITE === 'true' ? 'lax' : 'none',
			// 	secure: process.env.COOKIES_SECURE
			// 	// secure: process.env.COOKIES_SAMESITE !== 'true',
			// },
		})
	);

	app.use('/', authRouter);
	app.use('/restaurants', restaurantsRouter);
	app.use('/menus', menusRouter);
	app.use('/sections', sectionsRouter);
	app.use('/items', itemsRouter);
	app.use('/reactions', reactionsRouter);

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		next(createError(404));
	});

	// eslint-disable-next-line no-unused-vars
	app.use((error, req, res, next) => {
		// eslint-disable-next-line no-console
		const rawStatus = error.status ?? error.statusCode;
		const status = typeof rawStatus === 'number' && rawStatus >= 400 && rawStatus < 600 ? rawStatus : undefined;
		const rawName = error.name;
		const name = typeof rawName === 'string' && status !== undefined ? rawName : undefined;
		const rawMessage = error.message;
		const message = typeof rawMessage === 'string' ? rawMessage : '';
		const responseError = {
			status: status ?? 500,
			name: name ?? 'InternalServerError',
			message,
		};
		res.locals.responseError = responseError;
		res.status(responseError.status).json({ error: responseError });
	});

	return app;
}

module.exports = setupApp;
