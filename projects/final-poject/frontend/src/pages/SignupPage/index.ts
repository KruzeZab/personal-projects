import axios from 'axios';
import server from '../../axios/server';
import { ROUTES } from '../../constants';
import { renderAlert } from '../../utils';
import Base from '../../utils/Base';

/**
 * Signup page
 *
 */
class Signup extends Base {
  signupForm: HTMLElement;

  constructor() {
    super();
    // Attach the listener to form
    this.signupForm = document.getElementById('register-form')!;
    this.signupForm.addEventListener('submit', this.signup);
  }

  /**
   * creates user
   *
   * @param event Event
   */
  signup = async (event: Event) => {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);
    let formValues: any = {};

    form.forEach((value, key) => {
      formValues[key] = value;
    });

    const photoResponse = await this.uploadToCloudinary(
      form.get('photo') as File
    );

    formValues = {
      ...formValues,
      photo: photoResponse,
    };

    try {
      await server.post('/realtors/signup', formValues);
      window.location.href = ROUTES.loginPage;
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message?.toString();
      renderAlert(errorMsg, 'danger');
    }
  };

  /**
   * upload the form image to cloudinary
   *
   * @param image File
   * @returns string
   */
  async uploadToCloudinary(image: File) {
    const cloudName = 'daivy3qsz';
    const formData = new FormData();
    formData.append('upload_preset', 'final_project');
    formData.append('file', image);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload?api_key=994162263426642`,
        formData
      );

      // Assuming the response data contains the URL of the uploaded image
      const imageUrl = response.data.url;

      return imageUrl;
    } catch (error) {
      // Handle error if the upload fails
      console.error('Error uploading image:', error);
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new Signup();
});
