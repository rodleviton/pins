import Const from './const';

const PDK = window.PDK || {};

// Initialize once with app id
PDK.init({ appId: Const.PIN_APP, cookie: true });

/*
 *  Wrapper for all Pinterest SDK actions
 */
export default {
  /*
   *  Use the SDK to login to Pinterest
   *  @param {Function} callback - function fired on completion
   */
  login: (callback) => {
    PDK.login({ scope : Const.PIN_SCOPE }, callback);
  },
  /*
   *  Use the SDK to logout of Pinterest
   */
  logout: () => {
    PDK.logout();
  },
  /*
   *  Use DK to determine auth state of user
   *  @returns {Boolean}
   */
  loggedIn: () => {
    return !!PDK.getSession();
  },
  /*
   *  Use SDK to create a new Pin
   *  @param {Object}   data     - {board, note, link, image_url}
   *  @param {Function} callback - function fired on completion
   */
  createPin: (data, callback) => {
    PDK.request('/pins/', 'POST', data, callback);
  },
  /*
   *  Use SDK to request current users boards
   *  @param {Function} callback - function fired on completion
   */
  myBoards: (callback) => {
    PDK.me('boards', { fields: Const.PIN_FIELDS }, callback);
  },

  getUser: (callback) => {
    return PDK.me('', { fields: 'first_name,image' }, callback);
  },

  getPins: (board, callback) => {
    PDK.request(`/v1/boards/rotoheni/${board}/pins/`, callback, {fields: 'image,counts,url,note,board,metadata,creator'});
  }
};
