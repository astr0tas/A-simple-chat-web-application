import { Link } from 'react-router-dom';

function submitForm(): void
{

}

export default function LoginComponent(): JSX.Element
{
      return (
            <div className="w-full h-full flex flex-col bg-yellow-100 p-[5px] overflow-auto">
                  <div className='m-auto w-[90%] max-w-[25rem] h-[100%] min-h-[25rem] max-h-[35rem] bg-slate-50 rounded-xl border border-solid border-gray-400 flex flex-col'>
                        <div className='w-full px-5 mb-3'>
                              <div className='border-b-2 border-gray-400 w-full flex pb-3'>
                                    <h2 className="mx-auto text-4xl mt-3">Login</h2>
                              </div>
                        </div>
                        <form className="flex flex-col mt-10 grow" onSubmit={ submitForm }>
                              <div className='flex flex-col w-[95%] pl-5'>
                                    <label htmlFor="usernameInput" className="font-bold text-xl">Username</label>
                                    <input defaultValue={ '' } type="text" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="usernameInput"></input>
                                    <label htmlFor="passwordInput" className="font-bold text-xl">Password</label>
                                    <input defaultValue={ '' } type="password" className="my-2 text-xl border pl-2 border-gray-500 rounded-md h-[2.5rem]" id="passwordInput"></input>
                              </div>
                              <Link to='#' className="mx-auto mt-3 text-blue-600 text-xl hover:cursor-pointer active:text-blue-400 mb-5">Forgot password?</Link>
                              <input type='submit' value="Continue" className="h-[2.5rem] min-w-[10rem] mt-auto mb-5 text-xl border-2 rounded-md bg-sky-600 text-white hover:cursor-pointer self-center active:bg-sky-700"></input>
                        </form>
                  </div>
            </div>
      )
}