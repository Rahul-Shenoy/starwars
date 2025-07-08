import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SearchBox from './SearchBox';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

const middlewares = [thunk as any];
const mockStore = configureStore(middlewares);

describe('SearchBox', () => {
    let store: any;
    let dispatchSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        store = mockStore({});
        dispatchSpy = vi.spyOn(store, 'dispatch');
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    function renderWithStore() {
        return render(
            <Provider store={store}>
                <SearchBox />
            </Provider>
        );
    }

    it('renders input and button with correct classes', () => {
        renderWithStore();
        const input = screen.getByPlaceholderText(/search characters/i);
        const button = screen.getByRole('button', { name: /search/i });
        expect(input).toBeInTheDocument();
        expect(input).toHaveClass('search-box-input');
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('search-box-btn');
    });

    it('dispatches searchCharacters on submit', () => {
        renderWithStore();
        const input = screen.getByPlaceholderText(/search characters/i);
        fireEvent.change(input, { target: { value: 'Luke' } });
        fireEvent.click(screen.getByRole('button', { name: /search/i }));
        expect(dispatchSpy).toHaveBeenCalled();
        const actions = store.getActions();
        expect(actions.some((a: any) => a.type && a.type.includes('searchCharacters'))).toBe(true);
    });

    it('dispatches fetchCharacters when input is cleared', async () => {
        renderWithStore();
        const input = screen.getByPlaceholderText(/search characters/i);
        fireEvent.change(input, { target: { value: 'Luke' } });
        fireEvent.change(input, { target: { value: '' } });
        await waitFor(() => {
            const actions = store.getActions();
            expect(actions.some((a: any) => a.type && a.type.includes('fetchCharactersCached'))).toBe(true);
        });
    });

    it('debounces search dispatch', async () => {
        jest.useFakeTimers();
        renderWithStore();
        const input = screen.getByPlaceholderText(/search characters/i);
        fireEvent.change(input, { target: { value: 'Han' } });
        expect(dispatchSpy).not.toHaveBeenCalled();
        jest.advanceTimersByTime(500);
        await waitFor(() => {
            expect(dispatchSpy).toHaveBeenCalled();
        });
        jest.useRealTimers();
    });
});
