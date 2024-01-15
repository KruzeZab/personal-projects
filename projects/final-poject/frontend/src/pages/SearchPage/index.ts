import server from '../../axios/server';
import Listing from '../../components/Listing';
import { IQuery } from '../../interface/listing';
import { IListingsResponse } from '../../interface/response';
import { renderListingPagination } from '../../utils';
import Base from '../../utils/Base';

class SearchPage extends Base {
  query: IQuery;
  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);

    this.query = {
      title: urlParams.get('title') || '',
      city: urlParams.get('city') || '',
      state: urlParams.get('state') || '',
      page: Number(urlParams.get('page')) || 1,
    };
    this.render();
  }

  async fetchListings() {
    const response = await server.get<IListingsResponse>(
      '/listings/search',
      {
        params: this.query,
      }
    );
    return response.data;
  }

  async renderListings() {
    const listingWrapper = document.getElementById(
      'search-listing'
    ) as HTMLDivElement;

    const listings = await this.fetchListings();

    const rendered = listings.data.map((listing) => {
      return Listing(listing);
    });

    listingWrapper.innerHTML = rendered.join(' ');

    renderListingPagination({
      ...this.query,
      ...listings.meta,
    });
  }

  render() {
    this.renderListings();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new SearchPage();
});
