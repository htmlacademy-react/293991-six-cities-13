import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeCity } from "../../store/action";
import { City, CityName } from "../../types/city";
import cn from 'classnames';

type CityTabProps = {
  city: City;
}

function CityTab({city}: CityTabProps):JSX.Element {
  const activeCity = useAppSelector((state) => state.activeCity);
  const dispatch = useAppDispatch();

  const onClickHandler = (clickedCity: City) => () => (dispatch(changeCity(clickedCity)))

  return (
    <li className="locations__item">
      <a className={cn(
          "locations__item-link tabs__item",
          {"tabs__item--active": city.name === activeCity.name}
          )}
          onClick={onClickHandler(city)}>
        <span>{city.name}</span>
      </a>
    </li>
  );
}

export default CityTab;
