import axios from 'axios';

export const get = async(url) => {
  const response = await axios.get(url, { withCredentials: true });
  return response.data;
};

export const post = async(url, data) => {
  try {
    const response = await axios.post(url, data, { withCredentials: true });
    return response.data;
  } catch (err) {
    console.log('err :>> ', err.response);
  }
}