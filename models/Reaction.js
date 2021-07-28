const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReactionSchema = new Schema(
	{
		restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
		dimension: { type: String, required: true  },
		subdimension: { type: String, required: true  },
		isPositive: { type: Boolean, required: true  },
		// session Id - backlog
	},
	{
		timestamps: {
			createdAt: 'created_at',
		},
	}
);

const Reaction = mongoose.model('Reaction', ReactionSchema);

module.exports = Reaction;
