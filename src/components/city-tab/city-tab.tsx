import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeCity } from "../../store/action";
import { CityName } from "../../types/city";
import cn from 'classnames';

type CityTabProps = {
  cityName: CityName;
}

function CityTab({cityName}: CityTabProps):JSX.Element {
  const activeCity = useAppSelector((state) => state.activeCity);
  const dispatch = useAppDispatch();

  const onClickHandler = (clickedCity: CityName) => () => (dispatch(changeCity(clickedCity)))

  return (
    <li className="locations__item">
      <a className={cn(
          "locations__item-link tabs__item",
          {"tabs__item--active": cityName === activeCity}
          )}
          onClick={onClickHandler(cityName)}>
        <span>{cityName}</span>
      </a>
    </li>
  );
}

export default CityTab;