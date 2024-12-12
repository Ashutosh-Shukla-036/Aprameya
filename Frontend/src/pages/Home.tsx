import * as React from 'react';
import { useRecoilState } from 'recoil';
import { FilmAtom } from '../Atoms/FilmAtom';
import { ReviewAtom } from '../Atoms/ReviewAtom';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import APlogo from '../assets/APLogo.jpg';
import FirstMovie from '../assets/FirstMovie.jpg';
import SecondMovie from '../assets/SecondMovie.jpg';
import ThirdMovie from '../assets/ThirdMovie.jpg';
import FourthMovie from '../assets/FourthMovie.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Play, Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Home: React.FC = () => {
    const [films, setFilms] = useRecoilState(FilmAtom);
    const [reviews, setReviews] = useRecoilState(ReviewAtom);
    const [hoveredFilm, setHoveredFilm] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const filmRef = useRef<HTMLDivElement>(null);

    const thumbnailMap: { [title: string]: string } = {
        "Safe Space": FirstMovie,
        "Love As We Know It": SecondMovie,
        "Love As We Know It – Part 2": ThirdMovie,
        "A Day Of My Life In The City": FourthMovie,
    };

    const getThumbnailPath = (title: string): string => {
        return thumbnailMap[title] || APlogo;
    };

    const [filmsRef, filmsInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const result = await fetch("https://aprameya.onrender.com/api/films/getfilms");
                const films = await result.json();
                setFilms(films);
            } catch (error) {
                console.error("Error fetching films:", error);
            }
        };

        const fetchReviews = async () => {
            try {
                const result = await fetch("https://aprameya.onrender.com/api/review/getreviews");
                const reviews = await result.json();
                setReviews(reviews);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchFilms();
        fetchReviews();
    }, [setFilms, setReviews]);

    const scrollToFilms = () => {
        filmRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSeeInDetail = (title: string) => {
        navigate(`/film/${title}`);
    };

    return (
        <>
            {/* Welcome Section */}
            <section className="bg-charcoal-metallic-dark min-h-screen flex items-center justify-center text-white px-6">
                <div className="max-w-5xl flex flex-col items-center md:flex-row md:space-x-10 p-6 md:p-10 bg-opacity-80 rounded-lg">
                    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-yellow-300 hover:text-yellow-400 transition duration-300">
                            Welcome to Aprameya Productions
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl mt-4 max-w-xl text-gray-300 hover:text-teal-300 transition duration-300">
                            Creating cinematic experiences that captivate audiences worldwide. Aprameya Productions brings powerful stories to life, capturing the essence of human emotion, motivation, and connection.
                        </p>
                        <button
                            onClick={scrollToFilms}
                            className="mt-8 px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-teal-400 hover:text-white hover:scale-105 transform transition-all duration-300"
                        >
                            Explore Our Work
                        </button>
                        <p className="mt-6 text-gray-400 text-sm text-center md:text-left max-w-xl">
                            "Our vision is to inspire and connect audiences globally, one story at a time."
                        </p>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center md:justify-end space-y-4 mt-10">
                        <motion.img
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            src={APlogo}
                            alt="Aprameya Productions Logo"
                            className="w-64 h-auto md:w-80 rounded-lg shadow-2xl"
                        />
                        <p className="text-teal-300 text-lg font-semibold mt-4 md:mt-0">Lights. Camera. Action.</p>
                        <p className="text-gray-400 text-sm">Established on September 11, 2023</p>
                    </div>
                </div>
            </section>

            {/* Films Layout Section */}
            <section ref={filmRef} className="bg-gray-900 py-12 px-6">
                <motion.section 
                    ref={filmsRef}
                    className="py-20 px-6 relative"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={filmsInView ? { opacity: 1, y: 0 } : {}}
                        className="text-3xl sm:text-4xl font-bold text-yellow-400 text-center mb-12"
                    >
                        Our Latest Productions
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {films.map((film, index) => (
                            <motion.div
                                key={film.title}
                                initial={{ opacity: 0, y: 50 }}
                                animate={filmsInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ y: -10 }}
                                className="relative group"
                                onHoverStart={() => setHoveredFilm(film.title)}
                                onHoverEnd={() => setHoveredFilm(null)}
                            >
                                <div className="relative overflow-hidden rounded-lg shadow-xl bg-gray-800">
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                        src={getThumbnailPath(film.title)}
                                        alt={film.title}
                                        className="w-full h-56 object-cover"
                                    />
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredFilm === film.title ? 1 : 0 }}
                                        className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"
                                    >
                                        <div className="text-center p-4">
                                            <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">{film.title}</h3>
                                            <p className="text-white text-sm sm:text-base mb-4">{film.description.substring(0, 100)}...</p>
                                            <div className="flex justify-center gap-4">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleSeeInDetail(film.title)}
                                                    className="px-4 py-2 bg-teal-500 text-white rounded-lg flex items-center gap-2"
                                                >
                                                    <Star className="w-4 h-4" /> Details
                                                </motion.button>
                                                <motion.a
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    href={film.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg flex items-center gap-2"
                                                >
                                                    <Play className="w-4 h-4" /> Watch
                                                </motion.a>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </section>

            {/* Reviews Section */}
            <section className="bg-charcoal-metallic-dark py-12 px-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 text-center mb-8">
                    What Our Viewers Say
                </h2>
                {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {reviews.slice(0, 3).map((review, index) => (
                            <Card
                                key={index}
                                sx={{
                                    backgroundColor: '#333',
                                    borderRadius: '8px',
                                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" component="div" className="text-yellow-400 font-semibold">
                                        {review?.FilmTitle}
                                    </Typography>
                                    <Typography variant="body2" className="text-gray-300">
                                        "{review?.review}"
                                    </Typography>
                                    <Typography variant="body2" className="italic text-teal-500">
                                        {review?.username}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-300">No reviews available yet.</p>
                )}
                <div className="text-center mt-8">
                    <Link
                        to="/reviews"
                        className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-400 hover:text-gray-900 transition duration-300 text-center"
                    >
                        See All Reviews or Add Review
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Home;
