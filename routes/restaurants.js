const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const restaurantRouter = express.Router();
const createError = require('http-errors');

const Restaurant = require('../models/Restaurant');

// Get restaurants by userId
restaurantRouter.get('/',checkIfLoggedIn, async (req, res, next) => {
	try {
		const userId = req.session.currentUser._id;
		const restaurant = await Restaurant.find({ userId })
		res.json({ found: restaurant })
	} catch(error) {
		next(error);
	}
});

// Get all restaurants
restaurantRouter.get('/all', async (req, res, next) => {
	try {
		const restaurant = await Restaurant.find()
		res.json({ found: restaurant })
	} catch(error) {
		next(error);
	}
});

// Get all restaurants
restaurantRouter.post('/load-one', async (req, res, next) => {
	try {
		const { id } = req.body;
		const restaurant = await Restaurant.findById(id);
		res.json({ found: restaurant })
	} catch(error) {
		next(error);
	}
});

// Create a restaurant
restaurantRouter.post('/', checkIfLoggedIn, async (req, res, next) => {
	try {
		const userId = req.session.currentUser._id;
		const { name } = req.body;
		const restaurant = await Restaurant.create({ userId, name })
		res.json({ created: restaurant });
	} catch (error) {
		next(error);
	}
});

// Update restaurant
restaurantRouter.put('/', checkIfLoggedIn, async (req, res, next) => {
	try {
		const { id, name } = req.body;
		const restaurant = await Restaurant.findByIdAndUpdate(id, { name });
		res.json({ updated: restaurant });
	} catch (error) {
		next(error);
	}
});

// router.post('/movies/create', fileUploader.single('image'), (req, res) => {
//   const { title, description } = req.body;
 
//   Movie.create({ title, description, imageUrl: req.file.path })
//     .then(() => res.redirect('/movies'))
//     .catch(error => console.log(`Error while creating a new movie: ${error}`));
// });

// Activate a menu from restaurant
restaurantRouter.put('/set-menu', checkIfLoggedIn, async (req, res, next) => {
	try {
		const { restaurantId, menuId } = req.body;
		const menu = await Menu.findById({ _id: menuId })
		if (menu === null) {
			next(createError(404));
		}
		const restaurant = await Restaurant.findByIdAndUpdate( restaurantId, { activeMenuId: menuId }, { new:true })
		res.json({ updated: restaurant });
	} catch(error){
		next(error);
	}
});

// Delete an existing restaurant
restaurantRouter.delete('/', checkIfLoggedIn, async (req, res, next) => {
	try {
		const { id } = req.body;
		const restaurant = await Restaurant.findByIdAndDelete( id );
		res.json({ deleted: restaurant });
	} catch (error) {
		next(error);
	}
});

module.exports = restaurantRouter;
