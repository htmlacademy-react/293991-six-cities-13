type TFavoriteLocationCityProps = {
  city: string;
}

function FavoriteLocationCity({city}: TFavoriteLocationCityProps):JSX.Element {
  return (
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="#">
          <span>{city}</span>
        </a>
      </div>
    </div>
  );
}

export default FavoriteLocationCity;
