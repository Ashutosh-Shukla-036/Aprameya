import express, { Request, Response } from "express";
import Film from "../models/filmModel"; 

export const addFilms = async (req: Request, res: Response): Promise<void> => {
    const movieDetail = req.body;

    if (!movieDetail) {
        res.status(400).json({ message: "Invalid input" }); 
        return ;
    }

    try {
        const newFilm = new Film(movieDetail);
        await newFilm.save();
        res.status(201).json({ message: "Movie added successfully" });
    } catch (error) {
        console.error('Error saving film:', error);
        res.status(500).json({ message: "Error saving film" });
    }
};

export const getFilms = async (req: Request, res: Response): Promise<void> => {
    try {
        const films = await Film.find();

        if (films.length === 0) {
            res.status(404).json({ message: "No movies found" });
            return ;
        }
        res.status(200).json(films);
    } catch (error) {
        console.error('Error fetching films:', error);
        res.status(500).json({ message: "Error fetching films" });
    }
};
