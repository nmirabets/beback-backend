const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const itemsRouter = express.Router();

const Item = require('../models/Item');

// Get all items for a given menu
itemsRouter.post('/', checkIfLoggedIn, async (req, res, next) => {
	try {
		const { menuId } = req.body;
		const items = await Item.find({ menuId })
		res.json({ found: items })
	} catch(error) {
		next(error)
	}
});

// Create an item
itemsRouter.post('/new', checkIfLoggedIn, async (req, res, next) => {
	try {
		const { menuId, sectionId, name, description, imgUrl, price, allergens } = req.body;
		const item = await Item.create({ menuId, sectionId, name, description, imgUrl, price, allergens })
		res.json({ created: item });
	} catch(error) {
		next(error)
 	}
});

// Update an item
itemsRouter.put('/', checkIfLoggedIn, async (req, res, next ) => {
	try {
		const { id, menuId, sectionId, name, description, imgUrl, price, allergens, position } = req.body;
		const section = await Item.findByIdAndUpdate(id, 
			{ menuId, sectionId, name, description, imgUrl, price, allergens, position },
			 { new: true })
		res.json({ updated: section });
	} catch(error) {
		next(error)
	}
});

// Delete an existing section
itemsRouter.delete('/', checkIfLoggedIn, async (req, res, next) => {
	try {
		const { id } = req.body;
		const section = await Item.findByIdAndDelete( id )
		res.json({ deleted: section });
	} catch(error) {
		next(error)
	}
});

module.exports = itemsRouter;