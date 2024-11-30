import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    FilmTitle: { type: String, required: true }, // Store Film Title instead of filmId
    review: { type: String, required: true },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] }, // Array of user IDs who liked the review
}, { timestamps: true });

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
