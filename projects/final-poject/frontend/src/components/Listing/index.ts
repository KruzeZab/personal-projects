import { ROUTES } from '../../constants';
import { IListingsProps } from '../../interface/listing';

/**
 * render the listing item into the DOM
 *
 * @param props IListingProps
 * @returns DOM
 */
function Listing(props: IListingsProps) {
  const {
    title,
    photo_1,
    price,
    bedrooms,
    bathrooms,
    sqft,
    garage,
    city,
    state,
    zipcode,
    id,
  } = props;

  return `<div class="col-md-6 col-lg-4 mt-5" style="min-width: 21rem">
  <div class="card">
      <div class="card-img-wrapper">
          <img class="card-img-top" src="${photo_1}" alt="house image" width="200px" height="200px">
      </div>
      <div class="card-img-overlay">
          <h3 class="card-title">
              <span class="badge listing-pricing">
                  Rs. ${price}
              </span>
          </h3>
      </div>
  <div class="card-body">
      <a href="${ROUTES.ListingDetailPage}?id=${id}" class="stretched-link">
          <h4 class="card-title text-center res-text-primary">
              ${title}
          </h4>
      </a>
      
      <p class="card-text text-center">
          <i class="fas fa-map-marker-alt res-text-primary"></i>
          ${city} ${state}, ${zipcode}
      </p>
      <hr />
      <p class="card-text">
          <div class="row">
              <div class="col-6">
                      <i class="fas fa-bed res-text-primary"></i>
                      Bed: 
                      <span class="res-text-primary">
                          ${bedrooms}
                      </span>
              </div>
              <div class="col-6">
                  <i class="fas fa-bath res-text-primary"></i>
                  Bath: 
                  <span class="res-text-primary">
                      ${bathrooms}
                  </span>
              </div>
          </div>
          <div class="row mt-3">
              <div class="col-6">
                  <i class="fas fa-car res-text-primary"></i>
                  Garage: 
                  <span class="res-text-primary">
                      ${garage}
                  </span>
              </div>
              <div class="col-6">
                  <i class="fas fa-th-large res-text-primary"></i>
                  Sqft: 
                  <span class="res-text-primary">
                      ${sqft}
                  </span>
              </div>
          </div>
      </p>
  </div>
  </div>  
</div>`;
}

export default Listing;
