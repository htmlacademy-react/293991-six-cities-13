import { OfferDetail } from "../../types/offer";
import { getRandomKey, splitLongTextIntoParagraphs } from "../../utils/utils";

type OfferHostProps = {
  offerDetail: OfferDetail;
}

function OfferHost({offerDetail}: OfferHostProps):JSX.Element {
  const paragraphs = splitLongTextIntoParagraphs(offerDetail.description)

  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
          <img
            className="offer__avatar user__avatar"
            src={offerDetail.host.avatarUrl}
            width={74}
            height={74}
            alt="Host avatar"
          />
        </div>
        <span className="offer__user-name">{offerDetail.host.name}</span>
        {offerDetail.host.isPro && <span className="offer__user-status">Pro</span>}
      </div>
      <div className="offer__description">
        {paragraphs.map((paragraph: string) => <p className="offer__text" key={getRandomKey()}>{paragraph}</p>)}
      </div>
    </div>
  );
}
export default OfferHost;
