const mongoose = require('mongoose');

const { Schema } = mongoose;

const sectionSchema = new Schema(
	{
		name: { type: String, required: true },
		menuId: { type: Schema.Types.ObjectId, ref: 'Menu' },
		position: { type: Number, default: 1 }
	}
);

const section = mongoose.model('Section', sectionSchema);

module.exports = section;
