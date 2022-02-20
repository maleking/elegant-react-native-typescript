import api from './api';

const methods = {
  delete: (url, data = {}) => api.delete(url, data),
  get: (url, data = {}) => api.get(url, data),
  patch: (url, data = {}) => api.patch(url, data),
  post: (url, data = {}) => api.post(url, data),
  put: (url, data = {}) => api.put(url, data),
};

const auth = {
  checkMe: () => api.get('check/me'),
};

export default {

  ...methods,
  ...auth,
};
