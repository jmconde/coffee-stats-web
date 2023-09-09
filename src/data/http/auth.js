import {get, post } from './requests.js';

export async function isAlive() {
  const { VITE_API_BASE, VITE_API_PATH_ALIVE } =
  import.meta.env;
  const response = await get(`${VITE_API_BASE}${VITE_API_PATH_ALIVE}`);
  return response;
}

export async function authenticate(username, password) {
  const { VITE_API_BASE, VITE_API_PATH_AUTHENTICATION } =
  import.meta.env;
  const response = await post(`${VITE_API_BASE}${VITE_API_PATH_AUTHENTICATION}`, { username, password });
  return response;
}

export async function logout() {
  const { VITE_API_BASE, VITE_API_PATH_LOGOUT } =
  import.meta.env;
  const response = await get(`${VITE_API_BASE}${VITE_API_PATH_LOGOUT}`);
  return response;
}

export async function changePassword(currentPassword, newPassword) {
  const { VITE_API_BASE, VITE_API_PATH_PASSWORD_CHANGE } =
  import.meta.env;
  const response = await post(`${VITE_API_BASE}${VITE_API_PATH_PASSWORD_CHANGE}`, {
    currentPassword,
    newPassword
  });
  console.log('response :>> ', response);
  return response;
}