import { User } from '../types/user'
import {create} from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from '../../../store/zustandStorage'

const usersMocked: User[] = [
    {
        id: 1,
        email: 'alexmihoc@yahoo.com',
        username: 'alex',
        password: '123456',
        profilePicture: '',
        favorites: ['1', '2', '3'],
        prefferedOpenings: ['1', '2', '3']
    },
    {
        id: 2,
        email: 'alexmihoc2807@gmail.com',
        username: 'alex7734',
        password: '123456',
        profilePicture: '',
        favorites: ['1', '2', '3'],
        prefferedOpenings: ['1', '2', '3']
    }
]

export interface AuthState {
    users: User[] | null,
    currentUser: User | null,
    getUser: (id: number) => User | null,
    setCurrentUser: (user: User) => void,
    logout: () => void,
    updateUser: (user: User) => void
}

export const useAuthStore = create(
    persist<AuthState>(
        (set, get) => ({
            users: usersMocked,
            currentUser: null,
            getUser: (id: number) => {
                const user = get().users?.find(user => user.id === id)
                return user ?? null
            },
            setCurrentUser: (user: User) => set(
                (state: AuthState) => {
                    return {...state, currentUser: user}
                }
            ),
            logout: () =>{
                set((state: AuthState) => {
                    return {...state, currentUser: null}}
                )
            },
            updateUser: (user: User) => {
                const index = get().users?.findIndex(u => u.id === user.id)
                if(!index) return;
                const newUsers = get().users ?? []
                newUsers[index] = user;
                set((state: AuthState) => {
                    return {...state, users: newUsers, currentUser: user}}
                )
            },
        }), 
        {
            name: 'user-storage',
            storage: createJSONStorage( () => zustandStorage)
        }
    )
)