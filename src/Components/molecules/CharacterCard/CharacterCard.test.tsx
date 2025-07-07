import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import CharacterCard from './CharacterCard';
import type { Character } from '../../../types';

const character: Character = {
    id: '1',
    name: 'Luke Skywalker',
    gender: 'male',
    skin_color: 'fair',
    hair_color: 'blond',
    height: 172,
    eye_color: 'blue',
    mass: 77,
    birth_year: '19BBY',
    url: 'https://www.swapi.tech/api/people/1'
}

// Character component renders with required elements
test('Characters are loading with required detail', () => {
    render(<CharacterCard character={character}/>).container;
    expect(screen.getByText('Luke Skywalker')).toBeDefined();
});
// Character click is happening
// Favourite items indication 
// Non-favourites do not show fav indication
// Fav click does not propogate to card click