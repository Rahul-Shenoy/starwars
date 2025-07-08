import type { Character } from '../../../types';
import React from 'react';
import './CharacterCard.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanetCached, selectPlanetName, isPlanetLoading } from '../../../store/slices/planetSlice';
import { selectCharacterById, fetchCharacterByIdCached, setFavourite } from '../../../store/slices/CharacterSlice';
import type { AppDispatch } from '../../../store';
import BarLoader from 'react-spinners/BarLoader';
import { FaUser, FaUserAstronaut } from 'react-icons/fa';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { FaUsersRays } from 'react-icons/fa6';
import { IoFlashlightSharp } from 'react-icons/io5';

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

    const isFavourite = characterDetail?.isFavourite || false;
    const handleFavouriteToggle = () => {
        dispatch(setFavourite({ id: character.id?.toString(), isFavourite: !isFavourite }));
    };

    return (
        <div className='character-card'>
            <div className="character-card-fav-toggle">
                <button
                    className={`character-card-fav-bookmark${isFavourite ? ' active' : ''}`}
                    onClick={handleFavouriteToggle}
                    aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                    type="button"
                >
                    {isFavourite ? <FaStar size={22} /> : <FaRegStar size={22} />}
                </button>
            </div>
            <div className="character-card-header">
                <div className="character-card-avatar">
                    <FaUserAstronaut size={26} />
                </div>
                <h5 className="character-card-name">{characterDetail?.name || character.name}</h5>
            </div>
            <table className="character-card-table">
                <tbody>
                    <tr>
                        <td className="lbl">Gender</td>
                        <td data-testid="gender" className="value">
                            {characterLoading ? <BarLoader height={6} width={60} color="#0077ff" /> : (characterDetail?.gender)}
                        </td>
                    </tr>
                    <tr>
                        <td className="lbl">Home Planet</td>
                        <td data-testid="home_planet" className="value">
                            {characterLoading || planetLoading ? <BarLoader height={6} width={60} color="#0077ff" /> : (planetName)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
});

export default React.memo(CharacterCard);