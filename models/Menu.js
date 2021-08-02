const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuSchema = new Schema(
	{
		name: { type: String, required: true },
		restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
		isVisible: { type: Boolean, default: true},
	}
);

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
