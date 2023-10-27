import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import LoginComponent from './Components/Authentication/Login/Login';
import RecoveryComponent from './Components/Authentication/Recovery/Recovery';
import Menu from './Components/Menu/Menu';

function Error404(): JSX.Element
{
  return (
    <>
      <div style={ {
        backgroundImage: "url(\"https://static.vecteezy.com/system/resources/previews/003/527/366/non_2x/green-city-park-with-buildings-background-free-vector.jpg\")",
        backgroundPosition: "center",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        zIndex: '-10',
        opacity: '0.5',
        position: 'fixed',
        height: '100%',
        width: '100%'
      } }></div>
      <div className="h-full w-full flex items-center justify-center">
        <h1 className='text-9xl'>404 page not found!</h1>
      </div>
    </>
  )
}

function App(): JSX.Element
{
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={ <LoginComponent /> } />
          <Route path='/recovery' element={ <RecoveryComponent /> } />
          <Route path='/test' element={ <Menu /> }>

          </Route>
          <Route path='*' element={ <Error404 /> } />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
