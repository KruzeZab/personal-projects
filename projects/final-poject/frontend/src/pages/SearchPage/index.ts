import server from '../../axios/server';
import Listing from '../../components/Listing';
import { IQuery } from '../../interface/listing';
import { IListingsResponse } from '../../interface/response';
import { renderListingPagination } from '../../utils';
import Base from '../../utils/Base';

/**
 * Search page
 *
 */
class SearchPage extends Base {
  query: IQuery;
  constructor() {
    super();
    // get search query params
    const urlParams = new URLSearchParams(window.location.search);

    // Construct query object
    this.query = {
      title: urlParams.get('title') || '',
      city: urlParams.get('city') || '',
      state: urlParams.get('state') || '',
      page: Number(urlParams.get('page')) || 1,
    };
    this.render();
  }

  /**
   * fetch listings from the server
   *
   * @returns Listings[]
   */
  async fetchListings() {
    const response = await server.get<IListingsResponse>(
      '/listings/search',
      {
        params: this.query,
      }
    );
    return response.data;
  }

  /**
   * renders the listings
   *
   */
  async renderListings() {
    const listingWrapper = document.getElementById(
      'search-listing'
    ) as HTMLDivElement;

    const listings = await this.fetchListings();

    if (listings.data.length === 0) {
      listingWrapper.innerHTML = '<h1>No Listings Found</h1>';
      return;
    }

    const rendered = listings.data.map((listing) => {
      return Listing(listing);
    });

    listingWrapper.innerHTML = rendered.join(' ');

    renderListingPagination({
      ...this.query,
      ...listings.meta,
    });
  }

  /**
   * main render method
   *
   */
  render() {
    this.renderListings();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new SearchPage();
});
