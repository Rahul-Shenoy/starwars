import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Character } from '../../types';

interface CharacterListState {
    list: Character[];
    loading: Boolean;
    error: string | null;
}

const initialState: CharacterListState = {
    list: [],
    loading: false,
    error: null
};

export const fetchCharacters = createAsyncThunk(
    'character/fetchCharacters',
    async () => {
        const response = await fetch(`https://swapi.tech/api/people/`);
        const data = await response.json();
        return data;
    }
);

export const characterListSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload.results.map((character: any) => {
                return {
                    id: character.uid,
                    name: character.name,
                    url: character.url,
                };
            });
        });
        builder.addCase(fetchCharacters.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchCharacters.rejected, (state, action) => {
            state.loading = false;
        })
    }
});

export const characterListReducer = characterListSlice.reducer;
export const selectAllCharacters = (state: {characterList: CharacterListState}) => state.characterList.list;