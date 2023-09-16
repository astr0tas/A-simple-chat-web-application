import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import LoginComponent from './Components/Authentication/Login/Login';

function App()
{
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={ <LoginComponent /> } />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
