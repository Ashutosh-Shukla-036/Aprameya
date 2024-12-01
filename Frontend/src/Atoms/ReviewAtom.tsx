import { atom } from 'recoil';

interface Review {
    _id: any;
    userId: any;
    username: string;
    FilmTitle: string;
    review: string;
    likes: any[];  // Array of user IDs who liked the review
}

export const ReviewAtom = atom<Review[]>({
    key: 'ReviewAtom',
    default: []
});
