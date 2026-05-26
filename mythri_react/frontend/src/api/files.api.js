import api from './client';

export const filesApi = {
  list: () => api.get('/v1/files'),
  upload: (data) => api.post('/v1/files', data),
  remove: (id) => api.delete(`/v1/files/${id}`),
};
