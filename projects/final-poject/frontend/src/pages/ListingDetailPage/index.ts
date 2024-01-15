import server from '../../axios/server';
import { IListingsProps } from '../../interface/listing';

import Base from '../../utils/Base';
import renderCarousel from './renderCarousel';
import renderJumbotron from './renderJumbotron';
import renderMeta from './renderMeta';
import renderPropertyInfo from './renderPropertyInfo';
import renderRealtorContact from './renderRealtorContact';
import renderRealtorInfo from './renderRealtorInfo';

class ListingDetail extends Base {
  listingId: number | undefined;
  listing!: IListingsProps;

  constructor() {
    super();
    this.initialize();
  }

  getListingId() {
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = Number(urlParams.get('id')) || undefined;
    return listingId;
  }

  async initialize() {
    this.render();
  }

  async fetchListing() {
    const listingId = this.getListingId();
    if (!listingId) return;
    const response = await server.get(`/listings/${listingId}`);
    return response.data;
  }

  async renderListing() {
    const listing = await this.fetchListing();
    this.listing = listing;

    if (!listing) return;
    renderJumbotron(listing);
    renderMeta(listing);
    renderCarousel(listing);
    renderPropertyInfo(listing);
    renderRealtorInfo(listing);
    renderRealtorContact(listing);
  }

  render() {
    this.renderListing();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new ListingDetail();
});
