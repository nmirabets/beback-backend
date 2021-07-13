const mongoose = require('mongoose');

const { Schema } = mongoose;

const FeedbackSchema = new Schema(
	{
		restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
		dimension: { type: String },
		subdimension: { type: String },
		type: { type: Boolean },
		// session Id - backlog
	},
	{
		timestamps: {
			createdAt: 'created_at',
		},
	}
);

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
