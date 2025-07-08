import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Character } from '../../types';

interface CharacterListState {
    list: Character[];
    loading: Boolean;
    error: string | null;
    next: string | null;
    previous: string | null;
}

const initialState: CharacterListState = {
    list: [],
    loading: false,
    error: null,
    next: null,
    previous: null,
};

export const fetchCharacters = createAsyncThunk(
    'character/fetchCharacters',
    async (url:string) => {
        const response = await fetch(url);
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
            state.next = action.payload.next;
            state.previous = action.payload.previous;
        });
        builder.addCase(fetchCharacters.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchCharacters.rejected, (state, action) => {
            state.loading = false;
        });
    }
});

export const characterListReducer = characterListSlice.reducer;
export const selectAllCharacters = (state: {characterList: CharacterListState}) => state.characterList.list;
export const selectPaginators = (state: {characterList: CharacterListState}) => ({
    next: state.characterList.next,
    previous: state.characterList.previous,
});