const { mongoose } = require('./mongoose.js');

const Phone = mongoose.model('Phone', {
    name: {
        type: String,
        required: true,
        minlength: 1,
    },
    os: {
        type: String,
        required: true,
        minlength: 1,
    },
    brand: {
        type: String,
        required: true,
        minlength: 1,
    },
});

module.exports = { Phone };