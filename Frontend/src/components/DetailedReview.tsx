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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const DetailedReview: React.FC = () => {
    const [reviews, setReviews] = useRecoilState(ReviewAtom);
    const user = useRecoilValue(UserAtom);
    const [FilmTitle, setFilmTitle] = useState("");
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] =
        useState<"success" | "warning" | "error" | "info">("info");
    const [selectedFilm, setSelectedFilm] = useState<string>("");

    const isLoggedIn = Boolean(user);

    // Updated film titles
    const filmOptions = [
        "Safe Space",
        "Love As We Know It",
        "Love As We Know It – Part 2",
        "A Day Of My Life In The City",
    ];

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const result = await axios.get("http://localhost:5002/api/review/getreviews");
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
            return;
        }

        if (!FilmTitle || !review) {
            setAlertMessage("Please provide both a film title and a review.");
            setAlertSeverity("error");
            return;
        }

        setLoading(true);
        setAlertMessage(null);

        try {
            const response = await axios.post(
                "http://localhost:5002/api/review/addreview",
                {
                    userId: user.userId,
                    username: user.username,
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
                // Reset form states after successful submission
                setFilmTitle("");
                setReview("");

                // Fetch updated reviews from the server after successful submission
                const result = await axios.get("http://localhost:5002/api/review/getreviews");
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
        }
    };

    // Handle like and unlike functionality
    const handleLikeReview = async (reviewId: string) => {
        if (!user?.userId) {
            setAlertMessage("You must be logged in to like a review.");
            setAlertSeverity("warning");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:5002/api/review/like", // Endpoint to like/unlike review
                {
                    reviewId,
                    userId: user.userId,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                // Update the reviews state to reflect the new like status
                const updatedReviews = reviews.map((rev) =>
                    rev._id === reviewId
                        ? { ...rev, likes: rev.likes.includes(user.userId) ? rev.likes.filter((id: string) => id !== user.userId) : [...rev.likes, user.userId] }
                        : rev
                );
                setReviews(updatedReviews);

                setAlertMessage(response.data.message);
                setAlertSeverity("success");
            }
        } catch (error) {
            console.error("Error liking review:", error);
            setAlertMessage("An error occurred while liking the review.");
            setAlertSeverity("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                {/* Alert Message */}
                {alertMessage && (
                    <Alert severity={alertSeverity} style={{ marginBottom: "16px" }}>
                        <AlertTitle>{alertSeverity.charAt(0).toUpperCase() + alertSeverity.slice(1)}</AlertTitle>
                        {alertMessage}
                    </Alert>
                )}

                {/* Sort Reviews Dropdown */}
                <div className="mb-4">
                    <label htmlFor="filmSelect" className="block text-white mb-2">Film Title</label>
                    <select
                        id="filmSelect"
                        value={selectedFilm}
                        onChange={(e) => setSelectedFilm(e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                    >
                        <option value="">All Films</option>
                        {filmOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Add New Review Form */}
                {isLoggedIn ? (
                    <form onSubmit={handleAddReview}>
                        <div className="bg-gray-800 p-6 rounded-md mb-6">
                            <div className="mb-4">
                                <label htmlFor="filmTitle" className="block text-white mb-2">Film Title</label>
                                <select
                                    id="filmTitle"
                                    value={FilmTitle}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilmTitle(e.target.value)}
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
                                <label htmlFor="review" className="block text-white mb-2">Your Review</label>
                                <textarea
                                    id="review"
                                    value={review}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value)}
                                    className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                                    rows={4}
                                    required
                                    style={{ resize: 'none' }} // Disable manual resizing
                                    onInput={(e) => {
                                        const target = e.target as HTMLTextAreaElement;  // Type cast to HTMLTextAreaElement
                                        target.style.height = 'auto';
                                        target.style.height = `${target.scrollHeight}px`;  // Adjust the height based on content
                                    }}
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                                disabled={loading} // Disable while loading
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

                {/* Display Filtered Reviews */}
                <h2 className="text-2xl font-bold text-yellow-400 my-4">Reviews</h2>
                {loading ? (
                    <div className="text-center mt-8">
                        <CircularProgress size={50} color="primary" />
                    </div>
                ) : filteredReviews.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-full mx-auto">
                        {filteredReviews.map((review, index) => (
                            <Card
                                key={index}
                                sx={{
                                    backgroundColor: "#333",
                                    borderRadius: "8px",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                    padding: '16px',
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" className="font-bold text-yellow-400 mb-2">
                                        {review.FilmTitle}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: 'white',
                                            fontStyle: 'italic',
                                            marginBottom: 2,
                                        }}
                                    >
                                        "{review.review}"
                                    </Typography>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
                                        <Typography variant="body2" sx={{ color: "gray", fontStyle: "italic", fontSize: '0.9rem' }}>
                                            {review.username}
                                        </Typography>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <IconButton
                                                sx={{
                                                    color: review.likes.includes(user?.userId) ? "red" : "gray", 
                                                }}
                                                onClick={() => handleLikeReview(review?._id)} 
                                            >
                                                <FavoriteIcon />
                                            </IconButton>
                                            <Typography variant="body2" sx={{ color: "gray", fontSize: '0.9rem', marginLeft: 1 }}>
                                                {review.likes.length} Likes
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Alert severity="info" style={{ marginBottom: "16px" }}>
                        No reviews found for this film.
                    </Alert>
                )}
            </div>
        </div>
    );
};

export default DetailedReview;
