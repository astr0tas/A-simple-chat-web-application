import { useEffect, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './Login.module.css';
import { FormEvent } from 'react';
import request from '../../../Tools/request.tool';
import domain from '../../../config/serverDomain.config';
import { Helmet } from 'react-helmet';
import { FaGoogle } from "react-icons/fa";

export default function LoginComponent(): JSX.Element
{
      const [email, setEmail] = useState<string | null>(null);
      const [password, setPassword] = useState<string | null>(null);

      const [isWrong, setIsWrong] = useState<boolean>(false);

      const Navigate: NavigateFunction = useNavigate();

      function submitForm(e: FormEvent<HTMLFormElement>): void
      {
            e.preventDefault();
            console.log(email, password);
            setIsWrong(false);
            // if (email && password && password!=='' && email!=='')
            // {
            //       request.post(`${ domain }/login`, { params: { email: email, password: password } }, { headers: { 'Content-Type': 'application/json' } })
            //             .then(res =>
            //             {
            //                   if (res.data.found)
            //                   {
            //                         setIsWrong(false);
            //                         Navigate('/staff');
            //                   }
            //                   else
            //                         setIsWrong(true);
            //             })
            //             .catch(err => console.error(err));
            // }
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
                                    <div className='flex flex-col w-[95%] pl-5'>
                                          <div className='flex'>
                                                <label id="emailLabel" htmlFor="emailInput" className="font-bold text-xl">Email</label>
                                                <Link id="create_new_account" to='/sign_up' className="ms-auto text-blue-600 text-xl hover:cursor-pointer active:text-blue-400">Sign up?</Link>
                                          </div>
                                          <input required defaultValue={ '' } type="email" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="emailInput" name="emailInputField" onChange={ e => setEmail(e.target.value) }></input>
                                          <label id="passwordLabel" htmlFor="passwordInput" className="font-bold text-xl">Password</label>
                                          <input required defaultValue={ '' } type="password" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="passwordInput" name="passwordInputField" onChange={ e => setPassword(e.target.value) }></input>
                                    </div>
                                    { isWrong && <div className={ `flex items-center ${ styles.error }` }>
                                          <AiOutlineCloseCircle />
                                          <p className='mb-0 ml-2' id="error_message">Email or password is not correct!</p>
                                    </div> }
                                    <input id="submit_btn" type='submit' value="Continue" className="h-[2.5rem] min-w-[10rem] mt-3 text-xl border-2 rounded-md bg-sky-600 text-white hover:cursor-pointer self-center active:bg-sky-700"></input>
                                    <p className='text-lg mt-3'>OR</p>
                                    <button type="button" className="h-[3rem] min-w-[15rem] mt-3 text-xl border-2 border-black rounded-md bg-white hover:cursor-pointer self-center active:bg-slate-200 flex items-center justify-center mb-5">
                                          <FaGoogle className='mb-0 me-3' />Login with Google
                                    </button>
                                    <Link id="recover_account" to='/recovery' className="mx-auto mt-auto text-blue-600 text-lg hover:cursor-pointer active:text-blue-400 mb-5">Forgot password?</Link>
                              </form>
                        </div>
                  </div>
            </>
      )
}