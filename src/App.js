import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import YoutubeAnalyzer from './components/YoutubeAnalyzer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyzer" element={<YoutubeAnalyzer />} />
      </Routes>
    </Router>
  );
}

export default App;
