import {get } from './requests.js';

export async function getMonthlyList() {
  const { VITE_API_BASE, VITE_API_PATH_LIST } =
  import.meta.env;
  const response = await get(`${VITE_API_BASE}${VITE_API_PATH_LIST}`);
  return response;
}
export async function getWhitelist() {
  const { VITE_API_BASE, VITE_API_PATH_WHITELIST } =
  import.meta.env;
  const response = await get(`${VITE_API_BASE}${VITE_API_PATH_WHITELIST}`);
  return response;
}
export async function getInSessionNow() {
  const { VITE_API_BASE, VITE_API_PATH_NOW_SESSIONS } =
  import.meta.env;
  const response = await get(`${VITE_API_BASE}${VITE_API_PATH_NOW_SESSIONS}`);
  return response;
}
export async function getFlightplansNow() {
  const { VITE_API_BASE, VITE_API_PATH_NOW_FLIGHTPLANS } =
  import.meta.env;
  const response = await get(`${VITE_API_BASE}${VITE_API_PATH_NOW_FLIGHTPLANS}`);
  return response;
}
export async function getWazzup() {
  const { VITE_API_BASE, VITE_API_PATH_IVAO_WAZZUP } =
  import.meta.env;
  const response = await get(`${VITE_API_BASE}${VITE_API_PATH_IVAO_WAZZUP}`);
  return response;
}
export async function getAcarsPosition() {
  const { VITE_API_BASE, VITE_API_PATH_ACARS_USER_POSITION } =
  import.meta.env;
  const response = await get(`${VITE_API_BASE}${VITE_API_PATH_ACARS_USER_POSITION}`);
  return response;
}
export async function getPilotPreviousData(start, end) {
  console.log('start, end :>> ', start, end);
  const { VITE_API_BASE } =
  import.meta.env;
  const response = await get(`${VITE_API_BASE}/list/previous/${start}/${end}`);
  return response;
}