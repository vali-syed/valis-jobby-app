import {Routes,Navigate,Route} from 'react-router-dom'

import Home from './components/Home';
import NotFound from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route  path='/home' element={<Home/>}/>
      <Route  path='/not-found' element={<NotFound/>}/>
      <Route path="*" element={<Navigate to="/not-found"/>}/>
    </Routes>
  );
}

export default App;
