import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import CharacterCard from './CharacterCard';
import { character } from '../../../mock';

// Character component renders with required elements
test('Characters are loading with required detail', () => {
    render(<CharacterCard character={character}/>);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    const gender = screen.getByTestId('gender');
    expect(gender).toBeInTheDocument();
    expect(gender).toHaveTextContent(character.gender);
    const homePlanet = screen.getByTestId('home_planet');
    expect(homePlanet).toBeInTheDocument();
    expect(homePlanet).toHaveTextContent(character.home_planet.name);
});

// Character click is happening
test('Card click triggers onClick handler', () => {
    const handleClick = jest.fn();
    render(<CharacterCard character={character} onClick={handleClick}/>);
    const card = screen.getByRole('button', { hidden: true }) || screen.getByText('Luke Skywalker').closest('.character-card');
    fireEvent.click(card!);
    expect(handleClick).toHaveBeenCalled();
});

// Favourite items indication
test('Favourite indication is shown for favourite character', () => {
    render(<CharacterCard character={{ ...character, isFavourite: true }}/>);
    expect(screen.getByTestId('favourite-indicator')).toBeInTheDocument();
});

// Non-favourites do not show fav indication
test('Non-favourite does not show favourite indicator', () => {
    render(<CharacterCard character={{ ...character, isFavourite: false }}/>);
    expect(screen.queryByTestId('favourite-indicator')).not.toBeInTheDocument();
});

// Fav click does not propagate to card click
test('Clicking favourite does not trigger card click', () => {
    const handleClick = jest.fn();
    const handleFavClick = jest.fn();
    render(
        <CharacterCard
            character={{ ...character, isFavourite: true }}
            onClick={handleClick}
            onFavouriteClick={handleFavClick}
        />
    );
    const favBtn = screen.getByTestId('favourite-indicator');
    fireEvent.click(favBtn);
    expect(handleFavClick).toHaveBeenCalled();
    expect(handleClick).not.toHaveBeenCalled();
});