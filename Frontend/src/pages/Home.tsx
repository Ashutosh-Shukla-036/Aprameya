import { useRecoilState } from 'recoil';
import { FilmAtom } from '../Atoms/FilmAtom';
import { useEffect, useRef } from 'react';
import APlogo from '../assets/APLogo.jpg';
import FirstMovie from '../assets/FirstMovie.jpg';
import SecondMovie from '../assets/SecondMovie.jpg';
import ThirdMovie from '../assets/ThirdMovie.jpg';
import FourthMovie from '../assets/FourthMovie.jpg';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const [films, setFilms] = useRecoilState(FilmAtom);
    const navigate = useNavigate();
    const filmRef = useRef<HTMLDivElement>(null);

    const thumbnailMap: { [title: string]: string } = {
        "Safe Space": FirstMovie,
        "Love As We Know It": SecondMovie,
        "Love As We Know It – Part 2": ThirdMovie,
        "A Day Of My Life In The City": FourthMovie,
    };

    const getThumbnailPath = (title: string): string => {
        return thumbnailMap[title] || `/src/assets/APLogo.jpg`; 
    };

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const result = await fetch("http://localhost:5002/api/films/getfilms");
                const films = await result.json();
                setFilms(films);
            } catch (error) {
                console.error("Error fetching films:", error);
            }
        };

        fetchFilms();
    }, [setFilms]);

    const scrollToFilms = () => {
        filmRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSeeInDetail = (title: string) => {
        navigate(`/film/${title}`)
    }

    return (
        <>
            {/* Welcome Section */}
            <section className="bg-charcoal-metallic-dark min-h-screen flex items-center justify-center text-white px-6">
                <div className="max-w-5xl flex flex-col items-center md:flex-row md:space-x-10 p-6 md:p-10 bg-opacity-80 rounded-lg">
                    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-yellow-300 hover:text-yellow-400 transition duration-300">
                            Welcome to Aprameya Productions
                        </h1>
                        <p className="text-lg md:text-xl mt-4 max-w-xl text-gray-300 hover:text-teal-300 transition duration-300">
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
                        <img
                            src={APlogo}
                            alt="Aprameya Productions Logo"
                            className="w-64 h-auto md:w-80 opacity-90 rounded-lg shadow-lg mb-4"
                        />
                        <p className="text-teal-300 text-lg font-semibold mt-4 md:mt-0">Lights. Camera. Action.</p>
                        <p className="text-gray-400 text-sm">Established on September 11, 2023</p>
                    </div>
                </div>
            </section>

            {/* Films Layout Section */}
            <section ref={filmRef} className="bg-gray-900 py-12 px-6">
                <h2 className="text-3xl font-bold text-yellow-400 text-center mb-8">
                    Explore Our Films
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {films.map((film, index) => (
                        <div
                            key={index}
                            className="p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={getThumbnailPath(film.title)}
                                alt={`Thumbnail for ${film.title}`}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-bold text-yellow-400">{film.title}</h3>
                            <p className="text-sm text-gray-300 mt-2">
                                {film.description.substring(0, 100)}...
                            </p>
                            <div className="flex justify-between items-center mt-4">
                                <button 
                                    onClick={() => handleSeeInDetail(film.title)}
                                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-yellow-400 transition duration-300"
                                >
                                    see in Detail
                                </button>
                                <a
                                    href={film.link}
                                    className="px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-teal-400 hover:text-white transition duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Watch Now
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Home;