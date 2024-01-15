import { IListingsProps } from '../../interface/listing';

/**
 * render contact info
 *
 * @param listing IListingProps
 * @param user
 * @param deleteListing () => Promise<void>
 */
function renderRealtorContact(
  listing: IListingsProps,
  user: any,
  deleteListing: () => Promise<void>
) {
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
  ${
    listing.realtor.id === user.id
      ? `<button class="btn btn-danger btn-block mb-4" id="delete-listing">
        Delete Listing
      </button>`
      : ''
  }
  
</div>`;

  // Attach a click event listener to the dynamically created button
  if (listing.realtor.id === user.id) {
    const deleteButton = contactInfo.querySelector('#delete-listing');
    deleteButton?.addEventListener('click', deleteListing);
  }
}

export default renderRealtorContact;
