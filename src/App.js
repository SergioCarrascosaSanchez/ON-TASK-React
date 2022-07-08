import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Routes>
        <Route path ='/login' element={<LoginPage/>}></Route>
        <Route exact path ='/sign-up' element={<SignupPage/>}></Route>
      </Routes>
  );
}

export default App;
