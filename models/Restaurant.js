const mongoose = require('mongoose');

const { Schema } = mongoose;

const restaurantSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User' },
		name: { type: String, required: true },
		logoUrl: { type: String },
	}
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
