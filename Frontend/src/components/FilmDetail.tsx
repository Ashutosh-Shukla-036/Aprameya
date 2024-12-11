import { useRecoilValue, useRecoilState } from "recoil";
import { FilmAtom } from "../Atoms/FilmAtom";
import FirstMovie from "../assets/FirstMovie.jpg";
import SecondMovie from "../assets/SecondMovie.jpg";
import ThirdMovie from "../assets/ThirdMovie.jpg";
import FourthMovie from "../assets/FourthMovie.jpg";
import { useState, useEffect } from "react";
import { UserAtom } from "../Atoms/UserAtom";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import axios from "axios"; // Import axios
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";

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

const FilmDetail: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const user = useRecoilValue(UserAtom);
  const [films, setFilms] = useRecoilState(FilmAtom);
  const navigate = useNavigate();
  const [rating, setRating] = useState<number | null>(null);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const thumbnailMap: { [title: string]: string } = {
    "Safe Space": FirstMovie,
    "Love As We Know It": SecondMovie,
    "Love As We Know It – Part 2": ThirdMovie,
    "A Day Of My Life In The City": FourthMovie,
  };

  const getThumbnailPath = (title: string): string => {
    return thumbnailMap[title] || `/src/assets/APLogo.jpg`;
  };

  const selectedFilm = films.find((film) => film.title === title);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddToWatchlist = async (film: Film) => {
    if (!user) {
      navigate("/signup"); // Redirect to signup/login if not logged in
      return;
    }

    try {
      await axios.post("https://aprameya.onrender.com/api/watchlist/addwatchlist", {
        user: user?.userId,
        film: film._id,
        link: film.link,
        title: film.title,
        description: film.description,
      });

      // Success alert
      setSnackbarMessage("Film added to your watchlist successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error: any) {
      console.error("Error adding to watchlist:", error);

      // Error handling
      const errorMessage =
        error.response?.status === 409
          ? "This film is already in your watchlist."
          : "An error occurred. Please try again.";

      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleRatingChange = async (newRating: number | null, title: string) => {
    if (!user) {
      navigate("/signup");
      return;
    }

    setRating(newRating);

    try {
      await axios.post("https://aprameya.onrender.com/api/rating/addrating", {
        filmId: selectedFilm?._id,
        rating: newRating,
        userId: user?.userId,
      });

      console.log(`Rated ${title} with ${newRating} stars`);

      // Show snackbar for successful rating
      setSnackbarMessage(`You rated "${title}" ${newRating} stars!`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error rating the film:", error);

      // Show snackbar for error
      setSnackbarMessage("Failed to submit your rating. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    if (user) {
      const fetchRating = async () => {
        try {
          const response = await axios.get(
            `https://aprameya.onrender.com/api/rating/getrating/${user.userId}/${selectedFilm?._id}`
          );
          setRating(response.data.rating); // Set user's rating
        } catch (error) {
          console.error("Error fetching user's rating:", error);
        }
      };
      fetchRating();
    }
    const fetchFilms = async () => {
      try {
        const result = await fetch("https://aprameya.onrender.com/api/films/getfilms");
        const films = await result.json();
        setFilms(films);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };
    fetchFilms();
  }, [user, selectedFilm?._id, setFilms]);

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
        <img
          src={getThumbnailPath(selectedFilm?.title)}
          alt={selectedFilm?.title}
          className="w-full h-64 object-cover rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105 hover:brightness-90"
        />
        <h2 className="text-4xl font-bold text-yellow-300 mb-2">{selectedFilm?.title}</h2>
        <p className="text-gray-400 text-sm mb-2">Release Date: {selectedFilm?.releaseDate}</p>
        <p className="text-gray-400 text-sm mb-2">Genre: <span className="text-yellow-300">{selectedFilm?.genre}</span></p>
        <p className="text-gray-400 text-sm mb-4">Directed by: <span className="text-white">{selectedFilm?.director}</span></p>
        <p className="text-gray-300 text-base mb-4">{selectedFilm?.description}</p>

        <div className="mb-4">
          <h3 className="text-lg font-bold text-teal-300 mb-2">Cast:</h3>
          <ul className="list-disc list-inside text-gray-300">
            {selectedFilm?.cast.map((actor, i) => (
              <li key={i}>{actor}</li>
            ))}
          </ul>
        </div>

        {selectedFilm.crew && (
          <div className="mb-4">
            <h3 className="text-lg font-bold text-teal-300 mb-2">Crew:</h3>
              <ul className="list-none text-gray-300">
                {Object.entries(selectedFilm?.crew).map(([role, person], i) =>
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

        <div className="mb-4">
          <h3 className="text-lg font-bold text-teal-300 mb-2">Average Rating:</h3>
          <div className="flex items-center">
            <p className="mr-2 text-lg text-yellow-300">{selectedFilm?.averageRating?.toFixed(1) || "N/A"}</p>
            <Rating
              name="film-rating"
              value={selectedFilm?.averageRating || 0}
              precision={0.5}
              readOnly
              sx={{
                "& .MuiRating-iconEmpty": { color: "white" },
                "& .MuiRating-iconFilled": { color: "#facc15" },
                "& .MuiRating-iconHover": { color: "#fde047" },
              }}
            />
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm text-gray-400 mt-2">Rate this movie:</h4>
          <Rating
            name="film-rating-user"
            value={rating}
            precision={0.5}
            onChange={(_e, newValue) => handleRatingChange(newValue, selectedFilm.title)}
            sx={{
              "& .MuiRating-iconEmpty": { color: "white" },
              "& .MuiRating-iconFilled": { color: "#facc15" },
              "& .MuiRating-iconHover": { color: "#fde047" },
            }}
          />
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => handleAddToWatchlist(selectedFilm)}
            className="w-full md:w-auto bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-teal-500 transition duration-300"
          >
            Add to Watchlist
          </button>
          <a
            href={selectedFilm.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300"
          >
            Watch Now
          </a>
        </div>
      </div>

            {/* Snackbar for alerts */}
            <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{
            backgroundColor: snackbarSeverity === "success" ? "#4caf50" : "#f44336",
          }}
        />
      </Snackbar>
    </div>
  );
};

export default FilmDetail;

