import { atom } from 'recoil';

interface UserState {
  username: string;
  email: string;
  userId: string;
}

export const UserAtom = atom<UserState | null>({
  key: 'UserAtom', 
  default: null, 
  effects: [
    ({ setSelf, onSet }) => {
      // Check if there's a saved user in localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setSelf(JSON.parse(savedUser));  // Set the user from localStorage
      }

      // Sync the atom with localStorage on change
      onSet((newValue) => {
        if (newValue) {
          localStorage.setItem('user', JSON.stringify(newValue));  // Save user to localStorage
        } else {
          localStorage.removeItem('user');  // Remove user from localStorage
        }
      });
    },
  ],
});
