import { atom } from "recoil";

interface Film {
    _id: any;
    title: string;
    description: string;
    genre: string;
    director: string;
    releaseDate: string;
    link: string;
    cast: string[];
    averageRating?: number;
    ratingCount?: number,
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

export const FilmAtom = atom<Film[]>({
    key: "FileAtom",
    default: [],
    effects: [
        ({ setSelf, onSet }) => {
            // Initialize from localStorage
            const storedData = localStorage.getItem("FilmAtom");
            if (storedData) {
                setSelf(JSON.parse(storedData));
            }

            // Save to localStorage on changes
            onSet((newValue) => {
                localStorage.setItem("FilmAtom", JSON.stringify(newValue));
            });
        },
    ],
})