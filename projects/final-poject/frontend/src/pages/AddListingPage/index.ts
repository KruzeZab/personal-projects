import axios from 'axios';
import server from '../../axios/server';
import { renderAlert } from '../../utils';
import Base from '../../utils/Base';
import { ROUTES } from '../../constants';

/**
 * Add Listing class
 *
 */
class AddListingPage extends Base {
  constructor() {
    super();
    // Get the listing form and attach listener
    const listingForm = document.querySelector('#listing-form')!;
    listingForm.addEventListener('submit', this.addListing);
  }

  /**
   * handle when form is submiited
   * @param e Event
   */
  addListing = async (e: Event) => {
    e.preventDefault();
    try {
      const form = new FormData(e.target as HTMLFormElement);
      // All photos in the form
      const photosEl = [
        'photo_1',
        'photo_2',
        'photo_3',
        'photo_4',
        'photo_5',
        'photo_6',
        'photo_7',
      ];
      // Initialize form values
      let formValues: any = {
        realtorId: Number(this.user.id),
      };

      // store photos
      const photos: File[] = [];

      // Store into the photo if is file
      // else add it to formValues
      form.forEach((value, key) => {
        if (photosEl.includes(key)) {
          if (value instanceof File && value.name) {
            photos.push(value as File);
          }
        } else {
          formValues[key] = value;
        }
      });

      // Upload to the cloudinary
      const uploadedImages = await this.uploadToCloudinary(photos);

      // Create photoUrls object
      const photoUrls = Object.assign({}, ...uploadedImages);

      // add to the formValues
      formValues = {
        ...formValues,
        ...photoUrls,
      };

      const response = await server.post(
        '/listings/create',
        formValues
      );
      // get the newly created listing id
      const id = response.data.data.id;
      renderAlert('Listing created successfully!', 'success');
      // navigate to listing page
      window.location.href = `${ROUTES.ListingDetailPage}?id=${id}`;
    } catch (error) {
      console.error('Error adding listing:', error);
      renderAlert('Error creating listing. Please try again');
    }
  };

  /**
   * upload the form images to cloudinary
   *
   * @param imageFiles File[]
   * @returns any[]
   */
  async uploadToCloudinary(imageFiles: File[]) {
    const results = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const cloudName = 'daivy3qsz';
      const formData = new FormData();
      formData.append('upload_preset', 'final_project');
      formData.append('file', imageFiles[i]);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload?api_key=994162263426642`,
          formData
        );

        // Assuming the response data contains the URL of the uploaded image
        const imageUrl = response.data.url;

        // Create a key like "photo_1", "photo_2", etc.
        const key = `photo_${i + 1}`;
        const newImage = {
          [key]: imageUrl,
        };

        // Push the result into the array
        results.push(newImage);
      } catch (error) {
        // Handle error if the upload fails
        console.error('Error uploading image:', error);
      }
    }
    return results;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new AddListingPage();
});
