import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import styles from './not-found-page.module.css';
import PageHeader from '../../components/page-header/page-header';

function NotFoundPage(): JSX.Element {
  return (
    <div className={`page ${styles.notFoundPage}`}>
      <Helmet>
        <title>6 cities. Page not found</title>
      </Helmet>
      <PageHeader/>
      <h1 className={styles.title}>404 Not Found</h1>
      <p className={styles.text}>
        Return to the {' '}
        <Link to={AppRoute.Root} className={styles.link}>main page</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
