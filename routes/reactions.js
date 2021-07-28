const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const reactionsRouter = express.Router();

const Reaction = require('../models/Reaction');

// Get all reactions for a restaurant
reactionsRouter.get('/',checkIfLoggedIn, async (req, res, next) => {
	try {
		const { restaurantId } = req.body;
		const reaction = await Reaction.find({ restaurantId })
		res.json({ found: reaction })
	} catch(error) {
		next(error)
	}
});

// Get dashboard data
reactionsRouter.post('/dashboard',checkIfLoggedIn, async (req, res, next) => {
	try {
			var today = new Date();
		console.log(today);
		const { restaurantId } = req.body;
		const reactions = await Reaction.find({ restaurantId })

		console.log(data);

		dayData = data.filter( (reaction) => {
			return (reaction.created_at >= 1)
		})

		const data = {
			day: {
				service: {
					positive: 10,
					negative: 5,
				},
				food: {
					positive: 10,
					negative: 5,
				}, 
				atmosphere: {
					positive: 10,
					negative: 5,
				},
			},
			week: {},
			month: {},
			year:{}
		}



	 //	reaction.dimension === "servicio" && reaction.isPositive===true

		res.json({ found: data })
	} catch(error) {
		next(error)
	}
});

// Create a reaction
reactionsRouter.post('/', async (req, res, next) => {
	try {
		const { data } = req.body;
		const reaction = await Reaction.create( data )
		res.json({ created: reaction });
	} catch(error) {
		next(error)
 	}
});

module.exports = reactionsRouter;
