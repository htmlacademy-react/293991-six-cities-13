import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';
import { City } from '../../types/city';
import cn from 'classnames';

type CityTabProps = {
  city: City;
}

function CityTab({city}: CityTabProps):JSX.Element {
  const activeCity = useAppSelector((state) => state.activeCity);
  const dispatch = useAppDispatch();

  const handleTabClick = (clickedCity: City) => () => (clickedCity !== activeCity ? dispatch(changeCity(clickedCity)) : null);

  return (
    <li className="locations__item">
      <a className={cn(
        'locations__item-link tabs__item',
        {'tabs__item--active': city.name === activeCity.name}
      )}
      onClick={handleTabClick(city)}
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
}

export default CityTab;
