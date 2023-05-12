
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: { type: String, default: null, required: true },
    description: { type: String, default: null, required: false },
    slug: { type: String, default: null, required: false },
    image: { type: mongoose.SchemaTypes.Mixed, default: null, required: false },
    gallery: { type: mongoose.SchemaTypes.Array, default: null, required: false },
    price: { type: mongoose.SchemaTypes.Decimal128, default: null, required: false },
    sale_price: { type: mongoose.SchemaTypes.Decimal128, default: null, required: false },
    variations: { type: mongoose.SchemaTypes.Mixed, default: null, required: false }
})

module.exports = mongoose.model('products', productSchema);