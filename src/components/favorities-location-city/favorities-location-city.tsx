import { Link } from "react-router-dom";
import { AppRoute } from "../../const";
import { changeCity } from "../../store/action";
import { useAppDispatch } from "../../hooks";
import { City } from "../../types/city";

type FavoriteLocationCityProps = {
  city: City;
}

function FavoriteLocationCity({city}: FavoriteLocationCityProps):JSX.Element {
  const dispatch = useAppDispatch();

  function onClickHandler() {
    dispatch(changeCity(city));
  }
  
  return (
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <Link to={AppRoute.Root} className="locations__item-link" onClick={onClickHandler}>
          <span>{city.name}</span>
        </Link>
      </div>
    </div>
  );
}

export default FavoriteLocationCity;
