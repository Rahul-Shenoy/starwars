import type { Character } from '../../../types';
import './CharacterCard.scss';
import type { AppDispatch } from '../../../store';
import { fetchCharacterById } from '../../../store/slices/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectCharacterById } from '../../../store/slices/CharacterSlice';


interface CharacterCardProps {
    character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = (props) => {
    const dispatch = useDispatch<AppDispatch>();
    const character = useSelector(selectCharacterById);
    useEffect(() => {
        dispatch(fetchCharacterById(props.character.id.toString()));
    }, [dispatch, props.character.id]);

    return <div className='character-card'>
        <h5 >{character.name}</h5>
        <table>
            <tbody>
                <tr>
                    <td className='lbl'>Gender</td>
                    <td data-testid='gender' className='value'>{character.gender}</td> 
                </tr>
                <tr>
                    <td className='lbl'>Home Planet</td>
                    <td data-testid='home_planet' className='value'>{character.home_planet}</td> 
                </tr>
            </tbody>
        </table>
    </div>;
}

export default CharacterCard;