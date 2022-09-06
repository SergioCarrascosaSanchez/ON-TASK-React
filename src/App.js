import './App.css';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import MainPage from './pages/Main';
import {Routes, Route} from 'react-router-dom';
import UserMainPage from './pages/UserMain';
import Prueba from './pages/Pruebas';
import JoinGroupPage from './pages/JoinGroup';
import CreateGroupPage from './pages/CreateGroup'
import CreateTaskPage from './pages/CreateTask'
import GroupMainPage from './pages/GroupMain';
import TaskMainPage from './pages/TaskMain';
import PageNotFound from './pages/PageNotFound';
import { UserLoginContextProvider } from './context/userLoginContext';
import { CurrentContextProvider } from './context/currentContext';

function App() {
  return (
    <UserLoginContextProvider>
    <CurrentContextProvider>
      <Routes>
          <Route path ='/login' element={<LoginPage/>}></Route>
          <Route exact path ='/sign-up' element={<SignupPage/>}></Route>
          <Route exact path ='/' element={<MainPage/>}></Route>
          <Route path='/users/:username' element={<UserMainPage/>}></Route>
          <Route path='/tasks/:task' element={<TaskMainPage/>}></Route>
          <Route path='/groups/:groupId' element={<GroupMainPage/>}></Route>
          <Route path='/pruebas' element={<Prueba />}></Route>
          <Route path='/join-group' element={<JoinGroupPage/>}></Route>
          <Route path='/create-group' element={<CreateGroupPage/>}></Route>
          <Route path='/create-task' element={<CreateTaskPage/>}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CurrentContextProvider>
      </UserLoginContextProvider>
  );
}

export default App;
