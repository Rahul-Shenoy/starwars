import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface PlanetState {
    entities: { [url: string]: string }; // url -> planet name
    loading: { [url: string]: boolean };
    error: { [url: string]: string | null };
}

const initialState: PlanetState = {
    entities: {},
    loading: {},
    error: {},
};

// Internal thunk for actual fetch
export const fetchPlanet = createAsyncThunk(
    'planets/fetchPlanetRaw',
    async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        return { url, name: data.result.properties.name };
    }
);

// Public thunk: checks cache before fetching
export const fetchPlanetCached = (url: string) => (dispatch: any, getState: any) => {
    const cached = getState().planets.entities[url];
    if (!cached) {
        return dispatch(fetchPlanet(url));
    }
    // Already cached, do nothing
    return Promise.resolve();
};

const planetSlice = createSlice({
    name: 'planets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPlanet.pending, (state, action) => {
            state.loading[action.meta.arg] = true;
            state.error[action.meta.arg] = null;
        });
        builder.addCase(fetchPlanet.fulfilled, (state, action) => {
            state.entities[action.payload.url] = action.payload.name;
            state.loading[action.payload.url] = false;
            state.error[action.payload.url] = null;
        });
        builder.addCase(fetchPlanet.rejected, (state, action) => {
            state.loading[action.meta.arg] = false;
            state.error[action.meta.arg] = action.error.message || 'Failed to fetch planet';
        });
    },
});

export const planetReducer = planetSlice.reducer;
export const selectPlanetName = (url: string) => (state: any) =>
    state.planets.entities[url];
export const isPlanetLoading = (url: string) => (state: any) =>
    !!state.planets.loading[url];
export const selectPlanetError = (url: string) => (state: any) =>
    state.planets.error[url];