const express = require('express');
const { checkIfLoggedIn } = require('../middlewares');
const reactionsRouter = express.Router();
var isAfter = require('date-fns/isAfter')
const parseISO = require('date-fns/parseISO');

const Reaction = require('../models/Reaction');

// Create a reaction
reactionsRouter.post('/', async (req, res, next) => {
	try {
		const { reaction } = req.body;
		const newReaction = await Reaction.create(reaction);
		res.json({ created: newReaction });
	} catch(error) {
		next(error)
 	}
});

// Get dashboard data
reactionsRouter.post('/data',checkIfLoggedIn, async (req, res, next) => {
	try {
		const { restaurantId } = req.body;
		const reactions = await Reaction.find({ restaurantId });
    const periods = [
			{ name: 'd', dayCount: 1 },
			{ name: 'w', dayCount: 7 },
			{ name: 'm', dayCount: 30 },
			{ name: 'y', dayCount: 365 }
		];
		const dimensions = ['servicio', 'comida', 'atmósfera'];
		const reactionType = [true, false];

		var dataSummary = [];
		var rank = [];

		periods.forEach(period => {
			dimensions.forEach( (dimension, index) => {
				reactionType.forEach(isPositive => {
					const count = CalculateDataSummaryItem(reactions, period, dimension, isPositive);

					const dataItem = {
						period: period.name,
						dimension,
						isPositive,
						count,
					};
					dataSummary.push(dataItem);
					if (index===0) {
						const rankItem = {
							period: period.name,
							isPositive,
							items: CalculateRankedItems(reactions, period, isPositive),
						}
						rank.push(rankItem);
					}
				})
			})
		})

		const result = { dataSummary, rank }

		res.json({ found: result })
	} catch(error) {
		next(error)
	}
});

CalculateDataSummaryItem = (reactions, period, dimension, isPositive) => {
  const dateLimit = new Date();
  dateLimit.setDate( dateLimit.getDate() - period.dayCount );

  return reactions.filter( (reaction) => 
    ((isAfter(reaction.created_at, dateLimit)) &&
    (reaction.dimension === dimension) &&
    (reaction.isPositive === isPositive))).length
};

CalculateRankedItems = (reactions, period, isPositive) => {
  const dateLimit = new Date();
  dateLimit.setDate( dateLimit.getDate() - period.dayCount );

	const filteredReactions = reactions.filter(reaction => 
		(isAfter(reaction.created_at, dateLimit) &&
		(reaction.isPositive === isPositive)))

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


// CalculateRankedItems = (reactions, period, isPositive) => {
//   const dateLimit = new Date();
//   dateLimit.setDate( dateLimit.getDate() - period.dayCount );

// 	const filteredReactions = reactions.filter(reaction => 
// 		(isAfter(reaction.created_at, dateLimit) &&
// 		(reaction.isPositive === isPositive)))

// 	var holder = {};

// 	filteredReactions.forEach( reaction => {
// 		if (holder.hasOwnProperty(reaction.subdimension)) {
// 			holder[reaction.subdimension] = holder[reaction.subdimension] + 1;
// 		} else {
// 			holder[reaction.subdimension] = 1;
// 		}
// 	});

// 	var obj2 = [];

// 	for (var prop in holder) {
// 		obj2.push({ name: prop, value: holder[prop] });
// 	}

// 	return obj2
// };