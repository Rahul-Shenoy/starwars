import type { Character } from '../../types';
import type { AppDispatch } from '../../store';
import CharacterCard from '../../Components/molecules/CharacterCard/CharacterCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectAllCharacters, fetchCharacters } from '../../store/slices/CharacterListSlice';
import './CharacterList.scss';

const CharacterList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const characters = useSelector(selectAllCharacters);
    useEffect(() => {
        dispatch(fetchCharacters());
    }, []);
    return (<div className='character-list'>
    {
        characters?.map((character: Character) => {
            return <CharacterCard character={character}/>
        })
    }
    </div>);
}

export default CharacterList;