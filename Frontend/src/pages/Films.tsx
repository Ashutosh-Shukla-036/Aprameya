import { useRecoilValue } from "recoil";
import { FilmAtom } from "../Atoms/FilmAtom";
import FirstMovie from "../assets/FirstMovie.jpg";
import SecondMovie from "../assets/SecondMovie.jpg";
import ThirdMovie from "../assets/ThirdMovie.jpg";
import FourthMovie from "../assets/FourthMovie.jpg";
import { Rating, Snackbar, Alert } from "@mui/material"; // MUI components
import { useState } from "react";
import { UserAtom } from "../Atoms/UserAtom";
import { useNavigate } from "react-router-dom"; // React Router
import axios from "axios";

interface Film {
    _id: string;
    title: string;
    description: string;
    genre: string;
    director: string;
    releaseDate: string;
    link: string;
    cast: string[];
    averageRating?: number;
    ratingCount?: number;
    crew?: {
        dop?: string;
        editing?: string;
        dialogues?: string;
        story?: string;
        assistantDirectors?: string[];
        coDirector?: string;
        executiveProducer?: string;
        coProducer?: string;
        producer?: string;
        music?: string;
    };
}

export const Film: React.FC = () => {
    const films = useRecoilValue(FilmAtom); // List of films
    const user = useRecoilValue(UserAtom); // Logged-in user info
    const navigate = useNavigate(); // Navigation hook
    const [selectedGenre, setSelectedGenre] = useState<string>("All");

    // States for Snackbar and Alert
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error" | undefined>(undefined);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const thumbnailMap: { [title: string]: string } = {
        "Safe Space": FirstMovie,
        "Love As We Know It": SecondMovie,
        "Love As We Know It – Part 2": ThirdMovie,
        "A Day Of My Life In The City": FourthMovie,
    };

    const getThumbnailPath = (title: string): string => {
        return thumbnailMap[title] || `/src/assets/APLogo.jpg`;
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenre(e.target.value);
    };

    const filteredFilms = selectedGenre === "All" 
        ? films 
        : films.filter(film => film.genre === selectedGenre);

    const handleAddToWatchlist = async (film: Film) => {
        if (!user) {
            navigate("/signup"); // Redirect to signup/login if not logged in
            return;
        }

        try {
            await axios.post("http://localhost:5002/api/watchlist/addwatchlist", {
                user: user?.userId,
                film: film?._id,
                link: film?.link,
                title: film?.title,
                description: film?.description,
            });

            // Success alert
            setAlertMessage("Film added to your watchlist successfully!");
            setAlertSeverity("success");
            setSnackbarOpen(true);
        } catch (error: any) {
            console.error("Error adding to watchlist:", error);

            // Error handling
            const errorMessage =
                error.response?.status === 409
                    ? "This film is already in your watchlist."
                    : "An error occurred. Please try again.";

            setAlertMessage(errorMessage);
            setAlertSeverity("error");
            setSnackbarOpen(true);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen py-12 px-6">
            <h1 className="text-4xl font-bold mb-8 text-center">Our Films</h1>
            
            {/* Genre Filter */}
            <select 
                value={selectedGenre} 
                onChange={handleGenreChange}
                className="bg-gray-800 text-white p-2 rounded mb-6"
            >
                <option value="All">All Genres</option>
                <option value="Rom-Com">Rom-Com</option>
                <option value="Survival">Survival</option>
                <option value="Motivational">Motivational</option>
            </select>

            {/* Film Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredFilms.map((film: Film, index: number) => (
                    <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        {/* Thumbnail */}
                        <img
                            src={getThumbnailPath(film.title)}
                            alt={film.title}
                            className="w-full h-64 object-cover rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105 hover:brightness-90"
                        />
                        
                        {/* Film Title */}
                        <h2 className="text-2xl font-semibold text-yellow-300 mb-2">{film.title}</h2>
                        
                        {/* Basic Details */}
                        <p className="text-gray-400 text-sm mb-2">Release Date: {film.releaseDate}</p>
                        <p className="text-gray-400 text-sm mb-2">Genre: <span className="text-yellow-300">{film.genre}</span></p>
                        <p className="text-gray-400 text-sm mb-4">Directed by: <span className="text-white">{film.director}</span></p>
                        
                        {/* Description */}
                        <p className="text-gray-300 text-base mb-4">{film.description}</p>

                        {/* Average Rating */}
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-teal-300 mb-2">Average Rating:</h3>
                            <div className="flex items-center">
                                <p className="mr-2 text-lg text-yellow-300">
                                    {film.averageRating ? film.averageRating.toFixed(1) : "N/A"}
                                </p>
                                <Rating
                                    name="film-rating"
                                    value={film.averageRating || 0}
                                    precision={0.5}
                                    readOnly
                                    sx={{
                                        "& .MuiRating-iconEmpty": { color: "white" },
                                        "& .MuiRating-iconFilled": { color: "#facc15" },
                                        "& .MuiRating-iconHover": { color: "#fde047" },
                                    }}
                                />
                            </div>
                            {film.ratingCount !== undefined && (
                                <p className="text-sm text-gray-400 mt-1">
                                    Rated by <span className="text-yellow-300">{film.ratingCount}</span> people
                                </p>
                            )}
                        </div>

                        {/* Watch Now and Add to Watchlist Buttons */}
                        <div className="flex justify-between items-center">
                            <a href={film.link} className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-yellow-500">
                                Watch Now
                            </a>
                            <button
                                className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-teal-400"
                                onClick={() => handleAddToWatchlist(film)}
                            >
                                Add to Watchlist
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Snackbar for Alerts */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert 
                    onClose={() => setSnackbarOpen(false)} 
                    severity={alertSeverity} 
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};
