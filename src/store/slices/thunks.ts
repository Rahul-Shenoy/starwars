import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCharacters = createAsyncThunk(
    'character/fetchCharacters',
    async () => {
        const response = await fetch(`https://swapi.tech/api/people/`);
        const data = await response.json();
        return data;
    }
);

export const fetchCharacterById = createAsyncThunk(
    'character/fetchCharacterById',
    async (id: string) => {
        const response = await fetch(`https://swapi.tech/api/people/${id}`);
        const res = await response.json();
        const data = res.result.properties;
        debugger;
        const planetRes = await fetch(data.homeworld.toString());
        const planetJson = await planetRes.json();
        const planetData = planetJson.result.properties;

        return {
            ...data, 
            home_planet: planetData.name,
            id: res.result.uid
        };
    }
);