import { configureStore } from '@reduxjs/toolkit';
import { characterReducer } from './slices/CharacterSlice';
import { characterListReducer } from './slices/CharacterListSlice';


export const store = configureStore ({
    reducer: {
        character: characterReducer,
        characterList: characterListReducer
    }
});

export type AppDispatch = typeof store.dispatch; 

