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
        <h1 className='text-9xl max-[600px]:text-6xl'>Error 404</h1>
        <h5 className="text-5xl text-center max-[600px]:text-3xl">The page you are seeking is no where to be found!</h5>
      </div>
      </>
  )
}