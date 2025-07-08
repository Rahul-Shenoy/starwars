import type { Character } from '../../../types';
import './CharacterCard.scss';
import type { AppDispatch } from '../../../store';
import { fetchCharacterById } from '../../../store/slices/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectCharacterById } from '../../../store/slices/CharacterSlice';


interface CharacterCardProps {
    character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({character}) => {
    const [characterDetail, setCharacterDetail] = useState(character);
    useEffect(() => {
        fetch(characterDetail?.url?.toString())
        .then(response => response.json())
        .then(res => {
            const data = res.result.properties;
            setCharacterDetail({
                ...data,
                id: res.result.uid
            });
            fetch(data.homeworld.toString())
            .then(response => response.json())
            .then(res => {
                const planetData = res.result.properties;
                setCharacterDetail({
                    ...data,
                    home_planet: planetData.name,
                });
            });
        });
    }, [character.id]);

    return <div className='character-card'>
        <h5 >{character.name}</h5>
        <table>
            <tbody>
                <tr>
                    <td className='lbl'>Gender</td>
                    <td data-testid='gender' className='value'>{characterDetail.gender}</td> 
                </tr>
                <tr>
                    <td className='lbl'>Home Planet</td>
                    <td data-testid='home_planet' className='value'>{characterDetail.home_planet}</td> 
                </tr>
            </tbody>
        </table>
    </div>;
}

export default CharacterCard;