import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities. Page not found</title>
      </Helmet>
      <h1>404 Not Found</h1>
      <Link to="/">Go to main page</Link>
    </>
  );
}

export default NotFoundPage;
