import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Components
import LoginComponent from './Component/Authentication/Login/Login';
import RecoveryComponent from './Component/Authentication/Recovery/Recovery';
import Menu from './Component/Menu/Menu';

import Error404 from './Component/Error/Error_404';

function App(): JSX.Element
{
  return (
    <>
      <GoogleOAuthProvider clientId={ import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID } >
        <div className="web_background"></div>
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
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
