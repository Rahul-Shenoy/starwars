import type { Character, Planet } from '../types';

const planet: Planet = {
    id: '1',
    name: 'Tatooine',
}

export const character: Character = {
    id: '1',
    name: 'Luke Skywalker',
    gender: 'male',
    skin_color: 'fair',
    hair_color: 'blond',
    height: 172,
    eye_color: 'blue',
    mass: 77,
    birth_year: '19BBY',
    home_planet: planet,
    url: 'https://www.swapi.tech/api/people/1'
}