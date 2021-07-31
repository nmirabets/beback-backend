const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const reactionsRouter = express.Router();

const Reaction = require('../models/Reaction');

// Create a reaction
reactionsRouter.post('/', async (req, res, next) => {
	try {
		const { reaction } = req.body;
		const newReaction = await Reaction.create( reaction );
		res.json({ created: newReaction });
	} catch(error) {
		next(error)
 	}
});

// Get dashboard data
reactionsRouter.post('/data',checkIfLoggedIn, async (req, res, next) => {
	try {
		const { restaurantId } = req.body;
		const reactions = await Reaction.find({ restaurantId })
		// const periods = [
		// 	{ name: 'd', dayCount: 1 },
		// 	{ name: 'w', dayCount: 7 },
		// 	{ name: 'm', dayCount: 30 },
		// 	{ name: 'y', dayCount: 365 }
		// ];
		// const dimensions = ['servicio', 'comida', 'atmósfera'];
		// const isPositive = [true, false];

		// var dataSummary = [];

		// periods.forEach(period => {
		// 	dimensions.forEach(dimension => {
		// 		isPositive.forEach(isPositive => {
		// 			const count = CalculateDataSummaryItem(reactions, period, dimension, isPositive);
		// 			dataItem = {
		// 				period,
		// 				dimension,
		// 				isPositive,
		// 				count,
		// 			};
		// 			dataSummary.push(count);
		// 		})
		// 	})
		// })

		res.json({ found: reactions })
	} catch(error) {
		next(error)
	}
});

function CalculateDataSummaryItem(reactions, period, dimension, isPositive) {
	const today = new Date();
	const dateLimit = today.setDate( today.getDate() - period.dayCount );
	return reactions.filter(reaction => 
		(reaction.created_at >= dateLimit) &&
		(reaction.dimension === dimension) &&
		(reaction.isPositive === isPositive)).
		reduce((acc, value) => acc + value)
};

function CalculateRankedItems(reactions, period, isPositive) {
	const dateLimit = Date() - period.dayCount;
	const filteredReactions = reactions.filter(reaction => 
		(reaction.created_at >= dateLimit) &&
		(reaction.isPositive === isPositive))

	var holder = {};

	filteredReactions.forEach( reaction => {
		if (holder.hasOwnProperty(reaction.subdimension)) {
			holder[reaction.subdimension] = holder[reaction.subdimension] + 1;
		} else {
			holder[reaction.subdimension] = 1;
		}
	});

	var obj2 = [];

	for (var prop in holder) {
		obj2.push({ name: prop, value: holder[prop] });
	}

	return obj2

};

module.exports = reactionsRouter;
