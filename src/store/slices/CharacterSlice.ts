import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Character } from '../../types';
import { SWAPI_PEOPLE_BASE_URL } from '../../constants';

interface CharacterState {
    entities: { [id: string]: Character & { isFavourite?: boolean } };
    loading: boolean;
    error: string | null;
}

const initialState: CharacterState = {
    entities: {},
    loading: false,
    error: null
};

export const fetchCharacterById = createAsyncThunk(
    'character/fetchCharacterByIdRaw',
    async (id: string) => {
        const response = await fetch(`${SWAPI_PEOPLE_BASE_URL}/${id}`);
        const res = await response.json();
        const data = res.result.properties;
        return {
            ...data, 
            id: res.result.uid
        };
    }
);

// Public thunk: checks cache before fetching
export const fetchCharacterByIdCached = (id: string) => (dispatch: any, getState: any) => {
    const cached = getState().character.entities[id];
    if (!cached) {
        return dispatch(fetchCharacterById(id));
    }
    // Already cached, do nothing
    return Promise.resolve();
};

const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        setFavourite(state, action: PayloadAction<{ id: string; isFavourite: boolean }>) {
            const { id, isFavourite } = action.payload;
            if (state.entities[id]) {
                state.entities[id].isFavourite = isFavourite;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCharacterById.fulfilled, (state, action) => {
            state.loading = false;
            // Overwrite or add the full character details by id
            if (action.payload && action.payload.id) {
                state.entities[action.payload.id.toString()] = {
                    ...action.payload,
                    isFavourite: state.entities[action.payload.id.toString()]?.isFavourite || false
                };
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

export const { setFavourite } = characterSlice.actions;
export const characterReducer = characterSlice.reducer;
export const selectCharacterById = (id: string) => (state: { character: CharacterState }) => state.character.entities[id];