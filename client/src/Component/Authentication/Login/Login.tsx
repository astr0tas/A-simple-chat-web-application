import { useEffect, useRef, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './Login.module.css';
import { FormEvent } from 'react';
import request from '../../../Tools/request.tool';
import domain from '../../../config/serverDomain.config';
import { Helmet } from 'react-helmet';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import sanitize from '../../../Tools/sanitizer.tool';
import { reportInputValidation, clearCustomValidity } from '../../../Tools/inputValidation.tool';
import { Dismiss } from 'flowbite';

export default function LoginComponent(): JSX.Element
{
      const emailRef = useRef<HTMLInputElement>(null);
      const passwordRef = useRef<HTMLInputElement>(null);

      const [email, setEmail] = useState<string | null>(null);
      const [password, setPassword] = useState<string | null>(null);
      const [isWrong, setIsWrong] = useState<boolean>(false);
      const [errorMessage, setErrorMessage] = useState<string | null>(null);

      const Navigate: NavigateFunction = useNavigate();

      function signWithGoogle(response: CredentialResponse): void
      {
            request.get(`${ domain }/loginWithGoogle`, { headers: { 'Authorization': `Bearer ${ response.credential }` } })
                  .then(res =>
                  {
                        console.log(res);
                  })
                  .catch(err =>
                  {
                        console.error(err);

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
                  reportInputValidation(emailRef, 'Email field is empty!');
                  return;
            }
            else
            {
                  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                  if (!emailRegex.test(sanitizedEmail))
                  {
                        reportInputValidation(emailRef, 'Email format invalid!');
                        return;
                  }
            }

            if (!sanitizedPassword || sanitizedPassword === '')
            {
                  reportInputValidation(passwordRef, 'Password field is empty!');
                  return;
            }
            else if (sanitizedPassword.length < 8)
            {
                  reportInputValidation(passwordRef, 'Password must be at least 8 characters long!');
                  return;
            }
            else
            {
                  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/;
                  if (!passwordRegex.test(sanitizedPassword))
                  {
                        reportInputValidation(passwordRef, 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character!');
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
                              <div className='w-full px-3 mb-3'>
                                    <div className='border-b-2 border-gray-400 w-full flex pb-3'>
                                          <h1 className="mx-auto text-3xl mt-3">Login</h1>
                                    </div>
                              </div>
                              <form className="flex flex-col mt-10 grow items-center" onSubmit={ submitForm }>
                                    <div className='flex flex-col w-full px-3'>
                                          <div className='flex'>
                                                <label id="emailLabel" htmlFor="emailInput" className="font-bold text-md">Email</label>
                                                <Link id="create_new_account" to='/sign_up' className="ms-auto text-blue-600 text-md hover:cursor-pointer active:text-blue-400">Sign up?</Link>
                                          </div>
                                          <input ref={ emailRef } defaultValue={ '' } type="email" className="my-2 text-md border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="emailInput" name="emailInputField" onChange={ e => setEmail(e.target.value) }></input>
                                          <label id="passwordLabel" htmlFor="passwordInput" className="font-bold text-md">Password</label>
                                          <input ref={ passwordRef } defaultValue={ '' } type="password" className="my-2 text-md border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="passwordInput" name="passwordInputField" onChange={ e => setPassword(e.target.value) }></input>

                                    </div>
                                    { isWrong && <div className={ `flex items-center ${ styles.error }` }>
                                          <AiOutlineCloseCircle />
                                          <p className='mb-0 ml-2' id="error_message">Email or password is not correct!</p>
                                    </div> }
                                    <input onClick={ () =>
                                    {
                                          clearCustomValidity(emailRef);
                                          clearCustomValidity(passwordRef);
                                    } } id="submit_btn" type='submit' value="Continue" className="h-[2.5rem] w-[10rem] mt-3 text-md border-2 rounded-md bg-sky-600 text-white hover:cursor-pointer self-center active:bg-sky-700 max-[400px]:text-base mb-3"></input>
                                    {
                                          (window.location.href === 'https://localhost:3000/' || window.location.href === 'https://127.0.0.1:3000/' || window.location.href === 'https://[::1]:3000/')
                                          &&
                                          <>
                                                <p className='text-lg mt-3 max-[400px]:text-base mb-2'>Or</p>
                                                <GoogleLogin
                                                      onSuccess={ signWithGoogle }
                                                      onError={ () => { setErrorMessage("Login with Google failed!"); } }
                                                      size='large'
                                                />
                                          </>
                                    }
                                    <Link id="recover_account" to='/recovery' className="mx-auto mt-auto text-blue-600 text-md hover:cursor-pointer active:text-blue-400 mb-5 max-[400px]:text-base">Forgot password?</Link>
                              </form>
                        </div>
                  </div>
                  <div id="toast-warning" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 z-50 absolute top-1 right-1" role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                              <svg data-dismiss-target="toast-warning" className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                              </svg>
                              <span className="sr-only">Warning icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">Improve password difficulty.</div>
                        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                              <span className="sr-only">Close</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                              </svg>
                        </button>
                  </div>
            </>
      )
}