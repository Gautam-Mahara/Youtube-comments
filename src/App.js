import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import YoutubeAnalyzer from './components/YoutubeAnalyzer';
import Contact from './components/Contact';
import PdfHome from './components/PdfHome';
import MergePDF from './components/merge';
import WordToPdf from './components/wordtopdf';
import ImageToPdf from './components/imgtopdf';
import Pdftoword from './components/pdftoword';
import PdfToImage from './components/pdftoimg';
import CharBot from './components/CharBot';
import LoginPage from './components/LoginPage';
import Portfolio from './components/Portfolio';
import Foot from './components/smallComponents/foot';
import SignupPage from './components/Register';
import MindWell from './components/mindwell';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/m" element={< Pdftoword/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/Portfolio" element={<Portfolio />} />
        <Route path="/merge" element={<MergePDF />} />
        <Route path="/analyzer" element={<YoutubeAnalyzer />} />
        <Route path="/pdftoword" element ={<Pdftoword />} />
        <Route path="/wordtopdf" element ={<WordToPdf />} />
        <Route path="/home" element ={<LoginPage />} />
        <Route path="/imgtopdf" element ={<ImageToPdf />} />
        <Route path="/pdftoimg" element={<PdfToImage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pdfHome" element={<PdfHome />} />
        <Route path="/Gpt" element = {<CharBot/>} />
        <Route path = "/" element = {<MindWell/>}/>

      </Routes>
    </Router>
  );
}

export default App;
