import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    film: { type: mongoose.Schema.Types.ObjectId, ref: 'Film', required: true }, // Reference to Film model
    rating: { type: Number, required: true, min: 0, max: 5 }, // Rating between 0 and 5
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

const Rating = mongoose.model('Rating', RatingSchema);

export default Rating;
