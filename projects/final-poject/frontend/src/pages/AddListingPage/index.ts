import axios from 'axios';
import server from '../../axios/server';
import { renderAlert } from '../../utils';
import Base from '../../utils/Base';
import { ROUTES } from '../../constants';

class AddListingPage extends Base {
  constructor() {
    super();
    const listingForm = document.querySelector('#listing-form')!;
    listingForm.addEventListener('submit', this.addListing);
  }

  addListing = async (e: Event) => {
    e.preventDefault();
    try {
      const form = new FormData(e.target as HTMLFormElement);
      const photosEl = [
        'photo_1',
        'photo_2',
        'photo_3',
        'photo_4',
        'photo_5',
        'photo_6',
        'photo_7',
      ];
      let formValues: any = {
        realtorId: Number(this.user.id),
      };

      const photos: File[] = [];

      form.forEach((value, key) => {
        if (photosEl.includes(key)) {
          if (value instanceof File && value.name) {
            photos.push(value as File);
          }
        } else {
          formValues[key] = value;
        }
      });

      const uploadedImages = await this.uploadToCloudinary(photos);

      const photoUrls = Object.assign({}, ...uploadedImages);

      formValues = {
        ...formValues,
        ...photoUrls,
      };

      const response = await server.post(
        '/listings/create',
        formValues
      );
      const id = response.data.data.id;
      renderAlert('Listing created successfully!', 'success');
      window.location.href = `${ROUTES.ListingDetailPage}?id=${id}`;
    } catch (error) {
      console.error('Error adding listing:', error);
      renderAlert('Error creating listing. Please try again');
    }
  };

  async uploadToCloudinary(imageFiles: File[]) {
    const results = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const cloudName = import.meta.env.CLOUD_NAME;
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
