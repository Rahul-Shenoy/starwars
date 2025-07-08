import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import CharacterDetail from './CharacterDetail';
import { character } from '../../../mock';
// Character component renders with required elements
test('Characters are loading with required detail', () => {
    console.log(character);
    render(<CharacterDetail character={character}/>).container;
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    const gender = screen.getByTestId('gender');
    expect(gender).toBeInTheDocument();
    expect(gender).toHaveTextContent(character.gender);
    const homePlanet = screen.getByTestId('home_planet');
    expect(homePlanet).toBeInTheDocument();
    expect(homePlanet).toHaveTextContent(character.home_planet.name);
});

// Character click is happening
// Favourite items indication 
// Non-favourites do not show fav indication
// Fav click does not propogate to card click