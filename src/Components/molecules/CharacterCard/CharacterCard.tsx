import type { Character } from '../../../types';
import './CharacterCard.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanet, selectPlanetName } from '../../../store/slices/PlanetSlice';

interface CharacterCardProps {
    character: Character;
}

import type { AppDispatch } from '../../../store';
const CharacterCard: React.FC<CharacterCardProps> = ({character}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [characterDetail, setCharacterDetail] = useState(character);
    const planetName = useSelector(selectPlanetName(characterDetail.homeworld?.toString()));
    useEffect(() => {
        fetch(characterDetail?.url?.toString())
        .then(response => response.json())
        .then(res => {
            const data = res.result.properties;
            setCharacterDetail({
                ...data,
                id: res.result.uid
            });
            if (!planetName && data.homeworld) {
                dispatch(fetchPlanet(data.homeworld?.toString()));
            }
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
                    <td data-testid='home_planet' className='value'>{planetName}</td> 
                </tr>
            </tbody>
        </table>
    </div>;
}

export default CharacterCard;