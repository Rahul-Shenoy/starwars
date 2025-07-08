import './App.css'
import CharacterList from './Components/templates/CharacterList';
import { character } from './mock';
import { store } from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div>
        <CharacterList list={[]}/>
      </div>
    </Provider>
  )
}

export default App