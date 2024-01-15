import server from '../axios/server';
import { ROUTES } from '../constants';
import { IListingPagination } from '../interface/listing';
import { IRealtorPagination } from '../interface/realtor';

/**
 * render header element
 * @param user
 *
 */
export function renderHeader(user: any) {
  const navContainer = document.getElementById(
    'nav-container'
  ) as HTMLDivElement;
  navContainer.innerHTML = `<nav
  class="navbar navbar-expand-lg navbar-light fixed-top bg-white p-0 shadow"
>
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style="border: none"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- logo -->
        <a
          class="navbar-brand text-dark ml-auto mr-4"
          href="/index.html"
        >
          <img
            src="/assets/home.svg"
            alt="brand-logo"
            width="40px"
            height="40px"
          />
          <strong>
            REAL
            <span class="res-text-primary">ESTATE</span>
          </strong>
        </a>

        <!-- Login and Register -->
        ${
          !!!user
            ? `<div class="d-flex order-lg-1 ml-auto mr-4 right-side">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
              class="nav-link res-text-primary res-login"
              href="/src/pages/LoginPage/index.html"
            >
              <i class="far fa-user fa-lg text-secondary"></i>
              &nbsp; <span class="d-none d-lg-inline">Log In</span>
            </a>
          </li>

          <li class="nav-item d-none d-lg-inline">
            <a class="nav-link res-register" href="/src/pages/SignupPage/index.html"
              >Register</a
            >
          </li>
        </ul>
      </div>`
            : ''
        }
        ${
          !!user
            ? `
        <div class="d-flex order-lg-1 ml-auto mr-4 right-side">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
            href=""
              id="logout-btn"
              class="nav-link res-text-primary res-login"
            >
              <i class="far fa-user d-none d-lg-inline fa-lg text-secondary"></i>
              &nbsp; <span class="">Log Out</span>
            </a>
          </li>
        </ul>
      </div>
        `
            : ''
        }


        <!-- Collapse item -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a
                class="nav-link"
                href="/index.html"
              >
                Home
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="/src/pages/AboutPage/index.html"
              >
                About Us
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="/src/pages/RealtorsPage/index.html"
                >Realtors</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="/src/pages/SearchPage/index.html?page=1&city=&state=&title="
                >Listings</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="/src/pages/ContactPage/index.html"
                >Contact Us</a
              >
            </li>
            ${
              !!user
                ? `
          <li class="nav-item">
          <a
            class="nav-link"
            href="/src/pages/AddListingPage/index.html"
            >Add Listing</a
          >
        </li>
          `
                : ''
            }
            <!--  -->
          </ul>
        </div>
      </div>
    </nav>`;
}

/**
 * renders the footer
 *
 */
export function renderFooter() {
  const footerContainer = document.getElementById(
    'footer-container'
  ) as HTMLDivElement;
  footerContainer.innerHTML = `<footer class="main-footer res-bg-secondary text-center text-white">
    <div class="container p-3" style="font-size: 19px;">
    <img
      src="/assets/home.svg"
      alt="brand-logo"
      width="30px"
      height="30px"
    />
          Copyright &copy; 2024. All rights reserved
    </div>
  </footer>`;
}

/**
 * render alert
 *
 * @param message string
 * @param level string
 */
export function renderAlert(message: string = '', level = 'info') {
  const messageContainer = document.getElementById(
    'message-container'
  )!;
  messageContainer.innerHTML = `<div id="message" class="container" style="z-index: 999 !important">
        <div
          class="alert alert-${level} text-center"
          role="alert"
          id="alert"
        >
          ${message}
        </div>
      </div>`;
}

/**
 * renders the pagination for listing
 *
 * @param query query object containing pagination details
 */
export function renderListingPagination(query: IListingPagination) {
  const page = Number(query.page);
  const size = Number(query.size);
  const total = Number(query.total);
  const paginationEl = document.getElementById('pagination')!;

  // Calculate total number of pages
  const totalPages = Math.ceil(total / size);

  // Clear existing pagination links

  // Create Pagination Links
  for (let i = 1; i <= totalPages; i++) {
    paginationEl.innerHTML += `
    <li class="page-item ${
      i === page ? 'disabled' : ''
    }"><a class="page-link" href="${
      ROUTES.listingsPage
    }?page=${i}&title=${query.title}&city=${query.city}&state=${
      query.state
    }">${i}</a></li>`;
  }
}

/**
 * renders the pagination for realtors
 *
 * @param query query object containing pagination details
 */
export function renderRealtorPagination(query: IRealtorPagination) {
  const page = Number(query.page);
  const size = Number(query.size);
  const total = Number(query.total);
  const paginationEl = document.getElementById('pagination')!;

  // Calculate total number of pages
  const totalPages = Math.ceil(total / size);

  // Clear existing pagination links

  // Create Pagination Links
  for (let i = 1; i <= totalPages; i++) {
    paginationEl.innerHTML += `
    <li class="page-item ${
      i === page ? 'disabled' : ''
    }"><a class="page-link" href="${
      ROUTES.realtorsPage
    }?page=${i}&username=${query.username}">${i}</a></li>`;
  }
}

/**
 * get the auth tokens from local storage
 *
 * @returns tokens{} or null
 */
export function getAuthTokens() {
  const tokens = localStorage.getItem('authTokens');
  if (!tokens) return null;
  return JSON.parse(tokens);
}

/**
 * check the access token from the server
 *
 * @param accessToken string
 * @returns User
 */
export async function checkUser(accessToken: string) {
  const response = await server.get('/realtors/detail', {
    params: {
      accessToken,
    },
  });
  return response.data;
}

/**
 * formats the date into readable format
 *
 * @param dateString string
 * @returns date object
 */
export function formatDate(dateString: string) {
  const dateObject = new Date(dateString);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return dateObject.toLocaleDateString(undefined, options);
}

/**
 * logs out the user by clearing token
 *
 * @param e Event
 */
export function logout(e: Event) {
  e.preventDefault();
  localStorage.removeItem('authTokens');
  window.location.href = '/src/pages/LoginPage/index.html';
}
