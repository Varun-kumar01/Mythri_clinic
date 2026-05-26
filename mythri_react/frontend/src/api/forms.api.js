import api from './client';

export const formsApi = {
  list: () => api.get('/v1/forms'),
  create: (data) => api.post('/v1/forms', data),
  update: (id, data) => api.put(`/v1/forms/${id}`, data),
  remove: (id) => api.delete(`/v1/forms/${id}`),
};
