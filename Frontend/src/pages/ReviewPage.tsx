import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../Atoms/UserAtom"; // Assuming you store user info in Recoil state.
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress"; // For loading spinner

const ReviewPage: React.FC = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const user = useRecoilValue(UserAtom); // Assuming user data is stored in Recoil
    const navigate = useNavigate();

    // Fetch the reviews for the logged-in user
    useEffect(() => {
        const fetchUserReviews = async () => {
            if (!user) {
                navigate("/login"); // Redirect to login if no user is logged in
                return;
            }

            try {
                const response = await fetch(`http://localhost:5002/api/review/getuserreview/${user.userId}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setReviews(data);
                } else {
                    console.error("Failed to fetch reviews");
                }
            } catch (error) {
                console.error("Error fetching user reviews:", error);
            } finally {
                setLoading(false); // Stop the loader once data is fetched
            }
        };

        fetchUserReviews();
    }, [user, navigate]);

    // Handle deleting a review
    const handleDeleteReview = async (reviewId: string) => {
        try {
            const response = await fetch(`http://localhost:5002/api/review/deletereview/${reviewId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setReviews(reviews.filter((review) => review._id !== reviewId));
            } else {
                console.error("Failed to delete the review");
            }
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Your Reviews</h1>

            {loading ? (
                <div className="flex justify-center">
                    <CircularProgress sx={{ color: "#ffca28" }} />
                </div>
            ) : reviews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <Card
                            key={review._id}
                            sx={{
                                backgroundColor: "#333",
                                borderRadius: "8px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                transition: "transform 0.3s ease",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ color: "#ffca28", fontWeight: "bold", marginBottom: 1 }}>
                                    {review.FilmTitle}
                                </Typography>

                                {/* Container for review content with fixed height and scroll */}
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
                                        scrollBehavior: "smooth",
                                    }}
                                >
                                    "{review.review}"
                                </Typography>

                                {/* Flex container for Delete Icon */}
                                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                    <IconButton
                                        aria-label="delete review"
                                        sx={{
                                            color: "red",
                                            "&:hover": {
                                                color: "#ff6f61",
                                                transform: "scale(1.1)",
                                            },
                                            transition: "transform 0.2s ease-in-out",
                                        }}
                                        onClick={() => handleDeleteReview(review._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <>
                    <p className="text-xl text-gray-300 text-center">You have not submitted any reviews yet.</p>
                    <p className="text-xl text-gray-300 text-center">Add your first review now.</p>
                    <div className="flex justify-center mt-6">
                        <a
                            href="/reviews"
                            className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-400 hover:text-gray-900 transition duration-300 text-center"
                        >
                            Be the first to add a review
                        </a>
                    </div>
                </>
            )}
        </div>
    );
};

export default ReviewPage;
