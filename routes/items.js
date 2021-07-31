const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const itemsRouter = express.Router();

const Item = require('../models/Item');

// get items by restaurantId
itemsRouter.post('/', async (req, res, next) => {
	try {
		const { restaurantId } = req.body;
		const items = await Item.find({ restaurantId })
		res.json({ found: items })
	} catch(error) {
		next(error)
	}
});

// Create an item
itemsRouter.post('/new', checkIfLoggedIn, async (req, res, next) => {
	try {
		const { item } = req.body;
		const newItem = await Item.create(item)
		res.json({ created: newItem });
	} catch(error) {
		next(error)
 	}
});

// Update an item
itemsRouter.put('/', checkIfLoggedIn, async (req, res, next ) => {
	try {
		const { item } = req.body;
		const updatedItem = await Item.findByIdAndUpdate(item._id,
			{ 
				menuId: item.menuId, 
				sectionId: item.sectionId,
				name: item.name,
				description: item.description,
				imgUrl: item.imgUrl,
				price: item.price,
				position: item.position,
				isVisible: item.isVisible,
			},
			 { new: true })
		res.json({ updated: updatedItem });
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