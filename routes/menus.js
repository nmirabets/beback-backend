const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const menusRouter = express.Router();

const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');
const Section = require('../models/Section');
const Item = require('../models/Item');

// Get a menu by menuId
menusRouter.post('/',checkIfLoggedIn, async (req, res, next) => {
	try {
		const { menuId } = req.body;
		const menu = await Menu.find({ _id: menuId })
		res.json({ found: menu })
	} catch(error) {
		next(error)
	}
});

// Get menus by restaurantId
menusRouter.post('/all',checkIfLoggedIn, async (req, res, next) => {
	try {
		const { restaurantId } = req.body;
		const menus = await Menu.find({ restaurantId });
		res.json({ found: menus })
	} catch(error) {
		next(error)
	}
});

// Get all menu data by restaurantId
menusRouter.post('/menu-data',checkIfLoggedIn, async (req, res, next) => {
	try {
		const { restaurantId } = req.body;
		const menus = await Menu.find({ restaurantId });
		let allSections = [];
		let allitems = [];
		
		await menus.forEach( async (menu) => {
			const sections = await Section.find({ menuId: menu._id });
			const items = await Item.find({ menuId: menu._id });
			allSections.push(sections);
			allitems.push(items);
			console.log("forEach", allSections.length);
		})
		console.log("out", allSections.length);
		res.json({ found: allSections })
	} catch(error) {
		next(error)
	}
});

// Create a menu
menusRouter.post('/new', checkIfLoggedIn, async (req, res, next) => {
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
		const menu = await Menu.findByIdAndDelete( id );
		res.json({ deleted: menu });
	} catch(error) {
		next(error)
	}
});

module.exports = menusRouter;
