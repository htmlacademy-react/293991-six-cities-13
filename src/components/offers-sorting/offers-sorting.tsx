import { SORT_TYPES, SortType } from "../../const";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeSortType } from "../../store/action";
import cn from 'classnames';

function OffersSorting(): JSX.Element {
  const currentSortType = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();

  const onClickHandler = (sortType: SortType) => () => (dispatch(changeSortType(sortType)));

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {currentSortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {SORT_TYPES.map((sortType: SortType) => 
          <li
            className={cn(
              'places__option',
              {'places__option--active': sortType == currentSortType}
            )}
            tabIndex={0}
            onClick={onClickHandler(sortType)}
            key={sortType}
          >
            {sortType}
          </li>
        )}
      </ul>
    </form>
  );
}

export default OffersSorting;
