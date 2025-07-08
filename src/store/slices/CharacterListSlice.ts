import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Character } from '../../types';

function normalizeUrl(url: string) {
    // Remove trailing slashes and normalize
    return url.replace(/\/$/, '');
}

export const fetchCharactersRaw = createAsyncThunk(
    'characterList/fetchCharactersRaw',
    async (url: string = 'https://swapi.tech/api/people/') => {
        const response = await fetch(url);
        const data = await response.json();
        return { url: normalizeUrl(url), data };
    }
);

export const fetchCharacters = (url: string = 'https://swapi.tech/api/people/') => (dispatch: any, getState: any) => {
    const normUrl = normalizeUrl(url);
    const cached = getState().characterList.cache[normUrl];
    if (!cached) {
        return dispatch(fetchCharactersRaw(normUrl));
    }
    // Already cached, update list from cache
    dispatch({ type: 'characterList/useCache', payload: { url: normUrl } });
    return Promise.resolve();
};

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
    cache: { [url: string]: { list: Character[]; next?: string | null; previous?: string | null } };
}

const initialState: CharacterListState = {
    list: [],
    loading: false,
    error: null,
    next: undefined,
    previous: undefined,
    cache: {},
};

const characterListSlice = createSlice({
    name: 'characterList',
    initialState,
    reducers: {
        useCache: (state, action) => {
            const { url } = action.payload;
            const cached = state.cache[url];
            if (cached) {
                state.list = cached.list;
                state.next = cached.next;
                state.previous = cached.previous;
                state.loading = false;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCharactersRaw.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCharactersRaw.fulfilled, (state, action) => {
            state.loading = false;
            const url = action.payload.url;
            const payload = action.payload.data;
            const list = payload.results.map((character: any) => ({
                id: character.uid,
                name: character.name,
                url: character.url,
            }));
            state.list = list;
            state.next = payload.next;
            state.previous = payload.previous;
            state.cache[url] = {
                list,
                next: payload.next,
                previous: payload.previous,
            };
        });
        builder.addCase(fetchCharactersRaw.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch characters';
        });
        builder.addCase(searchCharacters.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(searchCharacters.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload.result.map((character: any) => ({
                id: character.uid,
                name: character.name,
                url: character.url,
            }));
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