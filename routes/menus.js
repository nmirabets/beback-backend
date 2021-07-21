const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const menusRouter = express.Router();

const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');

// Get active menu by restaurantId
menusRouter.get('/active', async (req, res, next) => {
	try {
		const { restaurantId } = req.body;
		const restaurant = await Restaurant.findOne({ _id: restaurantId })
		console.log(restaurant);
		const menu = await Menu.findOne({ _id: restaurant.activeMenuId })
		res.json({ found: menu })
	} catch (error) {
		next(error);
	}
});

// Get all menus for a restaurant
menusRouter.get('/',checkIfLoggedIn, async (req, res, next) => {
	try {
		const { restaurantId } = req.body;
		const menu = await Menu.find({ restaurantId })
		res.json({ found: menu })
	} catch(error) {
		next(error)
	}
});

// Create a menu
menusRouter.post('/', checkIfLoggedIn, async (req, res, next) => {
	try {
		const { restaurantId, name } = req.body;
		const menu = await Menu.create({ restaurantId, name })
		res.json({ created: menu });
	} catch(error) {
		next(error)
 	}
});

// Edit a menu
menusRouter.put('/', checkIfLoggedIn, async (req, res, next ) => {
	try {
		const { id, name } = req.body;
		const menu = await Menu.findByIdAndUpdate(id, { name })
		res.json({ updated: menu });
	} catch(error) {
		next(error)
	}
});

// Delete an existing menu
menusRouter.delete('/', checkIfLoggedIn, async (req, res, next) => {
	try {
		const { id } = req.body;
		const menu = await Menu.findByIdAndDelete( id ).
		res.json({ deleted: menu });
	} catch(error) {
		next(error)
	}
});

module.exports = menusRouter;
