import { IListingsProps } from '../../interface/listing';

function renderRealtorContact(listing: IListingsProps) {
  const contactInfo = document.getElementById(
    'realtor-contact-info'
  )!;

  contactInfo.innerHTML = `<div class="col-lg- mt-3">
  <h5>Contact Details</h5>
  <hr />
  <p class="text-muted my-3">
    <i class="fas fa-phone res-text-primary"></i>
    <a href="#" id="r_phone"
      >${listing.realtor.phone}</a
    >
  </p>

  <p class="text-muted my-3">
    <i class="fas fa-envelope-open res-text-primary"></i>
    <a href="#" id="r_email"
      >${listing.realtor.email}</a
    >
  </p>

  <p class="text-muted my-3">
    <i class="fas fa-globe res-text-primary"></i>
    <a href="#" id="r_web"
      >${listing.realtor.website}</a
    >
  </p>
</div>`;
}

export default renderRealtorContact;
