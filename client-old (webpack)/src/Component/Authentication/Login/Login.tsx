import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './Login.module.css';
import { FormEvent } from 'react';
import request from '../../../Tools/request.tool';
import domain from '../../../config/serverDomain.config';
import { Helmet } from 'react-helmet';
import { Modal } from "flowbite-react";

export default function LoginComponent(): JSX.Element
{
      const [email, setEmail] = useState<string | null>(null);
      const [password, setPassword] = useState<string | null>(null);
      const [isWrong, setIsWrong] = useState<boolean>(false);
      const [emptyEmail, setEmptyEmail] = useState<boolean>(false);
      const [invalidEmailFormat, setInvalidEmailFormat] = useState<boolean>(false);
      const [emptyPassword, setEmptyPassword] = useState<boolean>(false);
      const [showPopUp, setShowPopUp] = useState<boolean>(false);


      function signWithGoogle(): void
      {
            request.get(`${ domain }/loginWithGoogle`)
                  .then(res =>
                  {
                        console.log(res);
                  })
                  .catch(err => console.error(err));
      }

      function submitForm(e: FormEvent<HTMLFormElement>): void
      {
            e.preventDefault();
            setIsWrong(false);
            setEmptyEmail(false);
            setInvalidEmailFormat(false);
            setEmptyPassword(false);

            let isOK = true;

            if (!email || email === '')
            {
                  setEmptyEmail(true);
                  isOK = false;
            }
            else
            {
                  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                  if (!emailRegex.test(email))
                  {
                        setInvalidEmailFormat(true);
                        isOK = false;
                  }
            }
            if (!password || password === '')
            {
                  setEmptyPassword(true);
                  isOK = false;
            }

            if (isOK)
            {
                  request.post(`${ domain }/login`, { params: { email: email, password: password } }, { headers: { 'Content-Type': 'application/json' } })
                        .then(res =>
                        {
                              console.log(res);
                              if (res.data.found === false)
                                    setIsWrong(true);
                              else
                                    setIsWrong(false);
                        })
                        .catch(err => console.error(err));
            }
      }

      // useEffect(() =>
      // {
      //       request.get(`${ domain }/`)
      //             .then(res =>
      //             {
      //                   if (res.data.found)
      //                         Navigate('/staff');
      //             })
      //             .catch(error => console.log(error));
      // }, [Navigate]);

      return (
            <>
                  <Helmet>
                        <title>Login</title>
                        <meta name="author" content="Nghia Duong"></meta>
                        <meta name="description" content="Login to the chat web application"></meta>
                  </Helmet>
                  <div className="w-full h-full flex flex-col p-[5px] overflow-auto">
                        <div className={ `m-auto w-[90%] max-w-[25rem] h-[35rem] bg-slate-50 rounded-xl border border-solid border-gray-400 flex flex-col` }>
                              <div className='w-full px-5 mb-3'>
                                    <div className='border-b-2 border-gray-400 w-full flex pb-3'>
                                          <h2 className="mx-auto text-4xl mt-3">Login</h2>
                                    </div>
                              </div>
                              <form className="flex flex-col mt-10 grow items-center" onSubmit={ submitForm }>
                                    <div className='flex flex-col w-[95%] pl-5 pr-2'>
                                          <div className='flex'>
                                                <label id="emailLabel" htmlFor="emailInput" className="font-bold text-xl">Email</label>
                                                <Link id="create_new_account" to='/sign_up' className="ms-auto text-blue-600 text-xl hover:cursor-pointer active:text-blue-400">Sign up?</Link>
                                          </div>
                                          <input required defaultValue={ '' } pattern='[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$' type="email" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="emailInput" name="emailInputField" onChange={ e => setEmail(e.target.value) }></input>
                                          { emptyEmail && <div className={ `flex items-center ${ styles.error }` }>
                                                <AiOutlineCloseCircle />
                                                <p className='mb-0 ml-2' id="error_message">Email field is empty!</p>
                                          </div> }
                                          { invalidEmailFormat && <div className={ `flex items-center ${ styles.error }` }>
                                                <AiOutlineCloseCircle />
                                                <p className='mb-0 ml-2' id="error_message">Email format invalid!</p>
                                          </div> }
                                          <label id="passwordLabel" htmlFor="passwordInput" className="font-bold text-xl">Password</label>
                                          <input required defaultValue={ '' } type="password" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="passwordInput" name="passwordInputField" onChange={ e => setPassword(e.target.value) }></input>
                                          { emptyPassword && <div className={ `flex items-center ${ styles.error }` }>
                                                <AiOutlineCloseCircle />
                                                <p className='mb-0 ml-2' id="error_message">Password field is empty!</p>
                                          </div> }
                                    </div>
                                    { isWrong && <div className={ `flex items-center ${ styles.error }` }>
                                          <AiOutlineCloseCircle />
                                          <p className='mb-0 ml-2' id="error_message">Email or password is not correct!</p>
                                    </div> }
                                    <input id="submit_btn" type='submit' value="Continue" className="h-[2.5rem] min-w-[10rem] mt-3 text-xl border-2 rounded-md bg-sky-600 text-white hover:cursor-pointer self-center active:bg-sky-700"></input>
                                    {
                                          (window.location.href === 'https://localhost:3000/' || window.location.href === 'https://127.0.0.1:3000/' || window.location.href === 'https://[::1]:3000/')
                                          &&
                                          <>
                                                <p className='text-lg mt-3'>OR</p>
                                                <button className='h-[2.5rem] min-w-[10rem] flex items-center text-lg border-2 border-black rounded-md px-3 mt-2 max-[400px]:text-md active:bg-slate-300' type='button' onClick={ signWithGoogle }>
                                                      <img src='https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png' className='w-[30px] h-[30px] me-2 max-[400px]:w-[25px] max-[400px]:h-[25px]'></img>
                                                      Sign in with Google
                                                </button>
                                          </>
                                    }
                                    <Link id="recover_account" to='/recovery' className="mx-auto mt-auto text-blue-600 text-lg hover:cursor-pointer active:text-blue-400 mb-5">Forgot password?</Link>
                              </form>
                        </div>
                  </div>
                  <Modal dismissible show={ showPopUp } onClose={ () => setShowPopUp(false) }>
                        <Modal.Header className="p-2"></Modal.Header>
                        <Modal.Body>
                              <h2 className="text-center text-4xl max-[400px]:text-2xl">Some thing has gone wrong!</h2>
                        </Modal.Body>
                        <Modal.Footer className="justify-center">
                              <button onClick={ () => setShowPopUp(false) } className="h-[3rem] min-w-[8rem] text-lg border-2 rounded-md bg-sky-600 text-white hover:cursor-pointer active:bg-sky-700">Try again</button>
                        </Modal.Footer>
                  </Modal>
            </>
      )
}