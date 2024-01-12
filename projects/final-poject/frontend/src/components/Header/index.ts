function Header(authenticated: boolean = false) {
  return `
      <nav
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
            href=""
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
          <div class="d-flex order-lg-1 ml-auto mr-4 right-side">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a
                  class="nav-link res-text-primary res-login"
                  href=""
                >
                  <i class="far fa-user fa-lg text-secondary"></i>
                  &nbsp; <span class="d-none d-lg-inline">Log In</span>
                </a>
              </li>
  
              <li class="nav-item d-none d-lg-inline">
                <a class="nav-link res-register" href=""
                  >Register</a
                >
              </li>
            </ul>
          </div>
          <!-- <div class="d-flex order-lg-1 ml-auto mr-4 right-side">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a
                  href=""
                  class="nav-link res-text-primary res-login"
                >
                  <i class="far fa-user d-none d-lg-inline fa-lg text-secondary"></i>
                  &nbsp; <span class="">Log Out</span>
                </a>
              </li>
            </ul>
          </div> -->
  
  
          <!-- Collapse item -->
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  href=""
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href=""
                >
                  About Us
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="realtors:index"
                  >Realtors</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href=""
                  >Listings</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href=""
                  >Contact Us</a
                >
              </li>
              <!-- <li class="nav-item">
                <a
                  class="nav-link"
                  href=""
                  >Dashboard</a
                >
              </li> -->
            </ul>
          </div>
        </div>
      </nav>`;
}

export default Header;
