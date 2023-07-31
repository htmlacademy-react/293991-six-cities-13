import { CityName } from '../../types/city';
import CityTab from '../city-tab/city-tab';

type CitiesListProps = {
  cities: CityName[];
}

function CitiesTabList({cities}: CitiesListProps):JSX.Element {
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((cityName: CityName) => (
              <CityTab key={cityName} cityName={cityName}/>
            ))}
          </ul>
        </section>
      </div>
      </>
  );
}

export default CitiesTabList;
