import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPaginators } from '../../../store/slices/CharacterListSlice';
import { fetchCharacters } from '../../../store/slices/CharacterListSlice';
import type { AppDispatch } from '../../../store';

const Pagination: React.FC = () => {
    const { next, previous } = useSelector(selectPaginators);
    const dispatch = useDispatch<AppDispatch>();

    const handleNext = () => {
        if (next) dispatch(fetchCharacters(next.toString()));
    };
    const handlePrevious = () => {
        if (previous) dispatch(fetchCharacters(previous.toString()));
    };

    return (
        <div className="character-list-pagination">
            <button onClick={handlePrevious} disabled={!previous}>&laquo; Previous</button>
            <button onClick={handleNext} disabled={!next}>Next &raquo;</button>
        </div>
    );
};

export default Pagination;
