import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ExchangeSchema = new Schema({
    src: {
        type: String,
        required: true
    },
    tgt: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    date: {
        type: String,
    }
});

export default mongoose.model('ExchangeRate', ExchangeSchema);