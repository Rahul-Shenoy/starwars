import React, { useState, useEffect, useRef } from 'react';
import { fetchCharacters, searchCharacters } from '../../../store/slices/CharacterListSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store';

const SearchBox: React.FC = () => {
    const [input, setInput] = useState('');
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    // Debounce effect
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            if (input.trim() !== '') {
                dispatch(searchCharacters(input.trim()));
            }
            else {
                dispatch(fetchCharacters('https://swapi.tech/api/people/'));
             }
        }, 500);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (debounceRef.current) clearTimeout(debounceRef.current);
        dispatch(searchCharacters(input.trim()));
    };

    return (
        <form className="search-box" onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder={"search characters..."}
                aria-label="Search"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBox;
