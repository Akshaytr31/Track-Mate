import SignUp from './components/signUpform/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Body from './components/body/Body';
import Graph from './components/graph/Graph';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/body' element={<Body />} />
        <Route path='/graph' element={<Graph />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
