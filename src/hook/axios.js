import axios from 'axios';
import { parse } from 'cookie';
import { getCookie } from "cookies-next";

 const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN
 /*
const Axios = async (url) => {
  //const cookieStore = cookies()
  const token = getCookie('token')
  
  //const token = cookies.token; // Ganti dengan nama cookie Anda

  if (!token) {
    throw new Error('Token tidak ada'); // Atau lakukan penanganan sesuai kebutuhan Anda
  }

  try {
    const response = await axios.get(API_DOMAIN+url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error; // Atau lakukan penanganan error sesuai kebutuhan Anda
  }
};
*/


const token = getCookie('token')

const Axios = axios.create({
  baseURL: API_DOMAIN,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export {Axios};
