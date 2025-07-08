import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Character } from '../../types';

export const fetchCharacters = createAsyncThunk(
    'characterList/fetchCharacters',
    async (url: string = 'https://swapi.tech/api/people/') => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
);

export const searchCharacters = createAsyncThunk(
    'characterList/searchCharacters',
    async (searchTerm: string) => {
        const response = await fetch(`https://swapi.tech/api/people/?name=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        return data;
    }
);

interface CharacterListState {
    list: Character[];
    loading: boolean;
    error: string | null;
    next?: string | null ;
    previous?: string | null;
}

const initialState: CharacterListState = {
    list: [],
    loading: false,
    error: null,
    next: undefined,
    previous: undefined,
};

const characterListSlice = createSlice({
    name: 'characterList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.pending, (state) => {
            state.loading = true;
        });
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
        builder.addCase(fetchCharacters.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch characters';
        });
        builder.addCase(searchCharacters.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(searchCharacters.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload.result.map((character: any) => {
                return {
                    id: character.uid,
                    name: character.name,
                    url: character.url,
                };
            });
            state.next = null;
            state.previous = null;
        });
        builder.addCase(searchCharacters.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to search characters';
        });
    },
});

export const characterListReducer = characterListSlice.reducer;
export const selectAllCharacters = (state: { characterList: CharacterListState }) => state.characterList.list;
export const selectPaginators = (state: { characterList: CharacterListState }) => ({
    next: state.characterList.next,
    previous: state.characterList.previous,
});