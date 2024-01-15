import server from '../../axios/server';
import { ROUTES } from '../../constants';
import { IListingsProps } from '../../interface/listing';
import { renderAlert } from '../../utils';

import Base from '../../utils/Base';
import renderCarousel from './renderCarousel';
import renderDescription from './renderDescription';
import renderJumbotron from './renderJumbotron';
import renderMeta from './renderMeta';
import renderPropertyInfo from './renderPropertyInfo';
import renderRealtorContact from './renderRealtorContact';
import renderRealtorInfo from './renderRealtorInfo';

/**
 * Listing Detail
 *
 */
class ListingDetail extends Base {
  listingId: number | undefined;
  listing!: IListingsProps;

  constructor() {
    super();
    this.initialize();
  }

  /**
   * get listing id
   * @returns number | undefined
   */
  getListingId() {
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = Number(urlParams.get('id')) || undefined;
    return listingId;
  }

  /**
   * Initialize basic setup
   */
  async initialize() {
    this.render();
  }

  /**
   * fetch the listing from server
   *
   * @returns Listing
   */
  async fetchListing() {
    const listingId = this.getListingId();
    if (!listingId) return;
    const response = await server.get(`/listings/${listingId}`);
    return response.data;
  }

  /**
   * Delete the listing
   *
   */
  deleteListing = async () => {
    try {
      const listingId = this.getListingId();
      await server.post(`/listings/${listingId}/delete`);
      window.location.href = ROUTES.homePage;
    } catch (error) {
      console.log(error);
      renderAlert('Couldnt delete listing', 'danger');
    }
  };

  /**
   * render the listing details
   * @returns DOM
   */
  async renderListing() {
    const listing = await this.fetchListing();
    this.listing = listing;

    if (!listing) return;
    renderJumbotron(listing);
    renderMeta(listing);
    renderCarousel(listing);
    renderPropertyInfo(listing);
    renderRealtorInfo(listing);
    renderRealtorContact(listing, this.user, this.deleteListing);
    renderDescription(listing);
  }

  /**
   * Main render method
   */
  render() {
    this.renderListing();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new ListingDetail();
});
