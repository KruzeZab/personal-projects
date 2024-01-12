import server from '../../axios/server';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Listing from '../../components/Listing';
import {
  IListingsResponse,
  IRealtorsResponse,
} from '../../interface/response';

class Home {
  constructor() {
    this.render();
  }

  async fetchListings() {
    const response = await server.get<IListingsResponse>(
      '/listings',
      {
        params: {
          size: 3,
        },
      }
    );
    return response.data;
  }

  async fetchRealtors() {
    const response = await server.get<IRealtorsResponse>(
      '/realtors',
      {
        params: {
          size: 3,
        },
      }
    );
    return response.data;
  }

  _renderLayout() {
    const navContainer = document.getElementById(
      'nav-container'
    ) as HTMLDivElement;

    const footerContainer = document.getElementById(
      'footer-container'
    ) as HTMLDivElement;
    navContainer.innerHTML = Header();
    footerContainer.innerHTML = Footer();
  }

  async _renderListings() {
    const listingWrapper = document.getElementById(
      'listing-wrapper'
    ) as HTMLDivElement;

    const listings = await this.fetchListings();

    const rendered = listings.data.map((listing) => {
      return Listing(listing);
    });

    listingWrapper.innerHTML = rendered.join(' ');
  }

  async _renderRealtor() {
    const realtorWrapper = document.getElementById(
      'realtor-wrapper'
    ) as HTMLDivElement;

    const realtors = await this.fetchRealtors();

    const rendered = realtors.data.map((realtor) => {
      return `<div class="col-md-6 col-lg-4 text-center mt-5">
      <img src="${realtor.photo.src}" alt="realtor" width="80%" height="250px" />
      <h4 class="mt-2">${realtor.username}</h4>
      <p class="text-success">
        <i class="fas fa-award"></i>
        Realtor
      </p>
      <hr />
      <p>
        <i class="fas fa-phone res-text-primary"></i>
        ${realtor.phone}
      </p>
      <p>
        <i class="fas fa-envelope-open res-text-primary"></i>
        ${realtor.email}
      </p>
    </div>`;
    });

    realtorWrapper.innerHTML = rendered.join(' ');
  }

  render() {
    this._renderLayout();
    this._renderListings();
    this._renderRealtor();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new Home();
});
