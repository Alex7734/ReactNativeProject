import {StateStorage} from 'zustand/middleware'
import {MMKV} from 'react-native-mmkv'

const storage = new MMKV()

export const zustandStorage: StateStorage = { 
    setItem: async (name: string, value: string | number | boolean | Uint8Array) => {
        return storage.set(name, value)
    }, 
    getItem: (name: string) => {
        const value = storage.getString(name)
        return value ?? null
      },
      removeItem: (name: string) => {
        return storage.delete(name)
      },
}