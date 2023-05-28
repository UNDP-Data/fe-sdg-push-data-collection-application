import { Route, Routes } from 'react-router-dom';
import { GlobalHeader } from './Header';
import { Footer } from './Footer';
import { CountryHomePage } from './HomePage';

function App() {
  return (
    <div className='undp-container'>
      <GlobalHeader />
      <Routes>
        <Route path='/:country' element={<CountryHomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
