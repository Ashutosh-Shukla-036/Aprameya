import { useRecoilValue } from "recoil";
import { FilmAtom } from "../Atoms/FilmAtom";
import FirstMovie from '../assets/FirstMovie.jpg';
import SecondMovie from '../assets/SecondMovie.jpg';
import ThirdMovie from '../assets/ThirdMovie.jpg';
import FourthMovie from '../assets/FourthMovie.jpg';
import { Rating } from '@mui/material'; // Import Rating from MUI
import { useState, useEffect } from "react";
import { UserAtom } from "../Atoms/UserAtom";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface Film {
    _id: string; // Assuming the film has an _id for backend interaction
    title: string;
    description: string;
    genre: string;
    director: string;
    releaseDate: string;
    link: string;
    cast: string[];
    averageRating?: number; // Optional, if fetched from the backend or already in FilmAtom
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
    const films = useRecoilValue(FilmAtom); // Already contains average rating
    const user = useRecoilValue(UserAtom); // To check if the user is logged in
    const navigate = useNavigate(); // Hook to navigate
    const [selectedGenre, setSelectedGenre] = useState<string>("All");
    const [watchlist, setWatchlist] = useState<Film[]>(() => {
        const savedWatchlist = localStorage.getItem('watchlist');
        return savedWatchlist ? JSON.parse(savedWatchlist) : [];
    });

    useEffect(() => {
        // Persist watchlist to localStorage whenever it changes
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

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

    const handleAddToWatchlist = (film: Film) => {
        if (!user) {
            navigate('/signup'); // Redirect to login page if not logged in
            return;
        }

        if (!watchlist.some(f => f.title === film.title)) {
            setWatchlist(prev => [...prev, film]);
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
                        {/* Thumbnail with Hover Effect */}
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

                        {/* Cast */}
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-teal-300 mb-2">Cast:</h3>
                            <ul className="list-disc list-inside text-gray-300">
                                {film.cast.map((actor, i) => (
                                    <li key={i}>{actor}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Crew */}
                        {film.crew && (
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-teal-300 mb-2">Crew:</h3>
                                <ul className="list-none text-gray-300">
                                    {Object.entries(film.crew).map(([role, person], i) =>
                                        person ? (
                                            <li key={i}>
                                                <span className="font-semibold text-yellow-300">{role}: </span>
                                                {Array.isArray(person) ? (
                                                    <ul className="ml-4 list-disc">
                                                        {person.map((individual, index) => (
                                                            <li key={index}>{individual}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    person
                                                )}
                                            </li>
                                        ) : null
                                    )}
                                </ul>
                            </div>
                        )}

                        {/* Average Rating */}
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-teal-300 mb-2">Average Rating:</h3>
                            <div className="flex items-center">
                                {/* Show the average rating */}
                                <p className="mr-2 text-lg text-yellow-300">
                                    {film.averageRating ? film.averageRating.toFixed(1) : 'N/A'}
                                </p>
                                <Rating
                                    name="film-rating"
                                    value={film.averageRating || 0} // Display average rating
                                    precision={0.5}
                                    readOnly // Make average rating read-only
                                    sx={{
                                        '& .MuiRating-iconEmpty': { color: 'white' },
                                        '& .MuiRating-iconFilled': { color: '#facc15' },
                                        '& .MuiRating-iconHover': { color: '#fde047' },
                                    }}
                                />
                            </div>
                            {/* Show the number of ratings */}
                            {film.ratingCount !== undefined && (
                                <p className="text-sm text-gray-400 mt-1">
                                    Rated by <span className="text-yellow-300">{film.ratingCount}</span> people
                                </p>
                            )}
                        </div>

                        {/* Watch Now and Add to Watchlist Buttons */}
                        <div className="flex justify-between items-center">
                            {/* Watch Now Button */}
                            <a href={film.link} className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-yellow-500">
                                Watch Now
                            </a>

                            {/* Add to Watchlist Button */}
                            <button 
                                className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-teal-400"
                                onClick={() => handleAddToWatchlist(film)}
                            >
                                {watchlist.some(f => f.title === film.title) ? 'Added to Watchlist' : 'Add to Watchlist'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
