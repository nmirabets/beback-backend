const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuItemSchema = new Schema(
	{
		menuId: { type: Schema.Types.ObjectId, ref: 'Menu' },
		sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
		name: { type: String, required: true, unique: true },
		description: { type: String },
		imgUrl: { type: String },
		price: { type: Number },
		isPromoted: { type: Boolean },
		allergens: [{ type: String, enum: ["gluten", "lactose", "peanuts"] }],
	}
);

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
