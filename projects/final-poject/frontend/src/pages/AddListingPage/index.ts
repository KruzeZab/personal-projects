import server from '../../axios/server';
import { renderAlert } from '../../utils';
import Base from '../../utils/Base';

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
      let formValues: any = {
        realtorId: Number(this.user.id),
      };

      form.forEach((value, key) => {
        formValues[key] = value;
      });

      const response = await server.post(
        '/listings/create',
        formValues
      );

      // Handle the response as needed
      console.log('Listing added successfully:', response.data);
      renderAlert('Listing created successfully!', 'success');
    } catch (error) {
      console.error('Error adding listing:', error);
      renderAlert('Error creating listing. Please try again');
    }
  };
}

document.addEventListener('DOMContentLoaded', function () {
  new AddListingPage();
});
