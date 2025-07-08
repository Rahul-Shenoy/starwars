import type { Character } from '../../types';
import type { AppDispatch } from '../../store';
import { fetchCharacters } from '../../store/slices/thunks';
import CharacterCard from '../../Components/molecules/CharacterCard/CharacterCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectAllCharacters } from '../../store/slices/CharacterListSlice';

const CharacterList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const characters = useSelector(selectAllCharacters);
    useEffect(() => {
        dispatch(fetchCharacters());
    }, []);
    return (<div>
    {
        characters?.map((character: Character) => {
            return <CharacterCard character={character}/>
        })
    }
    </div>);
}

export default CharacterList;