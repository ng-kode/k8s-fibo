import axios from 'axios';
import config from './config';

const API_PREFIX = config.API_PREFIX;

export const getPostgresValues = async () => {
    const response = await axios.get(`${API_PREFIX}/values/all`);
    return response.data;
}

export const getRedisValues = async () => {
    const response = await axios.get(`${API_PREFIX}/values/current`);
    return response.data;
}

export const postFiboIndex = async (index) => {
    const response = await axios.post(`${API_PREFIX}/values`, { index });
    return response.data;
}
