import { useState } from "react"
import request from "../../../Tools/request.tool";
import domain from "../../../config/serverDomain.config";
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './Recovery.module.css';
import { Modal } from "flowbite-react";
import { Helmet } from "react-helmet";

export default function RecoveryComponent(): JSX.Element
{
      const Navigate: NavigateFunction = useNavigate();

      const [email, setEmail] = useState<string | null>(null);
      const [password, setPassword] = useState<string | null>(null);
      const [repassword, setRepassword] = useState<string | null>(null);

      const [emailFound, setEmailFound] = useState<boolean>(true);
      const [isPasswordEmpty, setIsPasswordEmpty] = useState<boolean>(false);
      const [isPasswordNotMatch, setIsPasswordNotMatch] = useState<boolean>(false);
      const [isRepasswordEmpty, setIsRepasswordEmpty] = useState<boolean>(false);
      const [validateMode, setValidateMode] = useState<boolean>(true);
      const [showPopUp, setShowPopUp] = useState<boolean>(false);

      function submitValidation(e: FormEvent): void
      {
            e.preventDefault();
            setEmailFound(true);

            if (email && email !== '')
                  request.get(`${ domain }/recoveryValidation?email=${ email }`)
                        .then(res =>
                        {
                              if (res.data.found)
                              {
                                    setValidateMode(false);
                              }
                              else
                                    setEmailFound(false);
                        })
                        .catch(err => console.error(err));
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
                  request.put(`${ domain }/recoveryNewPassword`, { params: { email: email, password: password } }, { headers: { 'Content-Type': 'application/json' } })
                        .then(res =>
                        {
                              setShowPopUp(true)
                        })
                        .catch(err => console.log(err));
            }
      }

      function changeUser(): void
      {
            setEmail(null);
            setPassword(null);
            setRepassword(null);
            setIsPasswordEmpty(false);
            setIsPasswordNotMatch(false);
            setIsRepasswordEmpty(false);
            setValidateMode(true);
      }

      return (
            <>
                  <Helmet>
                        <title>Recovery</title>
                        <meta name="author" content="Nghia Duong"></meta>
                        <meta name="description" content="Change user password"></meta>
                  </Helmet>
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
                                                <label id="emailInputLabel" htmlFor="emailInput" className="font-bold text-xl">Email</label>
                                                <input required defaultValue={ '' } type="email" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="emailInput" name="emailInputField" onChange={ e => setEmail(e.target.value) }></input>
                                          </div>
                                          { !emailFound && <div className={ `flex items-center ${ styles.error }` }>
                                                <AiOutlineCloseCircle />
                                                <p className='mb-0 ml-2' id="error_message_1">Email not found!</p>
                                          </div> }
                                          <Link id="back_to_login_1" to='/' className="mx-auto mt-3 text-blue-600 text-xl hover:cursor-pointer active:text-blue-400 mb-5">Back to login</Link>
                                          <input id="continue_1" type='submit' value="Continue" className="h-[2.5rem] min-w-[10rem] mt-auto mb-5 text-xl border-2 rounded-md bg-sky-600 text-white hover:cursor-pointer self-center active:bg-sky-700"></input>
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
                                                <label htmlFor="emailInput" className="font-bold text-xl">New password</label>
                                                <input defaultValue={ '' } type="password" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="emailInput" onChange={ e =>
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