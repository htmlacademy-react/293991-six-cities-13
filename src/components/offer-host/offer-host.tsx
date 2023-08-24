import { memo } from 'react';
import { Person } from '../../types/person';
import { getRandomKey, splitLongTextIntoParagraphs } from '../../utils/utils';
import cn from 'classnames';

type OfferHostProps = {
  description: string;
  host: Person;
}

function _OfferHost({description, host}: OfferHostProps):JSX.Element {
  const paragraphs = splitLongTextIntoParagraphs(description);

  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className={cn(
          'offer__avatar-wrapper user__avatar-wrapper',
          {'offer__avatar-wrapper--pro': host.isPro}
        )}
        >
          <img
            className="offer__avatar user__avatar"
            src={host?.avatarUrl}
            width={74}
            height={74}
            alt="Host avatar"
          />
        </div>
        <span className="offer__user-name">{host?.name}</span>
        {host?.isPro && <span className="offer__user-status">Pro</span>}
      </div>
      <div className="offer__description">
        {paragraphs.map((paragraph: string) => <p className="offer__text" key={getRandomKey()}>{paragraph}</p>)}
      </div>
    </div>
  );
}

const OfferHeader = memo(_OfferHost);
export default OfferHeader;
