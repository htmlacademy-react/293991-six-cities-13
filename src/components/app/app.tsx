import MainPage from '../../pages/main-page/main-page';

type OffersData = {
  offersCount: number;
}

function App({offersCount}: OffersData): JSX.Element {
  return (
    <MainPage offersCount={offersCount}/>
  );
}

export default App;
