import { useEffect, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './Login.module.css';
import { FormEvent } from 'react';
import request from '../../../Tools/request.tool';
import axios from 'axios';
import domain from '../../../config/domain.config';

export default function LoginComponent(): JSX.Element
{
      document.title = "Login";

      const [username, setUsername] = useState<string | null>(null);
      const [password, setPassword] = useState<string | null>(null);

      const [isUsernameEmpty, setIsUsernameEmpty] = useState<boolean>(false);
      const [isPasswordEmpty, setIsPasswordEmpty] = useState<boolean>(false);

      const [isWrong, setIsWrong] = useState<boolean>(false);

      const Navigate: NavigateFunction = useNavigate();

      function submitForm(e: FormEvent<HTMLFormElement>): void
      {
            e.preventDefault();
            setIsWrong(false);
            if (!username)
                  setIsUsernameEmpty(true);
            if (!password)
                  setIsPasswordEmpty(true);
            if (username && password)
            {
                  setIsUsernameEmpty(false);
                  setIsPasswordEmpty(false);
                  request.post(`https://${ domain }/login`, { params: { username: username, password: password } }, { headers: { 'Content-Type': 'application/json' } })
                        .then(res =>
                        {
                              if (res.data.found)
                              {
                                    setIsWrong(false);
                                    Navigate('/staff');
                              }
                              else
                                    setIsWrong(true);
                        })
                        .catch(err => console.error(err));
            }
      }

      useEffect(() =>
      {
            axios.get(`https://${ domain }/`, {
                  withCredentials: true
            })
                  .then(res =>
                  {
                        if (res.data.found)
                              Navigate('/staff');
                  })
                  .catch(error => console.log(error));
      }, [Navigate]);

      return (
            <>
                  <div className={ `${ styles.background }` }></div>
                  <div className="w-full h-full flex flex-col p-[5px] overflow-auto">
                        <div className={ `m-auto w-[90%] max-w-[25rem] h-[35rem] bg-slate-50 rounded-xl border border-solid border-gray-400 flex flex-col` }>
                              <div className='w-full px-5 mb-3'>
                                    <div className='border-b-2 border-gray-400 w-full flex pb-3'>
                                          <h2 className="mx-auto text-4xl mt-3">Login</h2>
                                    </div>
                              </div>
                              <form className="flex flex-col mt-10 grow items-center" onSubmit={ submitForm }>
                                    <div className='flex flex-col w-[95%] pl-5'>
                                          <label htmlFor="usernameInput" className="font-bold text-xl">Username</label>
                                          <input defaultValue={ '' } type="text" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="usernameInput" onChange={ e =>
                                          {
                                                if (e.target.value === '') setUsername(null);
                                                else setUsername(e.target.value);
                                          } }></input>
                                          { isUsernameEmpty && <div className={ `flex items-center mb-5 ${ styles.error }` }>
                                                <AiOutlineCloseCircle />
                                                <p className='mb-0 ml-2'>Username field is empty!</p>
                                          </div> }
                                          <label htmlFor="passwordInput" className="font-bold text-xl">Password</label>
                                          <input defaultValue={ '' } type="password" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="passwordInput" onChange={ e =>
                                          {
                                                if (e.target.value === '') setPassword(null);
                                                else setPassword(e.target.value);
                                          } }></input>
                                          { isPasswordEmpty && <div className={ `flex items-center mb-5 ${ styles.error }` }>
                                                <AiOutlineCloseCircle />
                                                <p className='mb-0 ml-2'>Password field is empty!</p>
                                          </div> }
                                    </div>
                                    { isWrong && <div className={ `flex items-center mb-5 ${ styles.error }` }>
                                          <AiOutlineCloseCircle />
                                          <p className='mb-0 ml-2'>Username or password is not correct!</p>
                                    </div> }
                                    <Link to='/recovery' className="mx-auto mt-3 text-blue-600 text-xl hover:cursor-pointer active:text-blue-400 mb-5">Forgot password?</Link>
                                    <input type='submit' value="Continue" className="h-[2.5rem] min-w-[10rem] mt-auto mb-5 text-xl border-2 rounded-md bg-sky-600 text-white hover:cursor-pointer self-center active:bg-sky-700"></input>
                              </form>
                        </div>
                  </div>
            </>
      )
}