const mongoose = require('mongoose');

const { Schema } = mongoose;

const restaurantSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User' },
		name: { type: String, required: true },
		logoUrl: { type: String },
		activeMenuId: { type: Schema.Types.ObjectId }
	}
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
