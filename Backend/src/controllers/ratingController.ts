import { Request, Response } from "express";
import Rating from "../models/rating";
import Film from "../models/filmModel";

// Add or Update a Rating and Update Film Average Rating
export const addOrUpdateRating = async (req: Request, res: Response) => {
    const { userId, filmId, rating } = req.body;

    if (!userId || !filmId) {
        res.status(400).json({ message: "User ID and Film ID are required." });
        return;
    }
    if (typeof rating !== "number" || rating < 0 || rating > 5) {
        res.status(400).json({ message: "Rating must be a number between 0 and 5." });
        return;
    }

    try {
        const existingRating = await Rating.findOne({ user: userId, film: filmId });

        if (existingRating) {
            existingRating.rating = rating;
            await existingRating.save();
        } else {
            const newRating = new Rating({ user: userId, film: filmId, rating });
            await newRating.save();
        }

        await updateFilmAverageRating(filmId);

        res.status(200).json({ message: "Rating added/updated successfully." });
        return;
    } catch (error) {
        console.error("Error adding/updating rating:", error);
        res.status(500).json({ message: "Internal server error." });
        return;
    }
};

// Helper Function: Update Film's Average Rating
const updateFilmAverageRating = async (filmId: string) => {
    try {
        const ratings = await Rating.find({ film: filmId });

        if (ratings.length === 0) {
            await Film.findByIdAndUpdate(filmId, { averageRating: 0 });
            return;
        }

        // Calculate the average rating
        const averageRating =
            ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

        // Update the film's averageRating field
        await Film.findByIdAndUpdate(filmId, { averageRating });
    } catch (error) {
        console.error("Error updating film average rating:", error);
        throw new Error("Error updating film average rating.");
    }
};


// Get Rating for a Specific Film by a Specific User
export const getRating = async (req: Request, res: Response) => {
    const { userId, filmId } = req.params;

    if (!userId || !filmId) {
        res.status(400).json({ message: "User ID and Film ID are required." });
        return;
    }

    try {
        const rating = await Rating.findOne({ user: userId, film: filmId });

        if (!rating) {
            res.status(404).json({ message: "Rating not found for this user and film." });
            return
        }

        res.status(200).json({ rating: rating.rating });
        return;
    } catch (error) {
        console.error("Error retrieving rating:", error);
        res.status(500).json({ message: "Internal server error." });
        return;
    }
};
