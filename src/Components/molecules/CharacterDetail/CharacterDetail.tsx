import type { Character } from '../../../types';
import './CharacterDetail.scss';

interface CharacterDetailProps {
    character:Character;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({character}) => {
    console.log(character)
    return <div className='character-detail'>
        <h5>{character.name}</h5>
        <table>
            <tr>
                <td className='lbl'>Hair Color</td>
                <td data-testid='hair_color' className='value'>{character.hair_color}</td> 
            </tr>
            <tr>
                <td className='lbl'>Eye Color</td>
                <td data-testid='eye_color' className='value'>{character.eye_color}</td> 
            </tr>
            <tr>
                <td className='lbl'>Gender</td>
                <td data-testid='gender' className='value'>{character.gender}</td> 
            </tr>
            <tr>
                <td className='lbl'>Home Planet</td>
                <td data-testid='home_planet' className='value'>{character.home_planet.name}</td> 
            </tr>
        </table>

    </div>;
}

export default CharacterDetail;

