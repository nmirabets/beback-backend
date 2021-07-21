const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const reactionsRouter = express.Router();

const Reaction = require('../models/Reaction');

// Get all reactions for a restaurant
reactionsRouter.get('/',checkIfLoggedIn, async (req, res, next) => {
	try {
		const { restaurantId } = req.body;
		const menu = await Reaction.find({ restaurantId })
		res.json({ found: menu })
	} catch(error) {
		next(error)
	}
});

// Create a reaction
reactionsRouter.post('/', checkIfLoggedIn, async (req, res, next) => {
	try {
		const { restaurantId, dimension, subdimension, type } = req.body;
		const reaction = await Reaction.create({ restaurantId, dimension, subdimension, type })
		res.json({ created: reaction });
	} catch(error) {
		next(error)
 	}
});

module.exports = reactionsRouter;
