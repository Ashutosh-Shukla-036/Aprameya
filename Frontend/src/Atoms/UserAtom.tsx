import { atom } from 'recoil';

export const UserAtom = atom({
  key: 'UserAtom', 
  default: null, 
  effects: [
    ({ setSelf, onSet }) => {
      
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setSelf(JSON.parse(savedUser)); 
      }

     
      onSet((newValue) => {
        if (newValue) {
          localStorage.setItem('user', JSON.stringify(newValue)); 
        } else {
          localStorage.removeItem('user'); 
        }
      });
    },
  ],
});
