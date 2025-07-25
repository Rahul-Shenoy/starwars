import type { Character } from '../../types';
import type { AppDispatch } from '../../store';
import CharacterCard from '../../Components/molecules/CharacterCard/CharacterCard';
import Pagination from '../organisms/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SWAPI_BASE_URL } from '../../constants';
import { selectAllCharacters, fetchCharacters } from '../../store/slices/CharacterListSlice';
import PuffLoader from 'react-spinners/PuffLoader';
import './CharacterList.scss';

const CharacterList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const characters = useSelector(selectAllCharacters);
    const loading = useSelector((state: any) => state.characterList?.loading);
    useEffect(() => {
        dispatch(fetchCharacters(`${SWAPI_BASE_URL}/people/`));
    }, [dispatch]);

    return (
        <div className='character-list-container'>
            <div className='character-list'>
                {loading ? (
                    <div className="character-list-loader">
                        <PuffLoader />
                    </div>
                ) : (
                    <>
                        {characters?.map((character: Character) => (
                            <CharacterCard key={character.name?.toString()} character={character} />
                        ))}
                    </>
                )}
                <i aria-hidden="true"/>
                <i aria-hidden="true"/>
                <i aria-hidden="true"/>
                <i aria-hidden="true"/>
            </div>
            <Pagination />
        </div>
    );
}

export default CharacterList;