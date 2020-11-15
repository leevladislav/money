const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    expense: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    wallet: {
        ref: 'wallets',
        type: Schema.Types.ObjectId
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('expenses', expenseSchema);