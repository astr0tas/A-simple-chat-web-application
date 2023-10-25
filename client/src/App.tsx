import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import LoginComponent from './Components/Authentication/Login/Login';
import Menu from './Components/Menu/Menu';

function Error404(): JSX.Element
{
  return (
    <div className="h-full w-full flex items-center justify-center">
      <h1 className='text-9xl'>404 page not found!</h1>
    </div>
  )
}

function App(): JSX.Element
{
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={ <LoginComponent /> } />
          <Route path='/test' element={ <Menu /> }>

          </Route>
          <Route path='*' element={ <Error404 /> } />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
