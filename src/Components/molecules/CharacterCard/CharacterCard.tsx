import type { Character } from '../../../types';
import React from 'react';
import './CharacterCard.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanetCached, selectPlanetName, isPlanetLoading } from '../../../store/slices/PlanetSlice';
import { selectCharacterById, fetchCharacterByIdCached } from '../../../store/slices/CharacterSlice';
import type { AppDispatch } from '../../../store';

interface CharacterCardProps {
    character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = React.memo(({ character }) => {
    const dispatch = useDispatch<AppDispatch>();
    // Get character detail from Redux store cache
    const characterDetail = useSelector(selectCharacterById(character.id?.toString()));
    const planetName = useSelector(selectPlanetName(characterDetail?.homeworld?.toString()));
    const characterLoading = useSelector((state: any) => state.character?.loading);
    const planetLoading = useSelector(isPlanetLoading(characterDetail?.homeworld?.toString()));

    useEffect(() => {
        dispatch(fetchCharacterByIdCached(character.id?.toString()));
    }, []);

    useEffect(() => {
        if (characterDetail && !planetName && characterDetail.homeworld) {
            dispatch(fetchPlanetCached(characterDetail.homeworld?.toString()));
        }
    }, [characterDetail?.homeworld, planetName, dispatch]);

    return <div className='character-card'>
        <h5 >{characterDetail?.name || character.name}</h5>
        <table>
            <tbody>
                <tr>
                    <td className='lbl'>Gender</td>
                    <td data-testid='gender' className='value'>
                        {characterLoading ? 'Loading...' : (characterDetail?.gender || 'N/A')}
                    </td> 
                </tr>
                <tr>
                    <td className='lbl'>Home Planet</td>
                    <td data-testid='home_planet' className='value'>
                        {characterLoading || planetLoading ? 'Loading...' : (planetName || 'N/A')}
                    </td> 
                </tr>
            </tbody>
        </table>
    </div>;
});

export default React.memo(CharacterCard);