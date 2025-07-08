import './App.css'
import CharacterList from './Components/templates/CharacterList';
import { store } from './store';
import { Provider } from 'react-redux';
import Header from './Components/molecules/header';

function App() {
  return (
    <Provider store={store}>
      <div style={{ width: '100vw', height: '100vh', margin: '0 auto' }}>
        <Header />
        <CharacterList />
      </div>
    </Provider>
  )
}

export default App