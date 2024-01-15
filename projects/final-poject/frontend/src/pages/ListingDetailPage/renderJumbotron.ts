import { IListingsProps } from '../../interface/listing';

/**
 * render the jumbotron
 *
 * @param listing IListingProps
 */
function renderJumbotron(listing: IListingsProps) {
  const jumbotron = document.getElementById('jumbotron')!;
  jumbotron.innerHTML = `<section id="showcase">
  <div
    id="res-showcase"
    class="jumbotron jumbotron-fluid home-listing"
  >
    <div class="container res-showcase-content mt-4">
      <h1 class="display-3">
        <strong class="title">${listing.title}</strong>
      </h1>
      <p class="mt-3" style="font-size: 32px">
        <i class="fas fa-map-marker-alt res-text-primary"></i>
        <span class="city">${listing.city}</span>, <span class="state">${listing.state}</span>,
        <span class="zipcode">${listing.zipcode}</span>
      </p>
    </div>
  </div>
</section>`;
}

export default renderJumbotron;
