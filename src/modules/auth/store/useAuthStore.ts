import {User} from '../types/user';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {zustandStorage} from '../../../store/zustandStorage';

const usersMocked: User[] = [
  {
    id: 1,
    email: 'alexmihoc@yahoo.com',
    username: 'alex',
    password: '123456',
    profilePicture: '',
    favorites: ['1', '2', '3'],
    prefferedOpenings: ['1', '2', '3'],
  },
  {
    id: 2,
    email: 'alexmihoc2807@gmail.com',
    username: 'alex7734',
    password: '123456',
    profilePicture: '',
    favorites: ['1', '2', '3'],
    prefferedOpenings: ['1', '2', '3'],
  },
];

export interface AuthState {
  users: User[] | null;
  currentUser: User | null;
  getUser: (id: number) => User | null;
  setCurrentUser: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  addPreferredOpening: (openingId: string) => void;
  removePreferredOpening: (openingId: string) => void;
  addFavoriteOpening: (openingId: string) => void;
  removeFavoriteOpening: (openingId: string) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      users: usersMocked,
      currentUser: null,
      getUser: (id: number) => {
        const user = get().users?.find(user => user.id === id);
        return user ?? null;
      },
      setCurrentUser: (user: User) =>
        set((state: AuthState) => {
          return {...state, currentUser: user};
        }),
      logout: () => {
        set((state: AuthState) => {
          return {...state, currentUser: null};
        });
      },
      updateUser: (user: User) => {
        const index = get().users?.findIndex(u => u.id === user.id);
        if (!index) return;
        const newUsers = get().users ?? [];
        newUsers[index] = user;
        set((state: AuthState) => {
          return {...state, users: newUsers, currentUser: user};
        });
      },
      addPreferredOpening: (openingId: string) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;

        const newPreferredOpenings = [
          ...currentUser.prefferedOpenings,
          openingId,
        ];

        const newUser: User = {
          ...currentUser,
          prefferedOpenings: newPreferredOpenings,
        };

        set((state: AuthState) => {
          const newUsers = state.users?.map(user =>
            user.id === newUser.id ? newUser : user,
          );
          return {
            ...state,
            users: newUsers,
            currentUser: newUser,
          };
        });
      },
      removePreferredOpening: (openingId: string) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;

        const newPreferredOpenings = currentUser.prefferedOpenings.filter(
          id => id !== openingId,
        );

        const newUser: User = {
          ...currentUser,
          prefferedOpenings: newPreferredOpenings,
        };

        set((state: AuthState) => {
          const newUsers = state.users?.map(user =>
            user.id === newUser.id ? newUser : user,
          );
          return {
            ...state,
            users: newUsers,
            currentUser: newUser,
          };
        });
      },
      addFavoriteOpening: (openingId: string) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;

        const newFavorites = [...currentUser.favorites, openingId];

        const newUser: User = {
          ...currentUser,
          favorites: newFavorites,
        };

        set((state: AuthState) => {
          const newUsers = state.users?.map(user =>
            user.id === newUser.id ? newUser : user,
          );
          return {
            ...state,
            users: newUsers,
            currentUser: newUser,
          };
        });
      },
      removeFavoriteOpening: (openingId: string) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;

        const newFavorites = currentUser.favorites.filter(
          id => id !== openingId,
        );

        const newUser: User = {
          ...currentUser,
          favorites: newFavorites,
        };

        set((state: AuthState) => {
          const newUsers = state.users?.map(user =>
            user.id === newUser.id ? newUser : user,
          );
          return {
            ...state,
            users: newUsers,
            currentUser: newUser,
          };
        });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
