import { OfferDetail } from "../../types/offer";
import OfferImage from "../offer-image/offer-image";

type ImageListProps = {
  offerDetail: OfferDetail;
}

function ImagesList({offerDetail}: ImageListProps):JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {offerDetail.images.map((imageSrc: string) => (<OfferImage key={imageSrc} imageSrc={imageSrc}/>))}
      </div>
    </div>
  );
}

export default ImagesList;
