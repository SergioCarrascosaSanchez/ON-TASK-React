import './App.css';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import MainPage from './pages/Main';
import {Routes, Route} from 'react-router-dom';
import UserMainPage from './pages/UserMain';
import Prueba from './pages/Pruebas';
import JoinGroupPage from './pages/JoinGroup';
import CreateGroupPage from './pages/CreateGroup'
import GroupMainPage from './pages/GroupMain';

function App() {
  return (
    <Routes>
        <Route path ='/login' element={<LoginPage/>}></Route>
        <Route exact path ='/sign-up' element={<SignupPage/>}></Route>
        <Route exact path ='/' element={<MainPage/>}></Route>
        <Route path='/users/:username' element={<UserMainPage/>}></Route>
        <Route path='/groups/:groupId' element={<GroupMainPage/>}></Route>
        <Route path='/pruebas' element={<Prueba />}></Route>
        <Route path='/join-group' element={<JoinGroupPage/>}></Route>
        <Route path='/create-group' element={<CreateGroupPage/>}></Route>
      </Routes>
  );
}

export default App;
