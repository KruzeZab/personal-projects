import server from '../../axios/server';
import { IQuery } from '../../interface/realtor';
import { IRealtorsResponse } from '../../interface/response';
import { renderRealtorPagination } from '../../utils';
import Base from '../../utils/Base';

class RealtorsPage extends Base {
  query: IQuery;

  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);

    this.query = {
      username: urlParams.get('username') || '',
      page: Number(urlParams.get('page')) || 1,
    };
    this.initialize();
  }

  async initialize() {
    this.render();
  }

  async fetchRealtors() {
    const response = await server.get<IRealtorsResponse>(
      '/realtors/search',
      {
        params: this.query,
      }
    );
    return response.data;
  }

  async renderRealtors() {
    const realtorWrapper = document.getElementById(
      'realtor-wrapper'
    ) as HTMLDivElement;

    const realtors = await this.fetchRealtors();

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

    renderRealtorPagination({
      ...this.query,
      ...realtors.meta,
    });
  }

  render() {
    this.renderRealtors();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new RealtorsPage();
});
