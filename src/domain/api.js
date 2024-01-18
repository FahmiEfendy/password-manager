import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const callApi = async (
  endpoint,
  method,
  headers = {},
  params = {},
  data = {}
) => {
  const options = {
    url: baseUrl + endpoint,
    method,
    headers,
    params,
    data,
  };

  return axios(options).then((response) => {
    return response?.data;
  });
};
