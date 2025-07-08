import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface PlanetState {
    entities: { [url: string]: string }; // url -> planet name
    loading: boolean;
    error: string | null;
}

const initialState: PlanetState = {
    entities: {},
    loading: false,
    error: null,
};

export const fetchPlanet = createAsyncThunk(
    'planets/fetchPlanet',
    async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        return { url, name: data.result.properties.name };
    }
);

const planetSlice = createSlice({
    name: 'planets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPlanet.fulfilled, (state, action) => {
            state.entities[action.payload.url] = action.payload.name;
        });
    },
});

export const planetReducer = planetSlice.reducer;
export const selectPlanetName = (url: string) => (state: any) =>
    state.planets.entities[url];