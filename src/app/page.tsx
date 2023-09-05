metadata.title = "Login";
metadata.description = "Enter username and password to continue";

import { metadata } from './layout';
import LoginForm from './loginForm';

export default function Login()
{
      return (
            <div className="w-full h-full flex flex-col bg-yellow-100 p-[5px] overflow-auto">
                  <div className='m-auto w-[90%] max-w-[25rem] h-[100%] min-h-[25rem] max-h-[35rem] bg-slate-50 rounded-xl border border-solid border-gray-400 flex flex-col'>
                        <div className='w-full px-5 mb-3'>
                              <div className='border-b-2 border-gray-400 w-full flex pb-3'>
                                    <h2 className="mx-auto text-4xl mt-3">Login</h2>
                              </div>
                        </div>
                        <LoginForm />
                  </div>
            </div>
      )
}