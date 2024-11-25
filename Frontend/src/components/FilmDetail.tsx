import { useRecoilValue } from "recoil";
import { FilmAtom } from "../Atoms/FilmAtom";
import FirstMovie from '../assets/FirstMovie.jpg';
import SecondMovie from '../assets/SecondMovie.jpg';
import ThirdMovie from '../assets/ThirdMovie.jpg';
import FourthMovie from '../assets/FourthMovie.jpg';
import ReactStars from "react-stars";
import { useState, useEffect } from "react";
import { UserAtom } from "../Atoms/UserAtom";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate

interface Film {
    title: string;
    description: string;
    genre: string;
    director: string;
    releaseDate: string;
    link: string;
    cast: string[];
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

const FilmDetail: React.FC = () => {
    const { title } = useParams<{ title: string }>(); // Destructure title from useParams
    const films = useRecoilValue(FilmAtom);
    const user = useRecoilValue(UserAtom); // To check if the user is logged in
    const navigate = useNavigate(); // Hook to navigate
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

    const handleAddToWatchlist = (film: Film) => {
        if (!user) {
            navigate('/signup'); // Redirect to login page if not logged in
            return;
        }

        if (!watchlist.some(f => f.title === film.title)) {
            setWatchlist(prev => [...prev, film]);
        }
    };

    const handleRatingChange = (newRating: number, title: string) => {
        console.log(`Rated ${title} with ${newRating} stars`);
        // Here you can save the rating to the backend or local state
    };

    // Find the film with the matching title
    const selectedFilm = films.find(film => film.title === title);

    if (!selectedFilm) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
                <h2 className="text-3xl font-bold">Film not found</h2>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 text-white py-12 px-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mx-auto max-w-4xl mt-20 md:mt-0">
                {/* Thumbnail */}
                <img
                    src={getThumbnailPath(selectedFilm.title)}
                    alt={selectedFilm.title}
                    className="w-full h-64 object-cover rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105 hover:brightness-90"
                />
                
                {/* Film Title */}
                <h2 className="text-4xl font-bold text-yellow-300 mb-2">{selectedFilm.title}</h2>
                
                {/* Details */}
                <p className="text-gray-400 text-sm mb-2">Release Date: {selectedFilm.releaseDate}</p>
                <p className="text-gray-400 text-sm mb-2">Genre: <span className="text-yellow-300">{selectedFilm.genre}</span></p>
                <p className="text-gray-400 text-sm mb-4">Directed by: <span className="text-white">{selectedFilm.director}</span></p>
                
                {/* Description */}
                <p className="text-gray-300 text-base mb-4">{selectedFilm.description}</p>

                {/* Cast */}
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-teal-300 mb-2">Cast:</h3>
                    <ul className="list-disc list-inside text-gray-300">
                        {selectedFilm.cast.map((actor, i) => (
                            <li key={i}>{actor}</li>
                        ))}
                    </ul>
                </div>

                {/* Crew */}
                {selectedFilm.crew && (
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-teal-300 mb-2">Crew:</h3>
                        <ul className="list-none text-gray-300">
                            {Object.entries(selectedFilm.crew).map(([role, person], i) =>
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

                {/* Rating */}
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-teal-300 mb-2">Rating:</h3>
                    <ReactStars
                        count={5}
                        value={0} // default value (can be fetched or stored)
                        onChange={user ? (newRating) => handleRatingChange(newRating, selectedFilm.title) : () => navigate('/signup')} // Navigate to '/signup' if not logged in
                        size={24}
                        color2={"#ffd700"}
                    />
                </div>

                {/* Add to Watchlist */}
                <button
                    className="mt-4 inline-block px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-400 transition duration-300"
                    onClick={() => handleAddToWatchlist(selectedFilm)} // Only allows adding if logged in
                >
                    Add to Watchlist
                </button>

                {/* Watch Link */}
                <a
                    href={selectedFilm.link}
                    className="inline-block ml-12 mt-4 px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-teal-400 hover:text-white transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Watch Now
                </a>
            </div>
        </div>
    );
};

export default FilmDetail;
