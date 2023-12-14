import axios from 'axios';
export async function getOrdenesAll() {
let result = await axios.get(`${import.meta.env.VITE_ORDERS_URL}`);
console.log('<<AXIOS-ORDENES>>: ', result.data);
return result.data;
}