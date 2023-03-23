import './App.css';
import { Route, Routes } from 'react-router-dom';
import MovieGet from './MovieGet';
import Home from './Home';

const App = () => {
  return (
    <Routes>
      <Route path="/"element={<Home></Home>}></Route>
      <Route path='/movieGet' element={<MovieGet></MovieGet>}></Route>
    </Routes>
  );
};

export default App;
