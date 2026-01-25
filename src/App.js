import {Routes,Navigate,Route} from 'react-router-dom'

import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login'
import Jobs from './components/Jobs'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route  path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>}/>
      <Route  path='/not-found' element={<NotFound/>}/>
      <Route path="*" element={<Navigate to="/not-found"/>}/>
    </Routes>
  );
}

export default App;
