import { IListingsProps } from '../../interface/listing';
import { formatDate } from '../../utils';

/**
 * render property info
 *
 * @param listing IListingProps
 */
function renderPropertyInfo(listing: IListingsProps) {
  const fields = document.getElementById('property-fields')!;
  fields.innerHTML = `<div class="col-md-6">
    <ul class="list-group list-group-flush">
      <li class="list-group-item res-text-primary">
        <i class="fas fa-money-bill-alt"></i> Asking
        Price:
        <span class="float-right price"
          >Rs. ${listing.price}</span
        >
      </li>
      <li class="list-group-item res-text-primary">
        <i class="fas fa-bed"></i> Bedrooms:
        <span class="float-right bed"
          >${listing.bedrooms}</span
        >
      </li>
      <li class="list-group-item res-text-primary">
        <i class="fas fa-bath"></i> Bathrooms:
        <span class="float-right bath"
          >${listing.bathrooms}</span
        >
      </li>
      <li class="list-group-item res-text-primary">
        <i class="fas fa-car"></i> Garage:
        <span class="float-right garage"
          >${listing.garage}
        </span>
      </li>
    </ul>
  </div>
  <div class="col-md-6">
    <ul class="list-group list-group-flush">
      <li class="list-group-item res-text-primary">
        <i class="fas fa-th-large"></i> Square Feet:
        <span class="float-right sqft"
          >${listing.sqft}</span
        >
      </li>
      <li class="list-group-item res-text-primary">
        <i class="fas fa-square"></i> Lot Size:
        <span class="float-right lot"
          >${listing.lot_size} Acres
        </span>
      </li>
      <li class="list-group-item res-text-primary">
    <i class="fas fa-calendar"></i> Listing Date:
    <span class="float-right list-date">${formatDate(
      listing.created_at
    )}</span>
</li>
      <li class="list-group-item res-text-primary">
        <i class="fas fa-male fa-lg"></i> &nbsp; Realtor:
        <span class="float-right"
          >${listing.realtor.username}
        </span>
      </li>
    </ul>
  </div>`;
}

export default renderPropertyInfo;
