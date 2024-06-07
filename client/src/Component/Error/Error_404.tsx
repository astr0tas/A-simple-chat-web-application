import { Helmet } from 'react-helmet';

export default function Error404(): JSX.Element
{
  return (
    <>
      <Helmet>
        <title>Page not found!</title>
        <meta name="author" content="Nghia Duong"></meta>
        <meta name="description" content="Error 404 - Page Not Found"></meta>
      </Helmet>
      <div className="h-full w-full flex flex-col items-center justify-center">
        <h1 className='text-6xl'>Error 404</h1>
        <h5 className="text-lg text-center">The page you are seeking does not exist!</h5>
      </div>
    </>
  )
}