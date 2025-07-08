import { configureStore } from '@reduxjs/toolkit';
import { characterReducer } from './slices/CharacterSlice';
import { characterListReducer } from './slices/CharacterListSlice';
import { planetReducer } from './slices/planetSlice';

export const store = configureStore ({
    reducer: {
        character: characterReducer,
        characterList: characterListReducer,
        planets: planetReducer,
    }
});

export type AppDispatch = typeof store.dispatch; 

