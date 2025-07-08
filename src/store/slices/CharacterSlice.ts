import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Character } from '../../types';

interface CharacterState {
    entities: { [id: string]: Character };
    loading: boolean;
    error: string | null;
}

const initialState: CharacterState = {
    entities: {},
    loading: false,
    error: null
};

export const fetchCharacterById = createAsyncThunk(
    'character/fetchCharacterById',
    async (id: string) => {
        const response = await fetch(`https://swapi.tech/api/people/${id}`);
        const res = await response.json();
        const data = res.result.properties;
        return {
            ...data, 
            id: res.result.uid
        };
    }
);

const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacterById.fulfilled, (state, action) => {
            state.loading = false;
            // Overwrite or add the full character details by id
            if (action.payload && action.payload.id) {
                state.entities[action.payload.id.toString()] = action.payload;
            }
        });
        builder.addCase(fetchCharacterById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCharacterById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch character details';
        });
    }
});

export const characterReducer = characterSlice.reducer;
export const selectCharacterById = (id: string) => (state: { character: CharacterState }) => state.character.entities[id];