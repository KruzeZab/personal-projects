import {
  checkUser,
  getAuthTokens,
  renderFooter,
  renderHeader,
  logout,
} from '.';

/**
 * Base class for all our classes
 *
 */
class Base {
  user: any;

  constructor() {
    this.initializeBase();
  }

  /**
   * Initialize the elements on every page changes
   *
   */
  async initializeBase() {
    await this.getUser();
    this.renderLayout();
    const logoutBtn = document.getElementById('logout-btn')!;
    logoutBtn?.addEventListener('click', logout);
  }

  /**
   * Get the user
   *
   */
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
      console.error('Error fetching user:', error);
    }
  }

  /**
   * render layouts into the page
   */
  renderLayout() {
    renderHeader(this.user);
    renderFooter();
  }
}

export default Base;
