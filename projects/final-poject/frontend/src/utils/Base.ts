import {
  checkUser,
  getAuthTokens,
  renderFooter,
  renderHeader,
  logout,
} from '.';

class Base {
  user: any;

  constructor() {
    this.initializeBase();
  }

  async initializeBase() {
    await this.getUser();
    this.renderLayout();
    const logoutBtn = document.getElementById('logout-btn')!;
    logoutBtn?.addEventListener('click', logout);
  }

  async getUser() {
    try {
      const tokens = getAuthTokens();

      if (tokens) {
        const { accessToken } = tokens;
        this.user = await checkUser(accessToken);
      } else {
        this.user = false;
      }
    } catch (error) {
      this.user = false;
      // Handle error
      console.error('Error fetching user:', error);
    }
  }

  renderLayout() {
    renderHeader(!!this.user);

    renderFooter();
  }
}

export default Base;
