import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ReviewAtom } from "../Atoms/ReviewAtom";
import { UserAtom } from "../Atoms/UserAtom";
import axios from "axios";
import {
    Alert,
    AlertTitle,
    Button,
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    CircularProgress,
    Snackbar,
    SnackbarContent,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const DetailedReview: React.FC = () => {
    const [reviews, setReviews] = useRecoilState(ReviewAtom);
    const user = useRecoilValue(UserAtom);
    const [FilmTitle, setFilmTitle] = useState("");
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "warning" | "error" | "info">("info");
    const [selectedFilm, setSelectedFilm] = useState<string>("");

    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const isLoggedIn = Boolean(user);

    // Updated film titles
    const filmOptions = [
        "Safe Space",
        "Love As We Know It",
        "Love As We Know It - Part 2",
        "A Day Of My Life In The City",
        "The Stock Saga",
        "Who Am I",
    ];

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const result = await axios.get("https://aprameya.onrender.com/api/review/getreviews");
                setReviews(result.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [setReviews]);

    // Filter reviews based on the selected film title
    const filteredReviews = selectedFilm
        ? reviews.filter((review) => review.FilmTitle === selectedFilm)
        : reviews;

    // Handle adding a new review
    const handleAddReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user?.userId || !user?.username) {
            setAlertMessage("You must be logged in to add a review.");
            setAlertSeverity("warning");
            setSnackbarOpen(true);
            return;
        }

        if (!FilmTitle || !review) {
            setAlertMessage("Please provide both a film title and a review.");
            setAlertSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        setLoading(true);
        setAlertMessage(null);

        try {
            const response = await axios.post(
                "https://aprameya.onrender.com/api/review/addreview",
                {
                    userId: user?.userId,
                    username: user?.username,
                    FilmTitle,
                    review,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201 || response.status === 200) {
                setFilmTitle("");
                setReview("");
                const result = await axios.get("https://aprameya.onrender.com/api/review/getreviews");
                setReviews(result.data);
                setAlertMessage("Review added successfully!");
                setAlertSeverity("success");
            } else {
                setAlertMessage("Failed to add review. Please try again.");
                setAlertSeverity("error");
            }
        } catch (error) {
            console.error("Error adding review:", error);
            setAlertMessage("An error occurred while adding your review.");
            setAlertSeverity("error");
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
        }
    };

    // Handle like and unlike functionality
    const handleLikeReview = async (reviewId: string) => {
        if (!user?.userId) {
            setAlertMessage("You must be logged in to like a review.");
            setAlertSeverity("warning");
            setSnackbarOpen(true);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                "https://aprameya.onrender.com/api/review/like",
                {
                    reviewId,
                    userId: user?.userId,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                const updatedReviews = reviews.map((rev) =>
                    rev?._id === reviewId
                        ? {
                              ...rev,
                              likes: rev.likes.includes(user.userId)
                                  ? rev.likes.filter((id: string) => id !== user.userId)
                                  : [...rev.likes, user.userId],
                          }
                        : rev
                );
                setReviews(updatedReviews);
                setAlertMessage(response?.data.message);
                setAlertSeverity("success");
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error("Error liking review:", error);
            setAlertMessage("An error occurred while liking the review.");
            setAlertSeverity("error");
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    // Snackbar close handler
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                {alertMessage && (
                    <Alert severity={alertSeverity} style={{ marginBottom: "16px" }}>
                        <AlertTitle>{alertSeverity.charAt(0).toUpperCase() + alertSeverity.slice(1)}</AlertTitle>
                        {alertMessage}
                    </Alert>
                )}

                {isLoggedIn ? (
                    <form onSubmit={handleAddReview}>
                        <div className="bg-gray-800 p-6 rounded-md mb-6">
                            <div className="mb-4">
                                <label htmlFor="filmTitle" className="block text-white mb-2">
                                    Film Title
                                </label>
                                <select
                                    id="filmTitle"
                                    value={FilmTitle}
                                    onChange={(e) => setFilmTitle(e.target.value)}
                                    className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                                    required
                                >
                                    <option value="">Select a Film</option>
                                    {filmOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="review" className="block text-white mb-2">
                                    Your Review
                                </label>
                                <textarea
                                    id="review"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                                    rows={4}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Review"}
                            </Button>
                        </div>
                    </form>
                ) : (
                    <Alert severity="info" style={{ marginBottom: "16px" }}>
                        <AlertTitle>Info</AlertTitle>
                        You must be logged in to add a review.
                    </Alert>
                )}

                {/* Filter Dropdown */}
                <div className="mb-4">
                    <label htmlFor="filmFilter" className="block text-white mb-2">
                        Filter by Film
                    </label>
                    <select
                        id="filmFilter"
                        value={selectedFilm}
                        onChange={(e) => setSelectedFilm(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                    >
                        <option value="">All Films</option>
                        {filmOptions.map((film) => (
                            <option key={film} value={film}>
                                {film}
                            </option>
                        ))}
                    </select>
                </div>

                <h2 className="text-2xl font-bold text-yellow-400 my-4">Reviews</h2>
                {loading ? (
                    <div className="text-center mt-8">
                        <CircularProgress size={50} color="primary" />
                    </div>
                ) : filteredReviews.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-full mx-auto">
                        {filteredReviews.map((review) => (
                            <Card key={review?._id} sx={{ backgroundColor: "#333", borderRadius: "8px" }}>
                                <CardContent>
                                    <Typography variant="h6" className="text-yellow-400">
                                        {review?.FilmTitle}
                                    </Typography>
                                    <Typography
                                    variant="body1"
                                    sx={{
                                        color: "white",
                                        fontStyle: "italic",
                                        maxHeight: "100px",
                                        overflow: "hidden",
                                        padding: "8px",
                                        fontSize: "0.9rem",
                                        wordBreak: "break-word",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: "vertical",
                                        overflowY: "auto",
                                        scrollbarWidth: "none",
                                        msOverflowStyle: "none",
                                        "&::-webkit-scrollbar": {
                                            display: "none",
                                        },
                                    }}
                                >
                                    "{review?.review}"
                                </Typography>
                                <Typography 
                                    sx={{
                                        color: 'gray',
                                        fontSize: 12,
                                        fontStyle: 'italic',
                                    }}>{review?.username}
                                </Typography>
                                    <Box className="flex items-center justify-between">
                                        <Typography variant="caption" className="text-gray-400">
                                            {review?.likes.length} Likes
                                        </Typography>
                                        <IconButton
                                            onClick={() => handleLikeReview(review?._id)}
                                            color="secondary"
                                        >
                                            <FavoriteIcon
                                                sx={{
                                                    color: review?.likes.includes(user?.userId) ? "red" : "gray",
                                                }}
                                            />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">No reviews available.</div>
                )}
            </div>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <SnackbarContent
                    sx={{
                        backgroundColor: alertSeverity === "success" ? "green" : "red",
                    }}
                    message={alertMessage}
                />
            </Snackbar>
        </div>
    );
};

export default DetailedReview;
