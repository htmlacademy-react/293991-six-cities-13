import styles from './loading-spinner.module.css';

function LoadingSpinner():JSX.Element {
  return (
    <span className={styles.loader}></span>
  );
}

export default LoadingSpinner;
