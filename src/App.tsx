import './App.css'
import CharacterCard from './Components/molecules/CharacterCard/CharacterCard';
import type { Character } from './types';

const character: Character = {
    id: 'String',
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

function App() {
  return (
    <>
      <CharacterCard character={character}/>
    </>
  )
}

export default App