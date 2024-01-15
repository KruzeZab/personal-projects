import server from '../../axios/server';
import { ROUTES } from '../../constants';
import { ILoginResponse } from '../../interface/response';
import { renderAlert } from '../../utils';
import Base from '../../utils/Base';

/**
 * Login Page
 *
 */
class Login extends Base {
  loginForm: HTMLElement;

  constructor() {
    super();

    // grab login form add attach listener
    this.loginForm = document.getElementById('form-login')!;
    this.loginForm.addEventListener('submit', this.login);
  }

  /**
   * handle when user logs in
   *
   * @param event Event
   */
  login = async (event: Event) => {
    event.preventDefault();
    const email =
      this.loginForm.querySelector<HTMLInputElement>('#email')!.value;
    const password =
      this.loginForm.querySelector<HTMLInputElement>(
        '#pass_word'
      )!.value;

    const formValues = {
      email,
      password,
    };
    try {
      const response = (await server.post(
        '/realtors/login',
        formValues
      )) as ILoginResponse;
      const tokens = response.data;

      // Set tokens to localStorage
      localStorage.setItem('authTokens', JSON.stringify(tokens));
      window.location.href = ROUTES.homePage;
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message?.toString();
      renderAlert(errorMsg, 'danger');
    }
  };
}

document.addEventListener('DOMContentLoaded', function () {
  new Login();
});
