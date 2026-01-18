import {Routes,Navigate,Route} from 'react-router-dom'

import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login'

function App() {
  return (
    <Routes>
      <Route  path='/' element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route  path='/not-found' element={<NotFound/>}/>
      <Route path="*" element={<Navigate to="/not-found"/>}/>
    </Routes>
  );
}

export default App;
