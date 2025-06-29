import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import './App.css';
// import Home from './components/home';
import YoutubeAnalyzer from './components/YoutubeAnalyzer';
// import Contact from './components/Contact';
import PdfHome from './components/PdfHome';
import MergePDF from './components/merge';
import WordToPdf from './components/wordtopdf';
import ImageToPdf from './components/imgtopdf';
import Pdftoword from './components/pdftoword';
import PdfToImage from './components/pdftoimg';
import CharBot from './components/CharBot';
import LoginPage from './components/mindwell_components/LoginPage';
import Portfolio from './components/Portfolio';
import Foot from './components/smallComponents/foot';
import SignupPage from './components/mindwell_components/Register';
import MindWell from './components/mindwell_components/mindwell';
import MindWellQues from './components/mindwell_components/mindwellQues';
import ForgetPass from './components/mindwell_components/forgetpass';
import  Otp  from './components/mindwell_components/otp';
import { PasswordUpdate } from './components/mindwell_components/passwordupdate';
import Activities from './components/mindwell_components/activities';
import Dashboard from './components/mindwell_components/dashboard';
import Meditation from './components/mindwell_components/meditation';
import Idea from './components/idea';
// import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* mindwell Routes */}
        <Route path="/" element={<MindWell />} />
        <Route path="/login" element = {<LoginPage/>}/>
        <Route path="/signup"   element={<SignupPage />} />
        <Route path="/mindwell" element={<MindWellQues />} />
        <Route path='/forget-password' element={<ForgetPass />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/otp' element= {<Otp />} />

        {/* //other components */}
        <Route path="/pdfHome"  element={<PdfHome />} />
        <Route path='/passwordupdate' element={<PasswordUpdate />} />
        <Route path="/Portfolio"element={<Portfolio />} />
        <Route path="/merge"    element={<MergePDF />} />
        <Route path="/analyzer" element={<YoutubeAnalyzer />} />
        <Route path="/pdftoword"element ={<Pdftoword />} />
        <Route path="/wordtopdf"element ={<WordToPdf />} />
        <Route path="/home"     element ={<LoginPage />} />
        <Route path="/imgtopdf" element ={<ImageToPdf />} />
        <Route path="/pdftoimg" element={<PdfToImage />} />
        {/* <Route path="/contact"  element={<Contact />} /> */}
        <Route path="/Gpt"      element = {<CharBot/>} />
    <Route path='/activity' element={<Activities />} />
    <Route path='/meditation' element={<Meditation />} />
      </Routes>
    </Router>
  );
}

export default App;
