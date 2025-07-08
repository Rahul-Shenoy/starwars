import { createSlice } from '@reduxjs/toolkit';
import { fetchCharacters } from './thunks';
import type { Character } from '../../types';

interface CharacterState {
    data: Character;
    loading: boolean;
    error: string | null;
}

const initialState: CharacterState = {
    data: {name: '', homeworld:'', height: 0, mass: 0, hair_color: '', skin_color: '', eye_color: '', birth_year: '', gender: '', home_planet: '', url: '', id: ''},
    loading: false,
    error: null
};

const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchCharacters.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchCharacters.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export const characterReducer = characterSlice.reducer;
export const selectCharacterById = (state: {character: CharacterState}) => state.character.data;