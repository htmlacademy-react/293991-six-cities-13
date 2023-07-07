import MainScreen from '../../pages/main/main-screen';

type OffersData = {
  offersCount: number;
}

function App({offersCount}: OffersData): JSX.Element {
  return (
    <MainScreen offersCount={offersCount}/>
  );
}

export default App;
