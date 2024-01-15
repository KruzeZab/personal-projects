import { IListingsProps } from '../../interface/listing';

/**
 * render meta info
 *
 * @param listing IListingProps
 */
function renderMeta(listing: IListingsProps) {
  const propertyMeta = document.getElementById('property-meta')!;

  propertyMeta.innerHTML = `<h2 class="title"></h2>
  <p class="res-text-primary">
    <i class="fas fa-map-marker-alt res-text-primary"></i>
    <span class="city">${listing.city}</span>, <span class="state">${listing.state}</span>,
    <span class="zipcode">${listing.zipcode}</span>
  </p>`;
}

export default renderMeta;
