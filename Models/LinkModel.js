
const mongoose = require('mongoose');
// Tracking-care for the clicks while doing redirect(300)
const ClickSchema = new mongoose.Schema({
    insertedAt: {
        type: Date,
        default: Date.now,
    },
    ipAddress: {
        type: String,
        required: true,
    },
});

const LinkSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    clicks: [ClickSchema],
});

module.exports = mongoose.model('link', LinkSchema);
