import server from '../../axios/server';
import { IQuery } from '../../interface/realtor';
import { IRealtorsResponse } from '../../interface/response';
import { renderRealtorPagination } from '../../utils';
import Base from '../../utils/Base';

/**
 * Realtors Page
 */
class RealtorsPage extends Base {
  query: IQuery;

  constructor() {
    super();
    // Get the url search params
    const urlParams = new URLSearchParams(window.location.search);

    // Construct query
    this.query = {
      username: urlParams.get('username') || '',
      page: Number(urlParams.get('page')) || 1,
    };
    this.initialize();
  }

  /**
   * Initializes our app
   *
   */
  async initialize() {
    this.render();
  }

  /**
   * fetch realtors from the server
   *
   * @returns Realtors[]
   */
  async fetchRealtors() {
    const response = await server.get<IRealtorsResponse>(
      '/realtors/search',
      {
        params: this.query,
      }
    );
    return response.data;
  }

  /**
   * renders realtors
   *
   */
  async renderRealtors() {
    const realtorWrapper = document.getElementById(
      'realtor-wrapper'
    ) as HTMLDivElement;

    const realtors = await this.fetchRealtors();

    if (realtors.data.length === 0) {
      realtorWrapper.innerHTML = '<h1>No Realtors Found</h1>';
      return;
    }

    const rendered = realtors.data.map((realtor) => {
      return `<div class="card my-5 mx-3 listing-list" style="min-width: 18rem">
      <img
        class="card-img-top"
        src="${realtor.photo}"
        alt="Card image cap"
      />
      <div class="card-body text-center">
        <h5 class="card-title text-dark">${realtor.username}</h5>
        <p class="card-text">
          <small class="text-success">
              <i class="fas fa-award"></i>
              Realtor
          </small>
        </p>
        <hr />
        <p class="card-text realtor-contact-info my-1">
        <i class="fas fa-phone res-text-primary"></i>
        ${realtor.phone}
      </p>
      <p class="card-text realtor-contact-info">
      <i class="fas fa-envelope-open res-text-primary"></i>
      ${realtor.email}
  </p>
      </div>
    </div>`;
    });

    realtorWrapper.innerHTML = rendered.join(' ');

    // render pagination
    renderRealtorPagination({
      ...this.query,
      ...realtors.meta,
    });
  }

  /**
   * main redner method
   *
   */
  render() {
    this.renderRealtors();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new RealtorsPage();
});
