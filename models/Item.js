const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema(
	{
		restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
		menuId: { type: Schema.Types.ObjectId, ref: 'Menu' },
		sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
		name: { type: String, required: true },
		description: { type: String },
		imgUrl: { type: String },
		price: { type: Number },
		isPromoted: { type: Boolean, default: false},
		allergens: [{ type: String, enum: ["gluten", "lactose", "peanuts"] }],
		position: { type: Number, default: 1 },
		isVisible: { type: Boolean, default: true},
	}
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
