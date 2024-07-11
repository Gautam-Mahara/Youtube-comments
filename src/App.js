import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import YoutubeAnalyzer from './components/YoutubeAnalyzer';
import Contact from './components/Contact';
import PdfHome from './components/PdfHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyzer" element={<YoutubeAnalyzer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/pdfHome' element={<PdfHome />} />
      </Routes>
    </Router>
  );
}

export default App;
