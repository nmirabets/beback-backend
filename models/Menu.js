const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuSchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
	}
);

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
