const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const sectionsRouter = express.Router();

const Section = require('../models/Section');

// Get all sections for a given menu
sectionsRouter.post('/', checkIfLoggedIn, async (req, res, next) => {
	try {
		const { menuId } = req.body;
		const section = await Section.find({ menuId })
		res.json({ found: section })
	} catch(error) {
		next(error)
	}
});

// Create a section
sectionsRouter.post('/new', checkIfLoggedIn, async (req, res, next) => {
	try {
		const { menuId, name } = req.body;
		const section = await Section.create({ menuId, name })
		res.json({ created: section });
	} catch(error) {
		next(error)
 	}
});



// Edit a section
sectionsRouter.put('/', checkIfLoggedIn, async (req, res, next ) => {
	try {
		const { id, name, position } = req.body;
		const section = await Section.findByIdAndUpdate(id, { name, position }, { new: true })
		res.json({ updated: section });
	} catch(error) {
		next(error)
	}
});

// Delete an existing section
sectionsRouter.delete('/', checkIfLoggedIn, async (req, res, next) => {
	try {
		const { id } = req.body;
		const section = await Section.findByIdAndDelete( id )
		res.json({ deleted: section });
	} catch(error) {
		next(error)
	}
});

module.exports = sectionsRouter;