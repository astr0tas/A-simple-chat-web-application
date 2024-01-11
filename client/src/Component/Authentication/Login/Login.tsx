import { useEffect, useRef, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './Login.module.css';
import { FormEvent } from 'react';
import request from '../../../Tools/request.tool';
import domain from '../../../config/serverDomain.config';
import { Helmet } from 'react-helmet';
import { Modal } from "flowbite-react";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import sanitize from '../../../Tools/sanitizer.tool';

export default function LoginComponent(): JSX.Element
{
      const emailRef = useRef<HTMLInputElement>(null);
      const passwordRef = useRef<HTMLInputElement>(null);

      const [email, setEmail] = useState<string | null>(null);
      const [password, setPassword] = useState<string | null>(null);
      const [isWrong, setIsWrong] = useState<boolean>(false);
      const [showPopUp, setShowPopUp] = useState<boolean>(false);
      const [errorMessage, setErrorMessage] = useState<string | null>(null);

      const Navigate: NavigateFunction = useNavigate();

      function signWithGoogle(response: CredentialResponse): void
      {
            request.get(`${ domain }/loginWithGoogle`, { headers: { 'Authorization': `Bearer ${ response.credential }` } })
                  .then(res =>
                  {

                  })
                  .catch(err =>
                  {
                        console.error(err);

                        setShowPopUp(true);
                        if (err.response.status < 500)
                              setErrorMessage(err.response.data.message);
                        else
                              setErrorMessage("Server encountered an unexpected error!");
                  });
      }

      function submitForm(e: FormEvent<HTMLFormElement>): void
      {
            e.preventDefault();
            setIsWrong(false);

            const sanitizedEmail = sanitize(email);
            const sanitizedPassword = sanitize(password);

            if (!sanitizedEmail || sanitizedEmail === '')
            {
                  if (emailRef.current)
                  {
                        emailRef.current.setCustomValidity('Email field is empty!');
                        emailRef.current.reportValidity();
                  }
                  return;
            }
            else
            {
                  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                  if (!emailRegex.test(sanitizedEmail))
                  {
                        if (emailRef.current)
                        {
                              emailRef.current.setCustomValidity('Email format invalid!');
                              emailRef.current.reportValidity();
                        }
                        return;
                  }
            }

            if (!sanitizedPassword || sanitizedPassword === '')
            {
                  if (passwordRef.current)
                  {
                        passwordRef.current.setCustomValidity('Password field is empty!');
                        passwordRef.current.reportValidity();
                  }
                  return;
            }
            else if (sanitizedPassword.length < 8)
            {
                  if (passwordRef.current)
                  {
                        passwordRef.current.setCustomValidity('Password must be at least 8 characters long!');
                        passwordRef.current.reportValidity();
                  }
                  return;
            }
            else
            {
                  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/;
                  if (!passwordRegex.test(sanitizedPassword))
                  {
                        if (passwordRef.current)
                        {
                              passwordRef.current.setCustomValidity('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character!');
                              passwordRef.current.reportValidity();
                        }
                        return;
                  }
            }

            request.post(`${ domain }/login`, { params: { email: sanitizedEmail, password: sanitizedPassword } }, { headers: { 'Content-Type': 'application/json' } })
                  .then(res =>
                  {
                        if (res.data.found)
                        {
                              setIsWrong(false);
                              Navigate('/message');
                        }
                        else
                              setIsWrong(true);
                  })
                  .catch(err =>
                  {
                        console.error(err);

                        setShowPopUp(true);
                        if (err.response.status < 500)
                              setErrorMessage(err.response.data.message);
                        else
                              setErrorMessage("Server encountered an unexpected error!");
                  });
      }

      useEffect(() =>
      {
            // request.get(`${ domain }/`)
            //       .then(res =>
            //       {
            //             if (res.data.found)
            //                   Navigate('/staff');
            //       })
            //       .catch(error => console.log(error));
      }, []);

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
                                          <input ref={ emailRef } defaultValue={ '' } type="email" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="emailInput" name="emailInputField" onChange={ e => setEmail(e.target.value) }></input>
                                          <label id="passwordLabel" htmlFor="passwordInput" className="font-bold text-xl">Password</label>
                                          <input ref={ passwordRef } defaultValue={ '' } type="password" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="passwordInput" name="passwordInputField" onChange={ e => setPassword(e.target.value) }></input>

                                    </div>
                                    { isWrong && <div className={ `flex items-center ${ styles.error }` }>
                                          <AiOutlineCloseCircle />
                                          <p className='mb-0 ml-2' id="error_message">Email or password is not correct!</p>
                                    </div> }
                                    <input id="submit_btn" type='submit' value="Continue" className="h-[2.5rem] min-w-[10rem] mt-3 text-xl border-2 rounded-md bg-sky-600 text-white hover:cursor-pointer self-center active:bg-sky-700 max-[400px]:text-base"></input>
                                    {
                                          (window.location.href === 'https://localhost:3000/' || window.location.href === 'https://127.0.0.1:3000/' || window.location.href === 'https://[::1]:3000/')
                                          &&
                                          <>
                                                <p className='text-lg mt-3 max-[400px]:text-base mb-2'>OR</p>
                                                <GoogleLogin
                                                      onSuccess={ signWithGoogle }
                                                      onError={ () => { setErrorMessage("Login with Google failed!"); setShowPopUp(true); } }
                                                      size='large'
                                                />
                                          </>
                                    }
                                    <Link id="recover_account" to='/recovery' className="mx-auto mt-auto text-blue-600 text-lg hover:cursor-pointer active:text-blue-400 mb-5 max-[400px]:text-base">Forgot password?</Link>
                              </form>
                        </div>
                  </div>
                  <Modal dismissible show={ showPopUp } onClose={ () => setShowPopUp(false) } position='center'>
                        <Modal.Header className="p-2">
                              <h2 className="text-center text-3xl max-[400px]:text-xl">An error occurred!</h2>
                        </Modal.Header>
                        <Modal.Body>
                              <p className="text-center text-lg max-[400px]:text-md">{ errorMessage }</p>
                        </Modal.Body>
                        <Modal.Footer className="justify-center">
                              <button onClick={ () => setShowPopUp(false) } className="h-[3rem] min-w-[8rem] text-lg border-2 rounded-md bg-sky-600 text-white hover:cursor-pointer active:bg-sky-700">Confirm</button>
                        </Modal.Footer>
                  </Modal>
            </>
      )
}