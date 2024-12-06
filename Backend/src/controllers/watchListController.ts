import WatchList from "../models/watchList";
import { Request, Response } from "express";
import User from "../models/userModel";
import Film from "../models/filmModel";

// Add an item to the WatchList
export const addWatchList = async (req: Request, res: Response) => {
  try {
    const { user, film, link, title, description } = req.body;

    // Validate required fields
    if (!user || !film || !link || !title || !description) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    // Check if the user and film exist in the database
    const userExists = await User.findById(user);
    const filmExists = await Film.findById(film);
    if (!userExists || !filmExists) {
      res.status(404).json({ message: "User or Film not found." });
      return;
    }

    // Check if the film is already in the user's watchlist
    const existingFilm = await WatchList.findOne({ user, film });
    if (existingFilm) {
      res.status(409).json({ message: "This film is already in the watchlist." });
      return;
    }

    // Add the new watchlist entry
    const newWatchList = new WatchList({ user, film, link, title, description });
    await newWatchList.save();

    res.status(201).json({ message: "Watchlist item added successfully.", watchlist: newWatchList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while adding to the watchlist." });
  }
};

// Get all watchlist items for a user
export const getWatchList = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Validate required parameter
    if (!userId) {
      res.status(400).json({ message: "User ID is required." });
      return;
    }

    // Find all watchlist items for the user
    const watchlist = await WatchList.find({ user: userId }).populate("film");

    if (!watchlist.length) {
      res.status(404).json({ message: "No watchlist items found for the user." });
      return;
    }

    res.status(200).json({ message: "Watchlist fetched successfully.", watchlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the watchlist." });
  }
};

// Delete an item from the WatchList
export const deleteWatchList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate required parameter
    if (!id) {
      res.status(400).json({ message: "Watchlist ID is required." });
      return;
    }

    // Delete the watchlist item
    const deletedWatchList = await WatchList.findByIdAndDelete(id);

    if (!deletedWatchList) {
      res.status(404).json({ message: "Watchlist item not found." });
      return;
    }

    res.status(200).json({ message: "Watchlist item deleted successfully.", watchlist: deletedWatchList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting the watchlist item." });
  }
};
