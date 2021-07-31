const mongoose = require('mongoose');

const { Schema } = mongoose;

const sectionSchema = new Schema(
	{
		restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
		menuId: { type: Schema.Types.ObjectId, ref: 'Menu' },
		name: { type: String, required: true },
		position: { type: Number, default: 1 },
	}
);

const section = mongoose.model('Section', sectionSchema);

module.exports = section;
