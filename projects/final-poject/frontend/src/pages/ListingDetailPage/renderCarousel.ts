import { IListingsProps } from '../../interface/listing';

/**
 * render the carousel
 *
 * @param listing IListingProps
 */
function renderCarousel(listing: IListingsProps) {
  const carousel = document.getElementById('carousel')!;

  carousel.innerHTML = `
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-ride="carousel"
    >
      <div class="carousel-inner">
      ${
        listing.photo_1
          ? `<div class="carousel-item active">
      <img
        class="d-block w-100"
        src="${listing.photo_1}"
        alt="First slide"
        height="400px"
      />
    </div>`
          : ''
      }
        
        ${
          listing.photo_2
            ? `<div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="${listing.photo_1}"
                  alt="Second slide"
                  height="400px"
                />
              </div>`
            : ''
        }
        ${
          listing.photo_3
            ? `<div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="${listing.photo_2}"
                  alt="Second slide"
                  height="400px"
                />
              </div>`
            : ''
        }
        ${
          listing.photo_4
            ? `<div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="${listing.photo_3}"
                  alt="Second slide"
                  height="400px"
                />
              </div>`
            : ''
        }
        ${
          listing.photo_5
            ? `<div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="${listing.photo_4}"
                  alt="Second slide"
                  height="400px"
                />
              </div>`
            : ''
        }
        ${
          listing.photo_6
            ? `<div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="${listing.photo_5}"
                  alt="Second slide"
                  height="400px"
                />
              </div>`
            : ''
        }
        ${
          listing.photo_7
            ? `<div class="carousel-item">
              <img
                class="d-block w-100"
                src="${listing.photo_6}"
                alt="Second slide"
                height="400px"
              />
            </div>`
            : ''
        }
        
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <i class="fas fa-chevron-circle-left fa-2x"></i>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <i class="fas fa-chevron-circle-right fa-2x"></i>
        <span class="sr-only">Next</span>
      </a>
    </div>`;
}

export default renderCarousel;
