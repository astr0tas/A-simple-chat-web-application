import { useState } from "react"
import request from "../../../Tools/request";
import domain from "../../../Tools/domain";
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './Recovery.module.css';
import { Modal } from "flowbite-react";

export default function RecoveryComponent(): JSX.Element
{
      const Navigate: NavigateFunction = useNavigate();

      const [username, setUsername] = useState<string | null>(null);
      const [password, setPassword] = useState<string | null>(null);
      const [repassword, setRepassword] = useState<string | null>(null);

      const [usernameFound, setUsernameFound] = useState<boolean | null>(null);
      const [isUsernameEmpty, setIsUsernameEmpty] = useState<boolean>(false);
      const [isPasswordEmpty, setIsPasswordEmpty] = useState<boolean>(false);
      const [isPasswordNotMatch, setIsPasswordNotMatch] = useState<boolean>(false);
      const [isRepasswordEmpty, setIsRepasswordEmpty] = useState<boolean>(false);
      const [validateMode, setValidateMode] = useState<boolean>(true);
      const [showPopUp, setShowPopUp] = useState<boolean>(false);

      function submitValidation(e: FormEvent): void
      {
            e.preventDefault();
            setUsernameFound(null);
            if (!username)
                  setIsUsernameEmpty(true);
            else
            {
                  setIsUsernameEmpty(false);
                  request.post(`https://${ domain }/recoveryValidation`, { params: { username: username } }, { headers: { 'Content-Type': 'application/json' } })
                        .then(res =>
                        {
                              if (res.data.found)
                              {
                                    setUsernameFound(true);
                                    setValidateMode(false);
                              }
                              else
                                    setUsernameFound(false);
                        })
                        .catch(err => console.error(err));
            }
      }

      function submitNewPassword(e: FormEvent): void
      {
            e.preventDefault();
            setIsPasswordNotMatch(false);
            if (!password)
                  setIsPasswordEmpty(true);
            if (!repassword)
                  setIsRepasswordEmpty(true);
            if (password && repassword && password !== repassword)
            {
                  setIsPasswordEmpty(false);
                  setIsRepasswordEmpty(false);
                  setIsPasswordNotMatch(true);
            }
            else if (password && repassword && password === repassword)
            {
                  setIsPasswordEmpty(false);
                  setIsRepasswordEmpty(false);
                  request.post(`https://${ domain }/recoveryNewPassword`, { params: { username: username, password: password } }, { headers: { 'Content-Type': 'application/json' } })
                        .then(res =>
                        {
                              setShowPopUp(true)
                        })
                        .catch(err => console.log(err));
            }
      }

      function changeUser(): void
      {
            setUsername(null);
            setPassword(null);
            setRepassword(null);
            setUsernameFound(null);
            setIsUsernameEmpty(false);
            setIsPasswordEmpty(false);
            setIsPasswordNotMatch(false);
            setIsRepasswordEmpty(false);
            setValidateMode(true);
      }

      return (
            <>
                  <div className={ `${ styles.background }` }></div>
                  <Modal dismissible show={ showPopUp } onClose={ () => { setShowPopUp(false); Navigate('/'); } }>
                        <Modal.Header className="p-2"></Modal.Header>
                        <Modal.Body>
                              <h2 className="text-center text-4xl">Password changed successfully!</h2>
                        </Modal.Body>
                        <Modal.Footer className="justify-center">
                              <button onClick={ () =>
                              {
                                    setShowPopUp(false);
                                    Navigate('/');
                              } } className="h-[3rem] min-w-[8rem] text-xl border-2 rounded-md bg-sky-600 text-white hover:cursor-pointer active:bg-sky-700">Back to login</button>
                        </Modal.Footer>
                  </Modal>
                  { validateMode &&
                        <div className="w-full h-full flex flex-col p-[5px] overflow-auto">
                              <div className={ `m-auto w-[90%] max-w-[25rem] h-[25rem] bg-slate-50 rounded-xl border border-solid border-gray-400 flex flex-col` }>
                                    <div className='w-full px-5 mb-3'>
                                          <div className='border-b-2 border-gray-400 w-full flex pb-3'>
                                                <h2 className="mx-auto text-4xl mt-3 text-center">User validation</h2>
                                          </div>
                                    </div>
                                    <form className="flex flex-col mt-10 grow items-center" onSubmit={ submitValidation }>
                                          <div className='flex flex-col w-[95%] pl-5'>
                                                <label htmlFor="usernameInput" className="font-bold text-xl">Username</label>
                                                <input defaultValue={ '' } type="text" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="usernameInput" onChange={ e =>
                                                {
                                                      if (e.target.value === '') setUsername(null);
                                                      else setUsername(e.target.value);
                                                } }></input>
                                          </div>
                                          { isUsernameEmpty && <div className={ `flex items-center mb-5 ${ styles.error }` }>
                                                <AiOutlineCloseCircle />
                                                <p className='mb-0 ml-2'>Username field is empty!</p>
                                          </div> }
                                          { usernameFound === false && <div className={ `flex items-center mb-5 ${ styles.error }` }>
                                                <AiOutlineCloseCircle />
                                                <p className='mb-0 ml-2'>Username not found!</p>
                                          </div> }
                                          <Link to='/' className="mx-auto mt-3 text-blue-600 text-xl hover:cursor-pointer active:text-blue-400 mb-5">Back to login</Link>
                                          <input type='submit' value="Continue" className="h-[2.5rem] min-w-[10rem] mt-auto mb-5 text-xl border-2 rounded-md bg-sky-600 text-white hover:cursor-pointer self-center active:bg-sky-700"></input>
                                    </form>
                              </div>
                        </div>
                  }
                  { !validateMode &&
                        <div className="w-full h-full flex flex-col p-[5px] overflow-auto">
                              <div className={ `m-auto w-[90%] max-w-[25rem] h-[35rem] bg-slate-50 rounded-xl border border-solid border-gray-400 flex flex-col` }>
                                    <div className='w-full px-5 mb-3'>
                                          <div className='border-b-2 border-gray-400 w-full flex pb-3'>
                                                <h2 className="mx-auto text-4xl mt-3 text-center">New password</h2>
                                          </div>
                                    </div>
                                    <div className="w-[95%] pl-5 mt-2 self-center text-xl">
                                          <button onClick={ changeUser } className="hover:cursor-pointer underline underline-offset-2 text-blue-500 active:text-blue-400">Change user</button>
                                    </div>
                                    <form className="flex flex-col mt-8 grow items-center" onSubmit={ submitNewPassword }>
                                          <div className='flex flex-col w-[95%] pl-5'>
                                                <label htmlFor="usernameInput" className="font-bold text-xl">New password</label>
                                                <input defaultValue={ '' } type="password" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="usernameInput" onChange={ e =>
                                                {
                                                      if (e.target.value === '') setPassword(null);
                                                      else setPassword(e.target.value);
                                                } }></input>
                                                { isPasswordEmpty && <div className={ `flex items-center mb-5 ${ styles.error }` }>
                                                      <AiOutlineCloseCircle />
                                                      <p className='mb-0 ml-2'>New password field is empty!</p>
                                                </div> }
                                                <label htmlFor="passwordInput" className="font-bold text-xl">Confirm new password</label>
                                                <input defaultValue={ '' } type="password" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="passwordInput" onChange={ e =>
                                                {
                                                      if (e.target.value === '') setRepassword(null);
                                                      else setRepassword(e.target.value);
                                                } }></input>
                                                { isRepasswordEmpty && <div className={ `flex items-center mb-5 ${ styles.error }` }>
                                                      <AiOutlineCloseCircle />
                                                      <p className='mb-0 ml-2'>Confirm new password field is empty!</p>
                                                </div> }
                                          </div>
                                          { isPasswordNotMatch && <div className={ `flex items-center mb-5 ${ styles.error }` }>
                                                <AiOutlineCloseCircle />
                                                <p className='mb-0 ml-2'>Passwords are not matched!</p>
                                          </div> }
                                          <Link to='/' className="mx-auto mt-3 text-blue-600 text-xl hover:cursor-pointer active:text-blue-400 mb-5">Back to login</Link>
                                          <input type='submit' value="Continue" className="h-[2.5rem] min-w-[10rem] mt-auto mb-5 text-xl border-2 rounded-md bg-sky-600 text-white hover:cursor-pointer self-center active:bg-sky-700"></input>
                                    </form>
                              </div>
                        </div>
                  }
            </>
      )
}