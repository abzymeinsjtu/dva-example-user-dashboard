import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page }) {
  return request(`/api/user?page=${page}&per_page=${PAGE_SIZE}`);
}


export function update(id, values) {
  const reqData = { ...values, user_id: id };
  return request('/api/user/update', {
    method: 'POST',
    body: JSON.stringify(reqData),
  });
}

export function modifyPassword(id, password) {
  const reqData = { user_id: id, password };
  return request('/api/user/force_modify_password', {
    method: 'POST',
    body: JSON.stringify(reqData),
  });
}

export function create(values) {
  return request('/api/users/add', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
