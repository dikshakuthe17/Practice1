const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    taste:{
        type: String,
        required: true,
        enum: ['spicy', 'sweet', 'sour', 'bitter'],
    }
    });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;