import { IListingsProps } from '../../interface/listing';

function Listing(props: IListingsProps) {
  const { title, photos, price, bedrooms, bathrooms, sqft, garage } =
    props;

  return `<div class="col-sm-6 col-lg-4 mb-4"><div class="card">
  <div class="card-img-wrapper">
    <img
      class="card-img-top"
      src="${photos[0]?.src}"
      alt="house image"
      width="200px"
      height="200px"
    />
  </div>
  <div class="card-img-overlay">
    <a
      href=""
      class="stretched-link"
    >
      <h3 class="card-title">
        <span class="badge listing-pricing">
          Rs. ${price}
        </span>
      </h3>
    </a>
  </div>
  <div class="card-body">
    <h4 class="card-title text-center res-text-primary">
      ${title}
    </h4>
    <p class="card-text text-center">
      <i
        class="fas fa-map-marker-alt res-text-primary"
      ></i>
      list
    </p>
    <hr />
    <p class="card-text">
      <div class="row">
        <div class="col-6">
          <i class="fas fa-bed res-text-primary"></i>
          Bed: 
          <span class="res-text-primary">
              ${bedrooms} bedrooms
          </span>
        </div>
        <div class="col-6">
          <i class="fas fa-bath res-text-primary"></i>
          Bath: 
          <span class="res-text-primary">
             ${bathrooms} bathrooms
          </span>
      </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
            <i class="fas fa-car res-text-primary"></i>
            Garage: 
            <span class="res-text-primary">
                ${garage} garage
            </span>
        </div>
        <div class="col-6">
            <i class="fas fa-th-large res-text-primary"></i>
            Sqft: 
            <span class="res-text-primary">
                ${sqft} sqft
            </span>
        </div>
    </div>
    </p>
  </div>
</div></div>`;
}

export default Listing;
