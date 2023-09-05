'use client';

import Link from "next/link";
import { useState } from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai';

function submitForm(e: any)
{
      e.preventDefault();
}

export default async function LoginForm()
{
      const [isWrong, setIsWrong] = useState(true);

      return (
            <form className="flex flex-col mt-10 grow" onSubmit={ submitForm }>
                  <div className='flex flex-col w-[95%] pl-5'>
                        <label htmlFor="usernameInput" className="font-bold text-xl">Username</label>
                        <input defaultValue={ '' } type="text" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="usernameInput"></input>
                        <label htmlFor="passwordInput" className="font-bold text-xl">Password</label>
                        <input defaultValue={ '' } type="password" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="passwordInput"></input>
                        { isWrong && <div className="self-center flex items-center text-red-500">
                              <AiOutlineCloseCircle className="mr-1"/>
                              <p>Username or password incorrect!</p>
                        </div> }
                  </div>
                  <Link href='#' className="mx-auto mt-3 text-blue-600 text-xl hover:cursor-pointer active:text-blue-400 mb-5">Forgot password?</Link>
                  <input type='submit' value="Continue" className="h-[2.5rem] min-w-[10rem] mt-auto mb-5 text-xl border-2 rounded-md bg-sky-600 text-white hover:cursor-pointer self-center active:bg-sky-700"></input>
            </form>
      )
}