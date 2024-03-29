import { KeyboardEvent, memo, useState } from 'react';
import { SORT_TYPES, SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import cn from 'classnames';
import { getSortType } from '../../store/offers-process/selectors';
import { changeSortType } from '../../store/offers-process/offers-process';

function _OffersSorting(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const currentSortType = useAppSelector(getSortType);
  const dispatch = useAppDispatch();

  const handleSortClick = (sortType: SortType) => () => (dispatch(changeSortType(sortType)));

  function handleSortMenuKeyDown(evt: KeyboardEvent<HTMLFormElement>) {
    if (evt.key === 'Escape' && isOpened) {
      evt.preventDefault();
      setIsOpened(false);
    }
  }

  function handleSortMenuClick() {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  }

  const iconStyle = {
    transform: `translateY(-50%) ${isOpened ? 'rotate(180deg)' : ''}`,
  };

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onKeyDown={handleSortMenuKeyDown}
      onClick={handleSortMenuClick}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {currentSortType}
        <svg
          className="places__sorting-arrow"
          width={7}
          height={4}
          style={iconStyle}
        >
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={cn(
        'places__options places__options--custom',
        {'places__options--opened': isOpened}
      )}
      >
        {SORT_TYPES.map((sortType: SortType) =>
          (
            <li
              className={cn(
                'places__option',
                {'places__option--active': sortType === currentSortType}
              )}
              tabIndex={0}
              onClick={handleSortClick(sortType)}
              key={sortType}
            >
              {sortType}
            </li>
          )
        )}
      </ul>
    </form>
  );
}

const OffersSorting = memo(_OffersSorting);
export default OffersSorting;
