const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuSectionSchema = new Schema(
	{
		name: { type: String, required: true },
		menuId: { type: Schema.Types.ObjectId, ref: 'Menu' },
	}
);

const MenuSection = mongoose.model('MenuSection', menuSectionSchema);

module.exports = MenuSection;
