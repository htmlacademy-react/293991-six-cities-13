import { KeyboardEvent, memo, useState } from 'react';
import { SORT_TYPES, SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSortType } from '../../store/action';
import cn from 'classnames';

function OffersSorting(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const currentSortType = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();

  const onClickHandler = (sortType: SortType) => () => (dispatch(changeSortType(sortType)));

  function onKeydownHandler(evt: KeyboardEvent<HTMLFormElement>) {
    if (evt.key === 'Escape' && isOpened) {
      evt.preventDefault();
      setIsOpened(false);
    }
  }

  function onClickHandlerMenu() {
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
      onKeyDown={onKeydownHandler}
      onClick={onClickHandlerMenu}
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
              onClick={onClickHandler(sortType)}
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

export default memo(OffersSorting);
