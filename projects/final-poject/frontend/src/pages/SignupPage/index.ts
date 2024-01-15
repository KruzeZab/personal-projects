import server from '../../axios/server';
import { ROUTES } from '../../constants';
import { renderAlert, renderFooter, renderHeader } from '../../utils';

class Signup {
  signupForm: HTMLElement;

  constructor() {
    renderHeader();
    renderFooter();

    this.signupForm = document.getElementById('register-form')!;

    this.signupForm.addEventListener('submit', this.signup);
  }

  signup = async (event: Event) => {
    event.preventDefault();

    const username =
      this.signupForm.querySelector<HTMLInputElement>(
        '#user_name'
      )!.value;
    const email =
      this.signupForm.querySelector<HTMLInputElement>(
        '#email'
      )!.value;
    const password =
      this.signupForm.querySelector<HTMLInputElement>(
        '#pass_word'
      )!.value;
    const photo =
      this.signupForm.querySelector<HTMLInputElement>(
        '#photo'
      )!.value;

    const phone =
      this.signupForm.querySelector<HTMLInputElement>(
        '#phone'
      )!.value;

    const website =
      this.signupForm.querySelector<HTMLInputElement>(
        '#website'
      )!.value;

    const confirmPassword =
      this.signupForm.querySelector<HTMLInputElement>(
        '#c_pass_word'
      )!.value;

    const formValues = {
      username,
      email,
      password,
      confirmPassword,
      photo: 'https://picsum.photos/400',
      phone,
      website,
    };
    try {
      await server.post('/realtors/signup', formValues);
      window.location.href = ROUTES.loginPage;
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message?.toString();
      renderAlert(errorMsg, 'danger');
    }
  };
}

document.addEventListener('DOMContentLoaded', function () {
  new Signup();
});
