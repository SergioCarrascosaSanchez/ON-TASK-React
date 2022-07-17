import './App.css';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import MainPage from './pages/Main';
import {Routes, Route} from 'react-router-dom';
import UserMainPage from './pages/UserMain';
import Prueba from './pages/Pruebas';

function App() {
  return (
    <Routes>
        <Route path ='/login' element={<LoginPage/>}></Route>
        <Route exact path ='/sign-up' element={<SignupPage/>}></Route>
        <Route exact path ='/' element={<MainPage/>}></Route>
        <Route path='/users/:username' element={<UserMainPage/>}></Route>
        <Route path='/pruebas' element={<Prueba />}></Route>
      </Routes>
  );
}

export default App;
