import { useRecoilValue } from "recoil";
import { UserAtom } from "../Atoms/UserAtom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import CircularProgress from "@mui/material/CircularProgress";

const WatchList: React.FC = () => {
  const user = useRecoilValue(UserAtom);
  const navigate = useNavigate();
  const [watchList, setWatchList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    if (!user) {
      navigate("/signup");
      return;
    }

    const fetchWatchList = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/watchlist/getwatchlist/${user?.userId}`);
        setWatchList(response?.data?.watchlist);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
        setSnackbarMessage("Failed to load watchlist. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchList();
  }, [user, navigate]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5002/api/watchlist/deletewatchlist/${id}`);
      setWatchList((prev) => prev.filter((item) => item._id !== id));
      setSnackbarMessage("Watchlist item deleted successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting watchlist item:", error);
      setSnackbarMessage("Failed to delete watchlist item.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (!watchList.length) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <h2 className="text-3xl font-bold">Your Watchlist is empty</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white py-12 px-6 min-h-screen">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-yellow-300 mb-8 text-center">
          Your Watchlist
        </h2>
        <div className="space-y-6">
          {watchList.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <h3 className="text-2xl font-semibold text-teal-300 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline inline-block"
                  aria-label={`Watch ${item.title}`}
                >
                  Watch Now
                </a>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 w-full hover:bg-red-600 focus:ring focus:ring-red-300 transition duration-300"
                aria-label={`Remove ${item.title} from watchlist`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
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
            backgroundColor: snackbarSeverity === "success" ? "green" : "red",
            color: "white",
          }}
          message={snackbarMessage}
        />
      </Snackbar>
    </div>
  );
};

export default WatchList;
