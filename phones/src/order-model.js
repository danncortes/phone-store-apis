const { mongoose } = require('./mongoose.js');

const Order = mongoose.model('Order', {
    userId: {
        type: ObjectId,
        required: true,
        minlength: 1,
    },
    userName: {
        type: String,
        required: true,
        minlength: 1,
    },
    userSurname: {
        type: String,
        required: true,
        minlength: 1,
    },
    userEmail: {
        type: String,
        required: true,
        minlength: 1,
    },
    cart: {
        type: Array,
        required: true,
        minlength: 1,
    },
    total: {
      type: Number,
      required: true,
      minlength: 1,
    }
});

module.exports = { Phone };