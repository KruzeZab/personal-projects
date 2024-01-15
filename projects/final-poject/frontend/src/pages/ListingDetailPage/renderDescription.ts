import { IListingsProps } from '../../interface/listing';

/**
 * render the description
 *
 * @param listing IListingProps
 */
function renderDescription(listing: IListingsProps) {
  const propertyMeta = document.getElementById(
    'listing-description'
  )!;

  propertyMeta.innerHTML = listing.description;
}

export default renderDescription;
