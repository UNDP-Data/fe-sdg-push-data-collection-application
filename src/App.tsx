import { Route, Routes } from 'react-router-dom';
import { GlobalHeader } from './Header';
import { Footer } from './Footer';
import { CountryHomePage } from './HomePage';
import { GenerateReport } from './GenerateReport';

function App() {
  return (
    <div className='undp-container'>
      <GlobalHeader />
      <Routes>
        <Route path='/UpdateData/:country' element={<CountryHomePage />} />
        <Route path='/GenerateReport' element={<GenerateReport />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
