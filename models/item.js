const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 300 },
  category: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
  unit_price: { type: Schema.Types.Decimal128, required: true, min: 0.01 },
  stock: { type: Number, required: true, min: 0 },
});

ItemSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
