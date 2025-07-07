import type { Character } from '../../../types';

interface CharacterCardProps {
    character:Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({character}) => {
    return <div>{character.name}</div>;
}

export default CharacterCard;