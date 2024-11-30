import { Request, Response } from "express";
import Review from "../models/review";

// Add or Update a Review for a Film
export const addOrUpdateReview = async (req: Request, res: Response) => {
    const { userId, username, FilmTitle, review } = req.body;

    // Validate input
    if (!userId || !username || !FilmTitle) {
        res.status(400).json({ message: "User ID, Username, and Film Title are required." });
        return;
    }
    if (!review || typeof review !== "string") {
        res.status(400).json({ message: "Review must be a valid string." });
        return;
    }

    try {
        // Check if the user has already reviewed this film
        const existingReview = await Review.findOne({ user: userId, FilmTitle });

        if (existingReview) {
            // Update the existing review
            existingReview.review = review;
            await existingReview.save();
            res.status(200).json({ message: "Review updated successfully." });
            return;
        } else {
            // Create a new review
            const newReview = new Review({ user: userId, username, FilmTitle, review });
            await newReview.save();
            res.status(201).json({ message: "Review added successfully." });
            return;
        }
    } catch (error) {
        console.error("Error adding/updating review:", error);
        res.status(500).json({ message: "Internal server error." });
        return;
    }
};

// Fetch All Reviews for Home Page (All films)
export const getAllReviews = async (req: Request, res: Response) => {
    try {
        // Fetch all reviews
        const reviews = await Review.find();

        if (reviews.length === 0) {
            res.status(404).json({ message: "No reviews found." });
            return;
        }

        res.status(200).json(reviews);
        return;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Internal server error." });
        return;
    }
};

// Fetch Reviews for a specific film
export const getReviewsForFilm = async (req: Request, res: Response) => {
    const { filmTitle } = req.params;
    try {
        const reviews = await Review.find({ FilmTitle: filmTitle });

        if (reviews.length === 0) {
            res.status(404).json({ message: `No reviews found for ${filmTitle}.` });
            return;
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews for film:", error);
        res.status(500).json({ message: "Internal server error." });
        return;
    }
};

// Fetch Reviews for a specific user (for Rating and Review Page)
export const getReviewsForUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const reviews = await Review.find({ user: userId });

        if (reviews.length === 0) {
            res.status(404).json({ message: "No reviews found for this user." });
            return;
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews for user:", error);
        res.status(500).json({ message: "Internal server error." });
        return;
    }
};

// Delete a Review by ID (for Rating and Review Page)
export const deleteReview = async (req: Request, res: Response) => {
    const { reviewId } = req.params;
    try {
        // Find the review by ID
        const review = await Review.findById(reviewId);

        if (!review) {
            res.status(404).json({ message: "Review not found." });
            return;
        }

        // Delete the review using deleteOne
        await Review.deleteOne({ _id: reviewId });

        res.status(200).json({ message: "Review deleted successfully." });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Internal server error." });
        return;
    }
};


// Like or Unlike a Review
export const likeReview = async (req: Request, res: Response) => {
    const { reviewId, userId } = req.body;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            res.status(404).json({ message: "Review not found" });
            return;
        }

        const hasLiked = review.likes.includes(userId);

        if (hasLiked) {
            review.likes = review.likes.filter(id => id.toString() !== userId);
        } else {
            review.likes.push(userId);
        }

        await review.save();
        res.status(200).json({ message: hasLiked ? "Review unliked" : "Review liked" });
        return;
    } catch (error) {
        console.error("Error liking review:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
