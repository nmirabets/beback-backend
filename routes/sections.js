const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const sectionsRouter = express.Router();

const Section = require('../models/Section');

// Get all sections by restaurantId
sectionsRouter.post('/', async (req, res, next) => {
	try {
		const {restaurantId } = req.body;
		const section = await Section.find({ restaurantId })
		res.json({ found: section })
	} catch(error) {
		next(error)
	}
});

// Create a section
sectionsRouter.post('/new', checkIfLoggedIn, async (req, res, next) => {
	try {
		const { section } = req.body;
		const newSection = await Section.create(section )
		res.json({ created: newSection });
	} catch(error) {
		next(error)
 	}
});

// update section
sectionsRouter.put('/', checkIfLoggedIn, async (req, res, next ) => {
	try {
		const { section } = req.body;
		const updatedSection = await Section.findByIdAndUpdate( section._id, { name: section.name, position: section.position }, { new: true })
		res.json({ updated: updatedSection });
	} catch(error) {
		next(error)
	}
});

// Delete an existing section
sectionsRouter.delete('/', checkIfLoggedIn, async (req, res, next) => {
	try {
		const { id } = req.body;
		const section = await Section.findByIdAndDelete(id)
		res.json({ deleted: section });
	} catch(error) {
		next(error)
	}
});

module.exports = sectionsRouter;