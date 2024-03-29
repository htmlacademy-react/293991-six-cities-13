import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { City } from '../../types/city';
import { changeCity } from '../../store/offers-process/offers-process';

type FavoriteLocationCityProps = {
  city: City;
}

function FavoriteLocationCity({city}: FavoriteLocationCityProps):JSX.Element {
  const dispatch = useAppDispatch();

  function handleCityClick() {
    dispatch(changeCity(city));
  }

  return (
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <Link to={AppRoute.Root} className="locations__item-link" onClick={handleCityClick}>
          <span>{city.name}</span>
        </Link>
      </div>
    </div>
  );
}

export default FavoriteLocationCity;
