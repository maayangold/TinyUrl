import mongoose from 'mongoose';
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
    targetParamValue: { 
        type: String,
        required: false,
    }
});

const LinkSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        unique: true,
    },
    originalUrl: {
        type: String,
        required: true,
    },
    clicks: [ClickSchema],
    targetParamName: { // הוספת שדה עבור שם הפרמטר ב-Query String
        type: String,
        required: false,
    },
    targetValues: [ // הוספת שדה עבור ערכי המקור
        {
            name: {
                type: String,
                required: true,
            },
            value: {
                type: String,
                required: true,
            }
        }
    ]
});
export default  mongoose.model('Link', LinkSchema);
