import { IListingsProps } from '../../interface/listing';

function renderRealtorInfo(listing: IListingsProps) {
  const realtorInfo = document.getElementById('realtor-info')!;
  realtorInfo.innerHTML = `<div class="card">
    <img
      class="card-img-top"
      src=""
      alt="Card image cap"
      height="200px"
      class="r_photo_main"
    />
    <div class="card-body text-center">
      <h5 class="card-title mb-1" id="r_name">
        ${listing.realtor.username}
      </h5>
      <p class="card-text text-success m-0">
        <i class="fas fa-award"></i> Realtor
      </p>
    </div>
  </div>`;
}

export default renderRealtorInfo;
